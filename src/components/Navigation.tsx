import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Music, Calendar, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  const navItems = [{
    name: "Music",
    path: "/",
    icon: <Music className="w-4 h-4 mr-2" />
  }, {
    name: "Updates",
    path: "/updates",
    icon: <Calendar className="w-4 h-4 mr-2" />
  }];
  return <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-lg border-b border-music-700">
      <div className="music-container flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-white">
            <Music className="h-6 w-6 text-music-accent" />
            <span>elijacreative.org</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map(item => <Button key={item.name} variant="ghost" asChild className="text-music-300 hover:text-white hover:bg-music-700">
              <Link to={item.path} className="flex items-center">
                {item.icon}
                {item.name}
              </Link>
            </Button>)}
          
          {/* Admin link - only visible on desktop */}
          <Button variant="ghost" asChild className="text-music-300 hover:text-white hover:bg-music-700 ml-4 border-l border-music-700 pl-4">
            
          </Button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" className="text-music-300 hover:text-white" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile navigation */}
        {isOpen && <div className="md:hidden fixed inset-0 z-50 bg-black/90 backdrop-blur-lg">
            <div className="flex justify-end p-4">
              <Button variant="ghost" size="icon" className="text-music-300 hover:text-white" onClick={closeMenu}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map(item => <Link key={item.name} to={item.path} className="flex items-center text-2xl font-medium text-music-300 hover:text-white transition-colors" onClick={closeMenu}>
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>)}
              
              {/* Admin link - also visible on mobile */}
              <Link to="/admin" className="flex items-center text-2xl font-medium text-music-300 hover:text-white transition-colors" onClick={closeMenu}>
                Admin
              </Link>
            </nav>
          </div>}
      </div>
    </header>;
};
export default Navigation;