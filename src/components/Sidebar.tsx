import React from 'react';
import { Home, Search, PlusSquare, Compass, User, Heart, MessageCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  currentView: 'home' | 'explore' | 'upload' | 'profile' | 'notifications' | 'messages' | 'settings';
  onViewChange: (view: 'home' | 'explore' | 'upload' | 'profile' | 'notifications' | 'messages' | 'settings') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const navigationItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'explore', icon: Compass, label: 'Explore' },
    { id: 'upload', icon: PlusSquare, label: 'Create' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 glass-card border-r border-border">
      <div className="p-6">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold gradient-text">Instacam</h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start gap-3 h-12 ${
                  isActive 
                    ? 'neuro-card text-primary-foreground' 
                    : 'hover:neuro-inset hover:bg-secondary/50'
                }`}
                onClick={() => onViewChange(item.id as any)}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Button>
            );
          })}
        </nav>

        {/* Secondary Actions */}
        <div className="mt-8 space-y-2">
            <Button
              variant={currentView === 'notifications' ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-12 transition-all duration-200 hover:scale-105 relative ${
                currentView === 'notifications'
                  ? 'neuro-card text-primary-foreground' 
                  : 'hover:neuro-inset hover:bg-secondary/50'
              }`}
              onClick={() => onViewChange('notifications')}
            >
              <Heart className="w-5 h-5" />
              <span>Notifications</span>
              <div className="absolute right-3 top-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </Button>
          
            <Button
              variant={currentView === 'messages' ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-12 transition-all duration-200 hover:scale-105 relative ${
                currentView === 'messages'
                  ? 'neuro-card text-primary-foreground' 
                  : 'hover:neuro-inset hover:bg-secondary/50'
              }`}
              onClick={() => onViewChange('messages')}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Messages</span>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                3
              </div>
            </Button>

            <Button
              variant={currentView === 'settings' ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-12 transition-all duration-200 hover:scale-105 ${
                currentView === 'settings'
                  ? 'neuro-card text-primary-foreground' 
                  : 'hover:neuro-inset hover:bg-secondary/50'
              }`}
              onClick={() => onViewChange('settings')}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Button>
        </div>
      </div>
    </aside>
  );
};