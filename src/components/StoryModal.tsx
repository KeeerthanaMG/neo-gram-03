import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: {
    id: string;
    username: string;
    avatar: string;
    image: string;
    timestamp: string;
  } | null;
}

const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose, story }) => {
  if (!story) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 bg-black border-none">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-black/50"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
          
          <div className="flex items-center gap-3 p-4 text-white">
            <img
              src={story.avatar}
              alt={story.username}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-medium">{story.username}</span>
            <span className="text-sm text-gray-300">{story.timestamp}</span>
          </div>
          
          <div className="aspect-[9/16] max-h-[80vh]">
            <img
              src={story.image}
              alt="Story"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryModal;
