
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Music, Upload, FileText, Plus, Save } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the interfaces for our data
interface Track {
  id: number;
  title: string;
  duration: string;
  coverArt: string;
}

interface Release {
  id: number;
  title: string;
  releaseDate: string;
  coverArt: string;
  tracks: number;
}

interface Update {
  id: number;
  title: string;
  date: string;
  content: string;
  image?: string;
}

const Admin = () => {
  const navigate = useNavigate();

  // State for tracks, releases, and updates
  const [tracks, setTracks] = useState<Track[]>(() => {
    const savedTracks = localStorage.getItem('tracks');
    return savedTracks ? JSON.parse(savedTracks) : [
      {
        id: 1,
        title: "Midnight Symphony",
        duration: "3:45",
        coverArt: "/placeholder.svg"
      },
      {
        id: 2,
        title: "Electric Dreams",
        duration: "4:12",
        coverArt: "/placeholder.svg"
      },
      {
        id: 3,
        title: "Ocean Waves",
        duration: "3:21",
        coverArt: "/placeholder.svg"
      }
    ];
  });

  const [releases, setReleases] = useState<Release[]>(() => {
    const savedReleases = localStorage.getItem('releases');
    return savedReleases ? JSON.parse(savedReleases) : [
      {
        id: 1,
        title: "Neon Nights",
        releaseDate: "May 2025",
        coverArt: "/placeholder.svg",
        tracks: 4
      },
      {
        id: 2,
        title: "Digital Dreamscape",
        releaseDate: "January 2025",
        coverArt: "/placeholder.svg",
        tracks: 6
      },
      {
        id: 3,
        title: "First Light",
        releaseDate: "October 2024",
        coverArt: "/placeholder.svg",
        tracks: 5
      }
    ];
  });

  const [updates, setUpdates] = useState<Update[]>(() => {
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
      }
    ];
  });

  // Create forms for track, release, and update
  const trackForm = useForm({
    defaultValues: {
      title: "",
      duration: "",
      coverArt: "/placeholder.svg"
    }
  });

  const releaseForm = useForm({
    defaultValues: {
      title: "",
      releaseDate: "",
      coverArt: "/placeholder.svg",
      tracks: 1
    }
  });

  const updateForm = useForm({
    defaultValues: {
      title: "",
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      content: "",
      image: ""
    }
  });

  // Functions to handle form submissions
  const handleAddTrack = (data: any) => {
    const newTrack = {
      id: tracks.length ? Math.max(...tracks.map(t => t.id)) + 1 : 1,
      ...data
    };
    
    const updatedTracks = [...tracks, newTrack];
    setTracks(updatedTracks);
    localStorage.setItem('tracks', JSON.stringify(updatedTracks));
    trackForm.reset();
    toast.success("Track added successfully!");
  };

  const handleAddRelease = (data: any) => {
    const newRelease = {
      id: releases.length ? Math.max(...releases.map(r => r.id)) + 1 : 1,
      ...data
    };
    
    const updatedReleases = [...releases, newRelease];
    setReleases(updatedReleases);
    localStorage.setItem('releases', JSON.stringify(updatedReleases));
    releaseForm.reset();
    toast.success("Release added successfully!");
  };

  const handleAddUpdate = (data: any) => {
    const newUpdate = {
      id: updates.length ? Math.max(...updates.map(u => u.id)) + 1 : 1,
      ...data
    };
    
    const updatedUpdates = [...updates, newUpdate];
    setUpdates(updatedUpdates);
    localStorage.setItem('updates', JSON.stringify(updatedUpdates));
    updateForm.reset();
    toast.success("Update added successfully!");
  };

  // Function to handle view navigation
  const handleViewSite = () => {
    navigate('/');
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-radial from-music-accent/20 via-transparent to-transparent">
        <div className="music-container py-12 md:py-16">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Admin Dashboard</h1>
            <Button onClick={handleViewSite} variant="outline" className="border-white text-white hover:bg-white/10">
              View Public Site
            </Button>
          </div>
          <p className="text-xl text-music-300 mt-4">
            Manage your music, releases, and updates here.
          </p>
        </div>
      </section>

      {/* Admin Content */}
      <section className="music-container py-12">
        <Tabs defaultValue="music" className="w-full">
          <TabsList className="mb-8 bg-music-800 border border-music-700">
            <TabsTrigger value="music" className="data-[state=active]:bg-music-700">
              <Music className="mr-2 h-4 w-4" />
              Music Tracks
            </TabsTrigger>
            <TabsTrigger value="releases" className="data-[state=active]:bg-music-700">
              <FileText className="mr-2 h-4 w-4" />
              Releases
            </TabsTrigger>
            <TabsTrigger value="updates" className="data-[state=active]:bg-music-700">
              <Plus className="mr-2 h-4 w-4" />
              Updates
            </TabsTrigger>
          </TabsList>
          
          {/* Music Tracks Tab */}
          <TabsContent value="music" className="space-y-8">
            <div className="music-card p-6">
              <h2 className="text-xl font-medium text-white mb-4">Add New Track</h2>
              <Form {...trackForm}>
                <form onSubmit={trackForm.handleSubmit(handleAddTrack)} className="space-y-4">
                  <FormField
                    control={trackForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Track Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter track title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={trackForm.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (e.g. 3:45)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter duration" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={trackForm.control}
                    name="coverArt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Art URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter cover art URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="bg-music-800 hover:bg-music-700 text-white">
                    <Save className="mr-2 h-4 w-4" />
                    Add Track
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Display current tracks */}
            <div>
              <h2 className="text-xl font-medium text-white mb-4">Current Tracks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tracks.map(track => (
                  <div key={track.id} className="music-card p-4 flex items-center">
                    <img src={track.coverArt} alt={track.title} className="w-12 h-12 object-cover rounded mr-4" />
                    <div>
                      <h3 className="text-white font-medium">{track.title}</h3>
                      <p className="text-music-400 text-sm">{track.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Releases Tab */}
          <TabsContent value="releases" className="space-y-8">
            <div className="music-card p-6">
              <h2 className="text-xl font-medium text-white mb-4">Add New Release</h2>
              <Form {...releaseForm}>
                <form onSubmit={releaseForm.handleSubmit(handleAddRelease)} className="space-y-4">
                  <FormField
                    control={releaseForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Release Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter release title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={releaseForm.control}
                    name="releaseDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Release Date (e.g. May 2025)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter release date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={releaseForm.control}
                    name="coverArt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Art URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter cover art URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={releaseForm.control}
                    name="tracks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Tracks</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="bg-music-800 hover:bg-music-700 text-white">
                    <Save className="mr-2 h-4 w-4" />
                    Add Release
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Display current releases */}
            <div>
              <h2 className="text-xl font-medium text-white mb-4">Current Releases</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {releases.map(release => (
                  <div key={release.id} className="music-card overflow-hidden">
                    <img src={release.coverArt} alt={release.title} className="w-full aspect-square object-cover" />
                    <div className="p-4">
                      <h3 className="text-white font-medium">{release.title}</h3>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-music-400">{release.releaseDate}</span>
                        <span className="text-sm text-music-400">{release.tracks} tracks</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Updates Tab */}
          <TabsContent value="updates" className="space-y-8">
            <div className="music-card p-6">
              <h2 className="text-xl font-medium text-white mb-4">Add New Update</h2>
              <Form {...updateForm}>
                <form onSubmit={updateForm.handleSubmit(handleAddUpdate)} className="space-y-4">
                  <FormField
                    control={updateForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Update Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter update title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={updateForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={updateForm.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter update content" className="min-h-[150px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={updateForm.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter image URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="bg-music-800 hover:bg-music-700 text-white">
                    <Save className="mr-2 h-4 w-4" />
                    Add Update
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Display current updates */}
            <div>
              <h2 className="text-xl font-medium text-white mb-4">Current Updates</h2>
              <div className="space-y-4">
                {updates.map(update => (
                  <div key={update.id} className="music-card p-4">
                    <h3 className="text-white font-medium">{update.title}</h3>
                    <p className="text-music-400 text-sm mb-2">{update.date}</p>
                    <p className="text-music-300 line-clamp-2">{update.content}</p>
                    {update.image && (
                      <div className="mt-2">
                        <span className="text-sm text-music-400">Has image: Yes</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
};

export default Admin;
