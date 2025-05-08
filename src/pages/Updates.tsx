
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import UpdatesContent from "../components/UpdatesContent";

const Updates = () => {
  // State for updates
  const [updates, setUpdates] = useState(() => {
    const savedUpdates = localStorage.getItem('updates');
    return savedUpdates ? JSON.parse(savedUpdates) : [
      {
        id: 1,
        title: "New Album Coming Soon",
        date: "May 5, 2025",
        content: "I'm excited to announce that my new album will be released next month. It's been an incredible journey creating this collection of tracks, and I can't wait to share them with you all. The album features collaborations with several talented artists and explores new sonic territories that I've been eager to venture into.",
        image: "/placeholder.svg"
      },
      {
        id: 2,
        title: "Studio Session Complete",
        date: "April 20, 2025",
        content: "Just wrapped up an incredible studio session for the upcoming album. The energy was amazing, and we created some of my best work yet. Special thanks to everyone involved in making this happen. The mixing process starts next week!"
      },
      {
        id: 3,
        title: "Live Performance Announced",
        date: "March 15, 2025",
        content: "I'm thrilled to announce that I'll be performing live at Soundwave Festival this summer. This will be my first live performance showcasing the new material, and I'm looking forward to seeing everyone there. Tickets go on sale next week!",
        image: "/placeholder.svg"
      },
      {
        id: 4,
        title: "New Single Released",
        date: "February 28, 2025",
        content: "My latest single 'Midnight Symphony' is now available on all streaming platforms. This track represents a new direction in my sound, combining electronic elements with orchestral arrangements. Check it out and let me know what you think!"
      },
      {
        id: 5,
        title: "Production Diary: Week One",
        date: "January 10, 2025",
        content: "I've started documenting my production process for the new album. Week one has been all about creating sketches and exploring different sound palettes. I'm finding inspiration in unexpected places and excited about the direction things are heading."
      }
    ];
  });

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedUpdates = localStorage.getItem('updates');
      if (savedUpdates) {
        const parsedUpdates = JSON.parse(savedUpdates);
        // Sort updates by id in descending order (newest first)
        const sortedUpdates = [...parsedUpdates].sort((a, b) => b.id - a.id);
        setUpdates(sortedUpdates);
      }
    };

    // Initial sort
    setUpdates(prev => [...prev].sort((a, b) => b.id - a.id));
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-radial from-music-accent/20 via-transparent to-transparent">
        <div className="music-container py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Updates</h1>
          <p className="text-xl text-music-300">
            Stay connected with the latest news, releases, and behind-the-scenes updates.
          </p>
        </div>
      </section>

      {/* Updates content */}
      <section className="music-container py-12">
        <UpdatesContent updates={updates} />
      </section>
    </Layout>
  );
};

export default Updates;
