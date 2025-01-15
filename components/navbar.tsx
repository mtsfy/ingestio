"use client";

import { FolderTree, Github, Star } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="border-b-[1px] p-6 bg-white text-violet-500 z-50 flex items-center justify-between xl:justify-around">
      <div className="xl:pl-6 pl-4 flex items-center gap-2 ">
        <h1 className="font-semibold xl:text-3xl text-2xl">ingestio</h1>
        <FolderTree size={25} />
      </div>
      <div className="xl:pr-6 pr-4 flex items-center gap-4">
        <Link href={"https://github.com/mtsfy/ingestio"}>
          <Github size={25} />
        </Link>
        <Link href={"https://github.com/mtsfy/ingestio"}>
          <Star size={25} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
