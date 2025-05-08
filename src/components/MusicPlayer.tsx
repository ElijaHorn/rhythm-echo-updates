
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface Track {
  id: number;
  title: string;
  duration: string;
  coverArt: string;
}

interface MusicPlayerProps {
  tracks: Track[];
  className?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ tracks, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const previousTrack = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : tracks.length - 1;
    setCurrentTrack(tracks[prevIndex]);
    setCurrentTime(0);
    if (!isPlaying) setIsPlaying(true);
  };
  
  const nextTrack = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const nextIndex = currentIndex < tracks.length - 1 ? currentIndex + 1 : 0;
    setCurrentTrack(tracks[nextIndex]);
    setCurrentTime(0);
    if (!isPlaying) setIsPlaying(true);
  };
  
  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
  };
  
  const handleProgressChange = (newTime: number[]) => {
    setCurrentTime(newTime[0]);
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={18} />;
    if (volume < 50) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };
  
  // Mock total duration in seconds (would come from actual audio element)
  const totalDuration = 180;

  return (
    <div className={cn("music-card p-4 w-full", className)}>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img 
            src={currentTrack.coverArt} 
            alt={currentTrack.title}
            className="w-16 h-16 object-cover rounded-md"
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-white font-medium truncate">{currentTrack.title}</h3>
          <div className="flex items-center mt-2">
            <span className="text-xs text-music-400 w-8">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              min={0}
              max={totalDuration}
              step={1}
              onValueChange={handleProgressChange}
              className="mx-2"
            />
            <span className="text-xs text-music-400 w-8">{currentTrack.duration}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost" 
                size="icon"
                className="text-music-300 hover:text-white hover:bg-music-700 rounded-full h-8 w-8"
                onClick={previousTrack}
              >
                <SkipBack size={16} />
              </Button>
              <Button
                variant="ghost" 
                size="icon"
                className="bg-music-accent hover:bg-music-accent-hover text-white rounded-full h-10 w-10 flex items-center justify-center"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </Button>
              <Button
                variant="ghost" 
                size="icon"
                className="text-music-300 hover:text-white hover:bg-music-700 rounded-full h-8 w-8"
                onClick={nextTrack}
              >
                <SkipForward size={16} />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <VolumeIcon />
              <Slider
                value={[volume]}
                min={0}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
