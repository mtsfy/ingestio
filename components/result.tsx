"use client";

import CopyButton from "./copy-button";
import DownloadButton from "./download-button";

interface ResultProps {
  data: Data;
}

const Result: React.FC<ResultProps> = ({ data }) => {
  return (
    <div className="p-4 w-full mt-14 xl:mt-0">
      <div className="w-full flex gap-8 justify-center xl:flex-row flex-col">
        <div className="w-full xl:w-5/12 flex flex-col gap-4">
          {/* Summary */}
          <h1 className="font-bold text-lg">Summary:</h1>
          <div className="bg-white h-[125px] p-4 border rounded text-neutral-500 text-sm flex flex-col gap-2">
            <h4 className="font-semibold">
              Repository:{" "}
              <span className="font-normal">
                {data.owner}/{data.repo}
              </span>
            </h4>
            <h4 className="font-semibold">
              Estimated Tokens: <span className="font-normal">{data.tokens.toLocaleString()}</span>
            </h4>
            <h4 className="font-semibold">
              Files Analyzed: <span className="font-normal">{data.files.toLocaleString()}</span>
            </h4>
          </div>
          {/* Tree */}
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-lg">File Tree:</h1>
            <div className="flex gap-2">
              <DownloadButton data={data.directory} label="tree" owner={data.owner} repo={data.repo} />
              <CopyButton data={data.directory} label="tree" />
            </div>
          </div>
          <textarea
            className="text-xs font-mono w-full min-h-[350px] p-4 border rounded-lg resize-none text-neutral-500"
            value={data.directory}
            readOnly
          />
        </div>
        {/* Content */}
        <div className="w-full xl:w-5/12 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-lg">Repo Content:</h1>
            <div className="flex gap-2">
              <DownloadButton data={data.content} label="content" owner={data.owner} repo={data.repo} />
              <CopyButton data={data.content} label="content" />
            </div>
          </div>
          <textarea
            className="text-xs font-mono w-full min-h-[600px] p-4 border rounded resize-none text-neutral-500"
            value={data.content}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default Result;
