"use client";

import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  data: string;
  label: string;
  repo: string;
  owner: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ data, label, repo, owner }) => {
  const handleDownload = (data: string) => {
    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);
    const linkElement = document.createElement("a");
    linkElement.href = url;
    linkElement.download = `${owner}-${repo}-${label}`;
    linkElement.click();

    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${label}!`);
  };

  return (
    <Button onClick={() => handleDownload(data)} variant={"default"} className="bg-violet-500 hover:bg-violet-500/80">
      Download <Download />
    </Button>
  );
};

export default DownloadButton;
