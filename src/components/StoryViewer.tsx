import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Story {
  id: number;
  username: string;
  avatar: string;
  image: string;
  timestamp: string;
}

interface StoryViewerProps {
  stories: Story[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  currentIndex,
  onClose,
  onNext,
  onPrevious
}) => {
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const currentStory = stories[currentIndex];
  const storyDuration = 5000; // 5 seconds

  useEffect(() => {
    setProgress(0);
    setIsLiked(false);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          onNext();
          return 0;
        }
        return prev + (100 / (storyDuration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, onNext]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const centerX = rect.width / 2;

    if (clickX < centerX) {
      onPrevious();
    } else {
      onNext();
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Story Progress */}
      <div className="absolute top-4 left-4 right-4 flex space-x-1 z-10">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-100"
              style={{ 
                width: index < currentIndex ? '100%' : 
                      index === currentIndex ? `${progress}%` : '0%' 
              }}
            />
          </div>
        ))}
      </div>

      {/* Story Header */}
      <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8 border-2 border-white">
            <AvatarImage src={currentStory.avatar} />
            <AvatarFallback>{currentStory.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-white font-semibold text-sm">{currentStory.username}</p>
            <p className="text-white/70 text-xs">{currentStory.timestamp}</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Story Content */}
      <div 
        className="relative w-full h-full max-w-sm mx-auto cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={currentStory.image}
          alt="Story"
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Hints */}
        <div className="absolute inset-0 flex">
          <div className="w-1/2 h-full flex items-center justify-start pl-4">
            <ChevronLeft className="w-6 h-6 text-white/50" />
          </div>
          <div className="w-1/2 h-full flex items-center justify-end pr-4">
            <ChevronRight className="w-6 h-6 text-white/50" />
          </div>
        </div>
      </div>

      {/* Story Actions */}
      <div className="absolute bottom-8 left-4 right-4 flex items-center space-x-4 z-10">
        <input
          type="text"
          placeholder="Send message"
          className="flex-1 bg-transparent border border-white/30 rounded-full px-4 py-2 text-white placeholder:text-white/70 outline-none focus:border-white/50"
        />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsLiked(!isLiked)}
          className={`text-white hover:bg-white/20 ${isLiked ? 'text-red-500' : ''}`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};