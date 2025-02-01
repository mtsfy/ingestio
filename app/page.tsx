"use client";
import Result from "@/components/result";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { getRepoContents, repoExists } from "@/lib/octo";
import { useState } from "react";
import toast from "react-hot-toast";
import PulseLoader from "react-spinners/PulseLoader";

const SIZE_OPTIONS = [
  1_000, 2_000, 3_000, 4_000, 5_000, 10_000, 20_000, 30_000, 40_000, 50_000, 100_000, 200_000, 300_000, 400000, 500_000, 1_000_000, 2_000_000,
  3_000_000, 4_000_000, 5_000_000, 10_000_000, 20_000_000, 30_000_000, 40_000_000, 50_000_000, 100_000_000,
];

const EXAMPLES = [
  { name: "Ingestio", href: "https://github.com/mtsfy/ingestio" },
  { name: "LinkSelf", href: "https://github.com/mtsfy/linkself" },
  { name: "ESP32 Webserver", href: "https://github.com/mtsfy/esp32cam-webserver" },
  { name: "MPL Scraper", href: "https://github.com/mtsfy/mpl-scraper" },
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
      console.log(size);

      setUrl("");
      setError("");
      setIsLoading(true);
      const regex = /^(https?:\/\/)?(www\.)?github\.com\/([^\/]+)\/([^\/]+)\/?$/;
      const match = url.match(regex);

      if (!match) {
        setError(`Invalid GitHub URL format. Please use: github.com/username/repository`);
        toast.error("Invalid URL format");
        return;
      }

      const owner = match[3];
      const repo = match[4];

      console.log(match);
      console.log(owner, repo);

      const exists = await repoExists(owner, repo);
      if (!exists) {
        setError("Error: Repository not found, make sure it is public.");
        return;
      }

      const response = await getRepoContents(owner, repo, size);
      if (!response) {
        setError("Error: Something went wrong fetch repository.");
        return;
      }
      setData(response);
    } catch (error) {
      console.log("error fetching:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-violet-500 min-h-screen pb-32">
      <div className="min-h-[85vh] flex flex-col lg:gap-4">
        <div className="flex-col items-center gap-4 lg:flex hidden mt-20">
          <h1 className="text-5xl font-semibold text-center mt-12 mb-8 lg:-mb-2">Prompty-Firendly Codebase</h1>
          <p className="w-5/12 text- text-center mt-4 text-neutral-500 font-">
            Ingestio is a tool that converts GitHub repositories into prompt-friendly text digests, facilitating their integration with large language
            models (LLMs).
          </p>
        </div>
        <div className="min-h-[24vh] lg:m-8 flex justify-center">
          <div className="lg:bg-white lg:border-[.5px] lg:rounded-lg xl:w-6/12 w-full p-6">
            <div className="flex-col items-center gap-4 lg:hidden flex">
              {/* animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-transparent */}
              <h1 className="text-4xl font-semibold text-center mt-6 mb-4 lg:hidden block">Prompty-Firendly Codebase</h1>
              <p className="text-center mt-4 text-neutral-500">
                Ingestio is a tool that converts GitHub repositories into prompt-friendly text digests, facilitating their integration with large
                language models (LLMs).
              </p>
            </div>
            {error && (
              <div className="bg-red-100 text-red-400 border-red-400 border-[1px] p-4 rounded-3xl my-6 md:text-sm text-[12.5px]">
                <p className="font-medium w-1/2 lg:w-full">{error}</p>
              </div>
            )}
            <div className="flex flex-col gap-4 xl:mt-4 mt-8">
              <Label htmlFor="repository" className="font-medium">
                Repository:
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="repository"
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                  autoComplete="off"
                  disabled={isLoading}
                  placeholder="https://github.com/{username}/{repository}"
                  className="lg:text-normal text-xs lg:text-sm bg-white placeholder:text-xs placeholder:text-neutral-400 text-neutral-700"
                />
                <Button className="bg-violet-500 hover:bg-violet-500/80" onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? <PulseLoader size={5} color="#ffff" /> : <span>Ingest</span>}
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
                  disabled={isLoading}
                />
                <div className="flex flex-col gap-3 mt-4">
                  <h4 className="font-medium text-sm">Try these example repositories:</h4>
                  <div className="flex gap-2">
                    {EXAMPLES.map((item, idx) => (
                      <Button
                        variant={"outline"}
                        key={idx}
                        onClick={() => setUrl(item.href)}
                        className="bg-violet-200 border-violet-500 hover:text-violet-500 text-xs lg:text-sm"
                        disabled={isLoading}
                      >
                        {item.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {data && (
          <div className="min-h-[50vh]">
            <Result data={data} />
          </div>
        )}
      </div>
    </div>
  );
}
