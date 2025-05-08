
import React from "react";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

interface Update {
  id: number;
  title: string;
  date: string;
  content: string;
  image?: string;
}

interface UpdatesContentProps {
  updates: Update[];
  className?: string;
}

const UpdatesContent: React.FC<UpdatesContentProps> = ({ updates, className }) => {
  return (
    <div className={cn("space-y-8", className)}>
      {updates.map((update) => (
        <div
          key={update.id}
          className="music-card p-6 opacity-0 animate-fade-in"
          style={{ animationDelay: `${update.id * 100}ms` }}
        >
          <div className="flex items-center space-x-2 text-music-400 mb-2">
            <CalendarDays size={16} />
            <span className="text-sm">{update.date}</span>
          </div>
          <h3 className="text-xl font-medium text-white mb-3">{update.title}</h3>
          <div className="prose prose-invert max-w-none">
            <p className="text-music-300">{update.content}</p>
          </div>
          {update.image && (
            <div className="mt-4">
              <img 
                src={update.image} 
                alt={update.title}
                className="rounded-md w-full object-cover max-h-80"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UpdatesContent;
