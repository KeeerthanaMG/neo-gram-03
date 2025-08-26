import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';
import { StoryViewer } from './StoryViewer';

const mockStories = [
  {
    id: 1,
    username: 'Your Story',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    hasStory: false,
    isOwn: true,
    image: '',
    timestamp: ''
  },
  {
    id: 2,
    username: 'alex_wanderer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    hasStory: true,
    isOwn: false,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=700&fit=crop',
    timestamp: '2h ago'
  },
  {
    id: 3,
    username: 'sarah_creates',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face',
    hasStory: true,
    isOwn: false,
    image: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=700&fit=crop',
    timestamp: '4h ago'
  },
  {
    id: 4,
    username: 'david_lens',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    hasStory: true,
    isOwn: false,
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=700&fit=crop',
    timestamp: '6h ago'
  },
  {
    id: 5,
    username: 'maya_travels',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    hasStory: true,
    isOwn: false,
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=700&fit=crop',
    timestamp: '8h ago'
  },
  {
    id: 6,
    username: 'jake_fitness',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    hasStory: true,
    isOwn: false,
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=700&fit=crop',
    timestamp: '12h ago'
  }
];

export const StoryBar: React.FC = () => {
  const [viewingStory, setViewingStory] = useState<number | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const storiesWithContent = mockStories.filter(story => story.hasStory && !story.isOwn);

  const handleStoryClick = (storyId: number) => {
    if (storyId === 1) return; // Your Story - could open camera
    const storyIndex = storiesWithContent.findIndex(story => story.id === storyId);
    if (storyIndex !== -1) {
      setCurrentStoryIndex(storyIndex);
      setViewingStory(storyId);
    }
  };

  const handleNextStory = () => {
    if (currentStoryIndex < storiesWithContent.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      setViewingStory(null);
    }
  };

  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  return (
    <div className="glass-card p-4">
      <div className="flex space-x-4 overflow-x-auto custom-scrollbar pb-2">
        {mockStories.map((story) => (
          <div 
            key={story.id} 
            className="flex-shrink-0 text-center cursor-pointer group"
            onClick={() => handleStoryClick(story.id)}
          >
            <div className="relative">
              <div className={`
                w-16 h-16 rounded-full p-0.5 transition-all duration-300 hover:scale-110
                ${story.hasStory && !story.isOwn 
                  ? 'story-ring' 
                  : 'bg-border hover:bg-primary/20'
                }
              `}>
                <div className="w-full h-full rounded-full bg-background p-0.5">
                  <Avatar className="w-full h-full">
                    <AvatarImage src={story.avatar} />
                    <AvatarFallback>{story.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              
              {story.isOwn && (
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                  <Plus className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
            </div>
            
            <p className="text-xs mt-2 text-muted-foreground truncate w-16 group-hover:text-foreground transition-colors">
              {story.username}
            </p>
          </div>
        ))}
      </div>
      
      {/* Story Viewer */}
      {viewingStory && (
        <StoryViewer
          stories={storiesWithContent}
          currentIndex={currentStoryIndex}
          onClose={() => setViewingStory(null)}
          onNext={handleNextStory}
          onPrevious={handlePreviousStory}
        />
      )}
    </div>
  );
};