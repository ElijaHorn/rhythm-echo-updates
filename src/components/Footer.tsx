
import React from "react";
import { Link } from "react-router-dom";
import { Music } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-lg border-t border-music-700 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <Music className="h-5 w-5 text-music-accent" />
              <span className="font-medium">elijacreative.org</span>
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link to="/" className="text-music-300 hover:text-white transition-colors">
              Music
            </Link>
            <Link to="/updates" className="text-music-300 hover:text-white transition-colors">
              Updates
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center md:text-left text-music-400 text-sm">
          &copy; {new Date().getFullYear()} ElijaCreative. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
