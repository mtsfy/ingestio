"use client";

import { FolderTree, Github, Star } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 border-b border-neutral-200 py-5 px-6 bg-white bg-opacity-80 backdrop-blur-sm text-violet-500 flex items-center justify-between xl:justify-around shadow-sm">
      <div className="xl:pl-6 pl-2 flex items-center lg:gap-2.5 gap-1.5">
        <h1 className="font-semibold xl:text-3xl lg:text-2xl text-lg">ingestio</h1>
        <FolderTree size={20} className="lg:hidden block" />
        <FolderTree size={25} className="lg:block hidden" />
      </div>
      <div className="xl:pr-6 pr-2 flex items-center lg:gap-5 gap-4">
        <Link href={"https://github.com/mtsfy/ingestio"} className="hover:text-violet-600 transition-colors" aria-label="GitHub Repository">
          <Github size={20} className="lg:hidden block" />
          <Github size={25} className="lg:block hidden" />
        </Link>
        <Link href={"https://github.com/mtsfy/ingestio"} className="hover:text-violet-600 transition-colors" aria-label="Star Repository">
          <Star size={20} className="lg:hidden block" />
          <Star size={25} className="lg:block hidden" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
