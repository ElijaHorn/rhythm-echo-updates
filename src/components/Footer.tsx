
import React from "react";
import { Link } from "react-router-dom";
import { Music } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-music-900 border-t border-music-800 py-8">
      <div className="music-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Music className="h-6 w-6 text-music-accent mr-2" />
            <span className="text-lg font-semibold text-white">elijacreative.org</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            <nav className="flex space-x-6 mb-4 md:mb-0">
              <Link to="/" className="text-music-300 hover:text-music-accent transition">Home</Link>
              <Link to="/updates" className="text-music-300 hover:text-music-accent transition">Updates</Link>
            </nav>
            
            <div className="text-sm text-music-500">
              &copy; {new Date().getFullYear()} elijacreative. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
