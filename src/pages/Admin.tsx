import React, { useState, useRef } from "react";
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
import { Music, Upload, FileText, Plus, Save, Edit, Trash2, FileAudio } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

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

interface AudioFile {
  id: number;
  name: string;
  size: string;
  type: string;
  uploadDate: string;
  url: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
  
  // State for audio files
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>(() => {
    const savedAudioFiles = localStorage.getItem('audioFiles');
    return savedAudioFiles ? JSON.parse(savedAudioFiles) : [];
  });
  
  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFileName, setCurrentFileName] = useState("");

  // State for edit mode
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);
  const [editingRelease, setEditingRelease] = useState<Release | null>(null);
  const [editingUpdate, setEditingUpdate] = useState<Update | null>(null);
  const [editingAudio, setEditingAudio] = useState<AudioFile | null>(null);

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
  
  const audioForm = useForm({
    defaultValues: {
      name: ""
    }
  });

  // Reset forms when switching to edit mode
  React.useEffect(() => {
    if (editingTrack) {
      trackForm.reset({
        title: editingTrack.title,
        duration: editingTrack.duration,
        coverArt: editingTrack.coverArt
      });
    }
  }, [editingTrack, trackForm]);

  React.useEffect(() => {
    if (editingRelease) {
      releaseForm.reset({
        title: editingRelease.title,
        releaseDate: editingRelease.releaseDate,
        coverArt: editingRelease.coverArt,
        tracks: editingRelease.tracks
      });
    }
  }, [editingRelease, releaseForm]);

  React.useEffect(() => {
    if (editingUpdate) {
      updateForm.reset({
        title: editingUpdate.title,
        date: editingUpdate.date,
        content: editingUpdate.content,
        image: editingUpdate.image || ""
      });
    }
  }, [editingUpdate, updateForm]);
  
  React.useEffect(() => {
    if (editingAudio) {
      audioForm.reset({
        name: editingAudio.name
      });
    }
  }, [editingAudio, audioForm]);

  // Functions to handle form submissions
  const handleAddTrack = (data: any) => {
    if (editingTrack) {
      // Update existing track
      const updatedTracks = tracks.map(track => 
        track.id === editingTrack.id ? { ...track, ...data } : track
      );
      setTracks(updatedTracks);
      localStorage.setItem('tracks', JSON.stringify(updatedTracks));
      setEditingTrack(null);
      toast.success("Track updated successfully!");
    } else {
      // Add new track
      const newTrack = {
        id: tracks.length ? Math.max(...tracks.map(t => t.id)) + 1 : 1,
        ...data
      };
      
      const updatedTracks = [...tracks, newTrack];
      setTracks(updatedTracks);
      localStorage.setItem('tracks', JSON.stringify(updatedTracks));
      toast.success("Track added successfully!");
    }
    
    trackForm.reset({
      title: "",
      duration: "",
      coverArt: "/placeholder.svg"
    });
  };

  const handleAddRelease = (data: any) => {
    if (editingRelease) {
      // Update existing release
      const updatedReleases = releases.map(release => 
        release.id === editingRelease.id ? { ...release, ...data } : release
      );
      setReleases(updatedReleases);
      localStorage.setItem('releases', JSON.stringify(updatedReleases));
      setEditingRelease(null);
      toast.success("Release updated successfully!");
    } else {
      // Add new release
      const newRelease = {
        id: releases.length ? Math.max(...releases.map(r => r.id)) + 1 : 1,
        ...data
      };
      
      const updatedReleases = [...releases, newRelease];
      setReleases(updatedReleases);
      localStorage.setItem('releases', JSON.stringify(updatedReleases));
      toast.success("Release added successfully!");
    }
    
    releaseForm.reset({
      title: "",
      releaseDate: "",
      coverArt: "/placeholder.svg",
      tracks: 1
    });
  };

  const handleAddUpdate = (data: any) => {
    if (editingUpdate) {
      // Update existing update
      const updatedUpdates = updates.map(update => 
        update.id === editingUpdate.id ? { ...update, ...data } : update
      );
      setUpdates(updatedUpdates);
      localStorage.setItem('updates', JSON.stringify(updatedUpdates));
      setEditingUpdate(null);
      toast.success("Update post updated successfully!");
    } else {
      // Add new update
      const newUpdate = {
        id: updates.length ? Math.max(...updates.map(u => u.id)) + 1 : 1,
        ...data
      };
      
      const updatedUpdates = [...updates, newUpdate];
      setUpdates(updatedUpdates);
      localStorage.setItem('updates', JSON.stringify(updatedUpdates));
      toast.success("Update post added successfully!");
    }
    
    updateForm.reset({
      title: "",
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      content: "",
      image: ""
    });
  };
  
  // Handle audio file upload
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Check if it's a wav file
      if (file.type !== "audio/wav") {
        toast.error("Only .wav files are allowed");
        return;
      }
      
      setUploading(true);
      setCurrentFileName(file.name);
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          
          // Create file URL (in real app, this would be a server URL)
          const fileUrl = URL.createObjectURL(file);
          
          // Format file size
          const formatFileSize = (bytes: number): string => {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
          };
          
          const newAudioFile = {
            id: audioFiles.length ? Math.max(...audioFiles.map(a => a.id)) + 1 : 1,
            name: file.name,
            size: formatFileSize(file.size),
            type: file.type,
            uploadDate: new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            url: fileUrl
          };
          
          const updatedAudioFiles = [...audioFiles, newAudioFile];
          setAudioFiles(updatedAudioFiles);
          localStorage.setItem('audioFiles', JSON.stringify(updatedAudioFiles));
          
          setUploading(false);
          setUploadProgress(0);
          setCurrentFileName("");
          
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          
          toast.success("Audio file uploaded successfully!");
        }
      }, 100);
    }
  };
  
  // Handle audio file rename
  const handleRenameAudio = (data: any) => {
    if (editingAudio) {
      const updatedAudioFiles = audioFiles.map(audio => 
        audio.id === editingAudio.id ? { ...audio, name: data.name } : audio
      );
      setAudioFiles(updatedAudioFiles);
      localStorage.setItem('audioFiles', JSON.stringify(updatedAudioFiles));
      setEditingAudio(null);
      toast.success("Audio file renamed successfully!");
      
      audioForm.reset({ name: "" });
    }
  };

  // Delete functions
  const handleDeleteTrack = (id: number) => {
    const updatedTracks = tracks.filter(track => track.id !== id);
    setTracks(updatedTracks);
    localStorage.setItem('tracks', JSON.stringify(updatedTracks));
    toast.success("Track deleted successfully!");
  };

  const handleDeleteRelease = (id: number) => {
    const updatedReleases = releases.filter(release => release.id !== id);
    setReleases(updatedReleases);
    localStorage.setItem('releases', JSON.stringify(updatedReleases));
    toast.success("Release deleted successfully!");
  };

  const handleDeleteUpdate = (id: number) => {
    const updatedUpdates = updates.filter(update => update.id !== id);
    setUpdates(updatedUpdates);
    localStorage.setItem('updates', JSON.stringify(updatedUpdates));
    toast.success("Update post deleted successfully!");
  };
  
  const handleDeleteAudio = (id: number) => {
    const updatedAudioFiles = audioFiles.filter(audio => audio.id !== id);
    setAudioFiles(updatedAudioFiles);
    localStorage.setItem('audioFiles', JSON.stringify(updatedAudioFiles));
    toast.success("Audio file deleted successfully!");
  };

  // Cancel edit mode
  const handleCancelEdit = (type: 'track' | 'release' | 'update' | 'audio') => {
    if (type === 'track') {
      setEditingTrack(null);
      trackForm.reset({
        title: "",
        duration: "",
        coverArt: "/placeholder.svg"
      });
    } else if (type === 'release') {
      setEditingRelease(null);
      releaseForm.reset({
        title: "",
        releaseDate: "",
        coverArt: "/placeholder.svg",
        tracks: 1
      });
    } else if (type === 'update') {
      setEditingUpdate(null);
      updateForm.reset({
        title: "",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        content: "",
        image: ""
      });
    } else {
      setEditingAudio(null);
      audioForm.reset({ name: "" });
    }
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
            Manage your music, releases, updates, and audio files here.
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
            <TabsTrigger value="audio" className="data-[state=active]:bg-music-700">
              <FileAudio className="mr-2 h-4 w-4" />
              Audio Files
            </TabsTrigger>
          </TabsList>
          
          {/* Music Tracks Tab */}
          <TabsContent value="music" className="space-y-8">
            <div className="music-card p-6">
              <h2 className="text-xl font-medium text-white mb-4">
                {editingTrack ? "Edit Track" : "Add New Track"}
              </h2>
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
                  
                  <div className="flex space-x-2">
                    <Button type="submit" className="bg-music-800 hover:bg-music-700 text-white">
                      <Save className="mr-2 h-4 w-4" />
                      {editingTrack ? "Update Track" : "Add Track"}
                    </Button>
                    
                    {editingTrack && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => handleCancelEdit('track')}
                        className="border-music-700 text-music-300 hover:bg-music-800"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </div>
            
            {/* Display current tracks */}
            <div>
              <h2 className="text-xl font-medium text-white mb-4">Current Tracks</h2>
              <div className="music-card p-0 overflow-hidden">
                <Table>
                  <TableHeader className="bg-music-800">
                    <TableRow className="hover:bg-music-800/80">
                      <TableHead>Cover Art</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tracks.map(track => (
                      <TableRow key={track.id} className="hover:bg-music-800/40 border-music-700">
                        <TableCell className="pl-4">
                          <img src={track.coverArt} alt={track.title} className="w-10 h-10 object-cover rounded" />
                        </TableCell>
                        <TableCell>{track.title}</TableCell>
                        <TableCell>{track.duration}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setEditingTrack(track)}
                            className="hover:bg-music-800 hover:text-white"
                          >
                            <Edit size={16} />
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="hover:bg-music-800 hover:text-white"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-music-900 border-music-700">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">Delete Track</AlertDialogTitle>
                                <AlertDialogDescription className="text-music-300">
                                  Are you sure you want to delete "{track.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-music-800 text-white hover:bg-music-700 border-none">Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteTrack(track.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          {/* Releases Tab */}
          <TabsContent value="releases" className="space-y-8">
            <div className="music-card p-6">
              <h2 className="text-xl font-medium text-white mb-4">
                {editingRelease ? "Edit Release" : "Add New Release"}
              </h2>
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
                  
                  <div className="flex space-x-2">
                    <Button type="submit" className="bg-music-800 hover:bg-music-700 text-white">
                      <Save className="mr-2 h-4 w-4" />
                      {editingRelease ? "Update Release" : "Add Release"}
                    </Button>
                    
                    {editingRelease && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => handleCancelEdit('release')}
                        className="border-music-700 text-music-300 hover:bg-music-800"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </div>
            
            {/* Display current releases */}
            <div>
              <h2 className="text-xl font-medium text-white mb-4">Current Releases</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {releases.map(release => (
                  <div key={release.id} className="music-card overflow-hidden">
                    <div className="relative">
                      <img src={release.coverArt} alt={release.title} className="w-full aspect-square object-cover" />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-8 w-8 rounded-full bg-black/40 border-white/20 hover:bg-black/60"
                          onClick={() => setEditingRelease(release)}
                        >
                          <Edit size={14} />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-8 w-8 rounded-full bg-black/40 border-white/20 hover:bg-black/60 hover:text-red-400"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-music-900 border-music-700">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">Delete Release</AlertDialogTitle>
                              <AlertDialogDescription className="text-music-300">
                                Are you sure you want to delete "{release.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-music-800 text-white hover:bg-music-700 border-none">Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteRelease(release.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
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
              <h2 className="text-xl font-medium text-white mb-4">
                {editingUpdate ? "Edit Update" : "Add New Update"}
              </h2>
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
                  
                  <div className="flex space-x-2">
                    <Button type="submit" className="bg-music-800 hover:bg-music-700 text-white">
                      <Save className="mr-2 h-4 w-4" />
                      {editingUpdate ? "Update Post" : "Add Update"}
                    </Button>
                    
                    {editingUpdate && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => handleCancelEdit('update')}
                        className="border-music-700 text-music-300 hover:bg-music-800"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </div>
            
            {/* Display current updates */}
            <div>
              <h2 className="text-xl font-medium text-white mb-4">Current Updates</h2>
              <div className="space-y-4">
                {updates.map(update => (
                  <div key={update.id} className="music-card p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-white font-medium">{update.title}</h3>
                        <p className="text-music-400 text-sm mb-2">{update.date}</p>
                      </div>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="hover:bg-music-800 hover:text-white"
                          onClick={() => setEditingUpdate(update)}
                        >
                          <Edit size={16} />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="hover:bg-music-800 hover:text-white"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-music-900 border-music-700">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">Delete Update</AlertDialogTitle>
                              <AlertDialogDescription className="text-music-300">
                                Are you sure you want to delete "{update.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-music-800 text-white hover:bg-music-700 border-none">Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteUpdate(update.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
