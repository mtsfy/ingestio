import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-1 text-xs text-violet-500">
            <span>© {currentYear}</span>
            <span className="font-medium">Ingestio</span>
          </div>

          <div className="flex items-center space-x-6 text-xs text-gray-500">
            <span>Not affiliated with GitHub</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
