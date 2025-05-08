
import React from "react";
import { Link } from "react-router-dom";
import { Music } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-music-900 border-t border-music-700 py-8">
      <div className="music-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Music className="h-5 w-5 text-music-accent" />
            <span className="text-lg font-medium text-white">Rhythm Echo</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
            <Link to="/" className="text-music-300 hover:text-white transition-colors">
              Music
            </Link>
            <Link to="/updates" className="text-music-300 hover:text-white transition-colors">
              Updates
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center text-music-400 text-sm">
          <p>© {new Date().getFullYear()} Rhythm Echo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
