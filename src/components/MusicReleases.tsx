
import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface Release {
  id: number;
  title: string;
  releaseDate: string;
  coverArt: string;
  tracks: number;
}

interface MusicReleasesProps {
  releases: Release[];
  className?: string;
}

const MusicReleases: React.FC<MusicReleasesProps> = ({ releases, className }) => {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {releases.map((release) => (
        <div key={release.id} className="music-card overflow-hidden group">
          <div className="relative">
            <img
              src={release.coverArt}
              alt={release.title}
              className="w-full aspect-square object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <Button className="bg-music-accent hover:bg-music-accent-hover rounded-full">
                <Play className="mr-1" size={16} />
                Play
              </Button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-white font-medium truncate">{release.title}</h3>
            <div className="flex justify-between mt-1">
              <span className="text-sm text-music-400">{release.releaseDate}</span>
              <span className="text-sm text-music-400">{release.tracks} tracks</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MusicReleases;
