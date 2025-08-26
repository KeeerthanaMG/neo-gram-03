import React, { useState } from 'react';
import { Feed } from '../components/Feed';
import { Explore } from '../components/Explore';
import { Upload } from '../components/Upload';
import { Profile } from '../components/Profile';
import { Notifications } from '../components/Notifications';
import { Messages } from '../components/Messages';
import { Settings } from '../components/Settings';
import { Sidebar } from '../components/Sidebar';
import { MobileNavigation } from '../components/MobileNavigation';
import { ThemeToggle } from '../components/ThemeToggle';
import StoryModal from '../components/StoryModal';

interface IndexProps {
  onSignOut: () => void;
}

const Index: React.FC<IndexProps> = ({ onSignOut }) => {
  const [currentView, setCurrentView] = useState<'home' | 'explore' | 'upload' | 'profile' | 'notifications' | 'messages' | 'settings'>('home');
  const [storyModal, setStoryModal] = useState<{
    isOpen: boolean;
    story: {
      id: string;
      username: string;
      avatar: string;
      image: string;
      timestamp: string;
    } | null;
  }>({
    isOpen: false,
    story: null
  });

  const openStoryModal = (story: any) => {
    setStoryModal({
      isOpen: true,
      story
    });
  };

  const closeStoryModal = () => {
    setStoryModal({
      isOpen: false,
      story: null
    });
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <Feed onStoryClick={openStoryModal} />;
      case 'explore':
        return <Explore />;
      case 'upload':
        return <Upload />;
      case 'profile':
        return <Profile />;
      case 'notifications':
        return <Notifications />;
      case 'messages':
        return <Messages />;
      case 'settings':
        return <Settings onSignOut={onSignOut} />;
      default:
        return <Feed onStoryClick={openStoryModal} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Desktop Layout */}
      <div className="hidden md:flex w-full min-h-screen">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        
        <main className="flex-1 relative">
          {/* Theme Toggle */}
          <div className="absolute top-4 right-4 z-10">
            <ThemeToggle />
          </div>
          
          <div className="max-w-4xl mx-auto px-4 py-6">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Theme Toggle for Mobile */}
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        
        <main className="pb-20">
          <div className="max-w-sm mx-auto px-4 py-6">
            {renderContent()}
          </div>
        </main>
        
        <MobileNavigation currentView={currentView} onViewChange={setCurrentView} />
      </div>

      {/* Story Modal */}
      <StoryModal
        isOpen={storyModal.isOpen}
        onClose={closeStoryModal}
        story={storyModal.story}
      />
    </div>
  );
};

export default Index;
