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
    <div className="text-violet-500 min-h-screen pb-20 pt-12">
      <div className="min-h-[85vh] flex flex-col">
        {/* Desktop Header */}
        <div className="flex-col items-center lg:flex hidden my-16">
          <h1 className="text-5xl font-semibold text-center tracking-tight">Prompt-Friendly Codebase</h1>
          <p className="max-w-2xl text-center mt-6 text-neutral-600">
            Ingestio is a tool that converts GitHub repositories into prompt-friendly text digests, facilitating their integration with large language
            models (LLMs).
          </p>
        </div>

        {/* Input Container */}
        <div className="min-h-[24vh] flex justify-center px-4 sm:px-0">
          <div className="bg-white shadow-sm rounded-xl xl:w-6/12 w-full p-6 sm:p-8 border border-neutral-100">
            {/* Mobile Header */}
            <div className="flex-col items-center gap-4 lg:hidden flex">
              <h1 className="text-4xl font-semibold text-center mt-2 mb-4">Prompt-Friendly Codebase</h1>
              <p className="text-center mt-2 mb-2 text-neutral-600">
                Ingestio converts GitHub repositories into prompt-friendly text digests for LLMs.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-500 border-red-200 border p-4 rounded-lg my-6 md:text-sm text-sm">
                <p className="font-medium">{error}</p>
              </div>
            )}

            {/* Main Input Form */}
            <div className="flex flex-col gap-4 xl:mt-6 mt-6">
              <Label htmlFor="repository" className="font-medium">
                Repository URL
              </Label>

              {/* URL Input & Submit Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Input
                  id="repository"
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                  autoComplete="off"
                  disabled={isLoading}
                  placeholder="github.com/username/repository"
                  className="lg:text-normal text-sm bg-white placeholder:text-neutral-400 text-neutral-700 focus-visible:ring-violet-500 w-full"
                />
                <Button
                  className="bg-violet-500 hover:bg-violet-600 transition-colors px-6 py-2 rounded-md w-full sm:w-auto mt-3 sm:mt-0"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? <PulseLoader size={5} color="#ffffff" /> : <span>Ingest</span>}
                </Button>
              </div>

              {/* Size Slider */}
              <div className="flex flex-col gap-4 mt-6">
                <div className="space-y-3">
                  <Label htmlFor="size" className="font-medium">
                    Include Files Under{" "}
                    <span className="text-violet-600 font-semibold">
                      {(size >= 1000000 ? size / 1000000 : size / 1000).toFixed(1)} {size >= 1000000 ? "MB" : "KB"}
                    </span>
                  </Label>
                  <Slider
                    min={0}
                    max={SIZE_OPTIONS.length - 1}
                    step={1}
                    value={[sizeIndex]}
                    onValueChange={handleSliderChange}
                    className="w-full sm:w-3/4 lg:w-1/2 bg-neutral-200"
                    disabled={isLoading}
                  />
                </div>

                {/* Example Repositories */}
                <div className="flex flex-col gap-3 mt-6">
                  <h4 className="font-medium text-sm">Try these example repositories:</h4>
                  <div className="flex flex-wrap gap-2">
                    {EXAMPLES.map((item, idx) => (
                      <Button
                        variant={"outline"}
                        key={idx}
                        onClick={() => setUrl(item.href)}
                        className="bg-violet-50 border-violet-200 hover:border-violet-500 hover:text-violet-500 text-violet-600 text-xs lg:text-sm transition-colors"
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

        {/* Results Section */}
        {data && (
          <div className="min-h-[50vh] mt-10">
            <Result data={data} />
          </div>
        )}
      </div>
    </div>
  );
}
