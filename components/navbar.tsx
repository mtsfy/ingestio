"use client";

import { FolderTree, Github, Star } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="border-b-[1px] p-6 bg-white text-violet-500 z-50 flex items-center justify-between xl:justify-around">
      <div className="xl:pl-6 pl-2 flex items-center lg:gap-2 gap-1">
        <h1 className="font-semibold xl:text-3xl lg:text-2xl text-lg">ingestio</h1>
        <FolderTree size={20} className="lg:hidden block" />
        <FolderTree size={25} className="lg:block hidden" />
      </div>
      <div className="xl:pr-6 pr-2 flex items-center lg:gap-4 gap-4">
        <Link href={"https://github.com/mtsfy/ingestio"}>
          <Github size={20} className="lg:hidden block" />
          <Github size={25} className="lg:block hidden" />
        </Link>
        <Link href={"https://github.com/mtsfy/ingestio"}>
          <Star size={20} className="lg:hidden block" />
          <Star size={25} className="lg:block hidden" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
