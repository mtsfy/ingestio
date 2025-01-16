"use client";
import Result from "@/components/result";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { getRepoContents, repoExists } from "@/lib/octo";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SIZE_OPTIONS = [
  1_000, 2_000, 3_000, 4_000, 5_000, 10_000, 20_000, 30_000, 40_000, 50_000, 100_000, 200_000, 300_000, 400000, 500_000, 1_000_000, 2_000_000,
  3_000_000, 4_000_000, 5_000_000, 10_000_000, 20_000_000, 30_000_000, 40_000_000, 50_000_000, 100_000_000,
];

export default function Home() {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const [sizeIndex, setSizeIndex] = useState(9);
  const [size, setSize] = useState(SIZE_OPTIONS[sizeIndex]);

  function handleSliderChange(value: number[]) {
    setSizeIndex(value[0]);
    setSize(SIZE_OPTIONS[value[0]]);
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const temp = url.split("/").slice(-2);
      const owner = temp[0];
      const repo = temp[1];

      console.log(owner, repo);

      if (!owner && !repo) {
        setError("Error: Repository not found, make sure it is public.");
        toast.error("Something went wrong. Please try again");
        return;
      }

      const exists = await repoExists(owner, repo);
      if (!exists) {
        setError("Error: Repository not found, make sure it is public.");
        return;
      }
      setData(null);
    } catch (error) {
      console.log("error fetching:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getRepoContents("mtsfy", "bigdata");
      if (!res) return;
      setData(res);
    };

    fetch();
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <div className="text-violet-500 min-h-screen">
      <div className="min-h-[85vh] flex flex-col lg:gap-4">
        <div className="flex-col items-center gap-4 lg:flex hidden mt-20">
          <h1 className="text-5xl font-semibold text-center mt-12 mb-8 lg:-mb-2   animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-transparent text-wrap">
            Prompty-Firendly Codebase
          </h1>
          <p className="w-1/3 text-base text-center mt-4 text-neutral-400 font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium possimus necessitatibus obcaecati accusamus?
          </p>
        </div>
        <div className="min-h-[24vh] lg:m-8 flex justify-center">
          <div className="lg:bg-white lg:border-[.5px] lg:rounded-lg xl:w-6/12 w-full p-6">
            <div className="flex-col items-center gap-4 lg:hidden flex">
              <h1 className="text-4xl font-semibold text-center mt-6 mb-4 lg:hidden block animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-transparent">
                Prompty-Firendly Codebase
              </h1>
              <p className="text-center mt-4 text-neutral-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium possimus necessitatibus obcaecati accusamus?
              </p>
            </div>
            {error && (
              <div className="bg-red-200 text-red-400 border-red-400 border-[1px] p-4 rounded-3xl my-6">
                <h3 className="font-medium">{error}</h3>
              </div>
            )}
            <div className="flex flex-col gap-4 lg:mt-4 mt-8">
              <Label htmlFor="repository" className="font-medium">
                Repository:
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="repository"
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://github.com/{username}/{repository}"
                  className="lg:text-normal bg-white placeholder:text-xs placeholder:text-neutral-400"
                />
                <Button className="bg-violet-500 hover:bg-violet-500/80" onClick={handleSubmit}>
                  Ingest
                </Button>
              </div>
              <div className="flex flex-col gap-4 lg:mt-4 mt-8">
                <Label htmlFor="size" className="font-medium">
                  Include Files Under: {(size >= 1000000 ? size / 1000000 : size / 1000).toFixed(1)} {size >= 1000000 ? "MB" : "KB"}
                </Label>
                <Slider
                  min={0}
                  max={SIZE_OPTIONS.length - 1}
                  step={1}
                  value={[sizeIndex]}
                  onValueChange={handleSliderChange}
                  className="md:w-1/2 bg-neutral-200"
                />
              </div>
            </div>
          </div>
        </div>
        {data && (
          <div className="min-h-[50vh]">
            {/* <Result data={{ directory: "hello", content: "hello", summary: "summary" }} /> */}
            <Result data={data!} />
          </div>
        )}
      </div>
    </div>
  );
}
