import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_API_TOKEN,
  userAgent: "gitrewind v1.0.0",
  baseUrl: "https://api.github.com",
});

const BINARY_EXTENSIONS = [
  ".exe",
  ".dll",
  ".so",
  ".dylib",
  ".bin",
  ".out",
  ".o",
  ".lib",
  ".a",
  ".obj",
  ".app",
  ".dmg",
  ".iso",
  ".pyc",
  ".pyd",
  ".pyo",
  ".class",
  ".jar",
  ".war",
  ".ear",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".cache",
  ".DS_Store",
  ".gif",
  ".ico",
  ".svg",
  ".mp3",
  ".mp4",
  ".avi",
  ".mov",
  ".wmv",
  ".zip",
  ".tar",
  ".gz",
  ".rar",
  ".7z",
  ".pdf",
  ".doc",
  ".docx",
  ".ttf",
  ".woff",
  ".woff2",
  ".eot",
];
const isTextFile = (path: string): boolean => {
  if (!path.includes(".")) return false;
  const ext = path.substring(path.lastIndexOf(".")).toLowerCase();
  return !BINARY_EXTENSIONS.includes(ext);
};

export const getRepoContents = async (owner: string, repo: string): Promise<Data | null> => {
  try {
    const {
      data: { tree },
    } = await octokit.rest.git.getTree({
      owner,
      repo,
      tree_sha: "main",
      recursive: "true",
    });

    const files = tree.filter((item) => item.type === "blob").filter((item) => item.path && isTextFile(item.path));
    const structure = files.reduce((acc: Record<string, any>, item) => {
      const path = item.path?.split("/") || [];
      let current = acc;

      path.forEach((segment, index) => {
        if (index === path.length - 1) {
          current[segment] = {
            type: "file",
            sha: item.sha,
            size: item.size,
          };
        } else {
          current[segment] = current[segment] || {};
          current = current[segment];
        }
      });

      return acc;
    }, {});

    // await fs.writeFile(`${owner}-${repo}.txt`, "");
    let allData = "";

    for (const file of files) {
      if (file.path?.includes("package-lock.json") || file.size! > 50000) continue;
      const content = await getFile(owner, repo, file.sha!);
      const newData = `\n${"=".repeat(50)}\nFile: ${file.path}\n${"=".repeat(50)}\n${content}\n${"=".repeat(50)}\n`;
      allData += newData;
      //   await fs.appendFile(`${owner}-${repo}.txt`, newData);
    }
    const fileTree = getFileTree(structure);
    return {
      content: allData,
      directory: fileTree,
      summary: "",
    };
  } catch (error) {
    console.log("Error extracting repo contents:", error);
    return null;
  }
};

export const getFile = async (owner: string, repo: string, file_sha: string) => {
  try {
    const { data } = await octokit.rest.git.getBlob({
      owner,
      repo,
      file_sha,
    });

    if (data.encoding === "base64") {
      return atob(data.content);
    }
    return null;
  } catch (error) {
    console.error(`Error fetching file ${file_sha}:`, error);
    return null;
  }
};

export const getFileTree = (structure: Record<string, any>, indent: number = 0): string => {
  let result = "";
  const entries = Object.entries(structure);

  entries.forEach(([key, value], index) => {
    const isLast = index === entries.length - 1;
    const prefix = indent > 0 ? (isLast ? "└── " : "├── ") : "";
    const pipes = "│   ".repeat(indent);

    if (value.type === "file") {
      result += `${pipes}${prefix}${key} (${value.size} bytes)\n`;
    } else {
      result += `${pipes}${prefix}${key}/\n`;
      result += getFileTree(value, indent + 1);
    }
  });

  return result;
};
