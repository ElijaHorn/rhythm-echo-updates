import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import MusicPlayer from "../components/MusicPlayer";
import MusicReleases from "../components/MusicReleases";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
const Index = () => {
  // State for tracks, releases, and latest update
  const [tracks, setTracks] = useState(() => {
    const savedTracks = localStorage.getItem('tracks');
    return savedTracks ? JSON.parse(savedTracks) : [{
      id: 1,
      title: "Midnight Symphony",
      duration: "3:45",
      coverArt: "/placeholder.svg"
    }, {
      id: 2,
      title: "Electric Dreams",
      duration: "4:12",
      coverArt: "/placeholder.svg"
    }, {
      id: 3,
      title: "Ocean Waves",
      duration: "3:21",
      coverArt: "/placeholder.svg"
    }];
  });
  const [releases, setReleases] = useState(() => {
    const savedReleases = localStorage.getItem('releases');
    return savedReleases ? JSON.parse(savedReleases) : [{
      id: 1,
      title: "Neon Nights",
      releaseDate: "May 2025",
      coverArt: "/placeholder.svg",
      tracks: 4
    }, {
      id: 2,
      title: "Digital Dreamscape",
      releaseDate: "January 2025",
      coverArt: "/placeholder.svg",
      tracks: 6
    }, {
      id: 3,
      title: "First Light",
      releaseDate: "October 2024",
      coverArt: "/placeholder.svg",
      tracks: 5
    }];
  });
  const [latestUpdate, setLatestUpdate] = useState({
    title: "New Album Coming Soon",
    date: "May 5, 2025",
    content: "I'm excited to announce that my new album will be released next month. Stay tuned for more updates!"
  });

  // Load latest update from localStorage
  useEffect(() => {
    const savedUpdates = localStorage.getItem('updates');
    if (savedUpdates) {
      const updates = JSON.parse(savedUpdates);
      if (updates.length > 0) {
        // Sort by id in descending order to get the most recent update
        const sortedUpdates = [...updates].sort((a, b) => b.id - a.id);
        setLatestUpdate(sortedUpdates[0]);
      }
    }
  }, []);

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedTracks = localStorage.getItem('tracks');
      if (savedTracks) setTracks(JSON.parse(savedTracks));
      const savedReleases = localStorage.getItem('releases');
      if (savedReleases) setReleases(JSON.parse(savedReleases));
      const savedUpdates = localStorage.getItem('updates');
      if (savedUpdates) {
        const updates = JSON.parse(savedUpdates);
        if (updates.length > 0) {
          const sortedUpdates = [...updates].sort((a, b) => b.id - a.id);
          setLatestUpdate(sortedUpdates[0]);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  return <Layout>
      {/* Hero section */}
      <section className="relative bg-gradient-radial from-music-accent/20 via-transparent to-transparent">
        <div className="music-container py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white animate-fade-in">elijacreative.org</h1>
            <p className="text-xl text-music-300 mb-8 animate-fade-in animation-delay-200">the host for all my projects</p>
            <div className="flex justify-center space-x-4 animate-fade-in animation-delay-400">
              <Button className="bg-music-accent hover:bg-music-accent-hover text-white px-[50px]">music</Button>
              <Button variant="outline" className="border-music-accent text-music-accent hover:bg-music-accent/10 px-[50px]">updates</Button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-music-accent/10 blur-3xl -z-10" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-music-secondary/10 blur-3xl -z-10" />
      </section>

      {/* Featured music player */}
      <section className="music-container py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white">now playing</h2>
        <MusicPlayer tracks={tracks} />
      </section>

      {/* Music releases */}
      <section className="music-container py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">releases</h2>
        </div>
        <MusicReleases releases={releases} />
      </section>

      {/* Latest update preview */}
      <section className="bg-music-800 border-y border-music-700 py-16">
        <div className="music-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-0">latest update</h2>
            <Button variant="outline" className="border-music-accent text-music-accent hover:bg-music-accent/10" asChild>
              <Link to="/updates">
                <CalendarDays size={16} className="mr-2" />
                View All Updates
              </Link>
            </Button>
          </div>
          
          <div className="music-card p-6">
            <div className="flex items-center space-x-2 text-music-400 mb-2">
              <CalendarDays size={16} />
              <span className="text-sm">{latestUpdate.date}</span>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">{latestUpdate.title}</h3>
            <p className="text-music-300">{latestUpdate.content}</p>
          </div>
        </div>
      </section>

      {/* Newsletter section */}
      
    </Layout>;
};
export default Index;