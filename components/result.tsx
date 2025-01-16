"use client";

import CopyButton from "./copy-button";

interface ResultProps {
  data: Data;
}

const Result: React.FC<ResultProps> = ({ data }) => {
  return (
    <div className="p-4 w-full">
      <div className="w-full flex gap-8 justify-center xl:flex-row flex-col">
        <div className="w-full xl:w-1/3 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-lg">Repo Content:</h1>
            <CopyButton data={data.content} label="repo content" />
          </div>
          <textarea
            className="text-xs font-mono w-full min-h-[500px] p-4 border rounded resize-none text-neutral-500"
            value={data.content}
            readOnly
          />
        </div>
        <div className="w-full xl:w-1/3 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-lg">File Tree:</h1>
            <CopyButton data={data.directory} label="file tree" />
          </div>
          <textarea
            className="text-xs font-mono w-full min-h-[500px] p-4 border rounded resize-none text-neutral-500"
            value={data.directory}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default Result;
