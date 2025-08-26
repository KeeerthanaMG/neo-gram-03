import React from 'react';
import { Home, Search, PlusSquare, Compass, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileNavigationProps {
  currentView: 'home' | 'explore' | 'upload' | 'profile' | 'notifications' | 'messages' | 'settings';
  onViewChange: (view: 'home' | 'explore' | 'upload' | 'profile' | 'notifications' | 'messages' | 'settings') => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ currentView, onViewChange }) => {
  const navigationItems = [
    { id: 'home', icon: Home },
    { id: 'explore', icon: Compass },
    { id: 'upload', icon: PlusSquare },
    { id: 'profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-border z-40">
      <div className="flex items-center justify-around py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex-1 h-12 transition-all duration-200 ${
                isActive 
                  ? 'text-primary scale-110' 
                  : 'text-muted-foreground hover:text-foreground hover:scale-105'
              }`}
              onClick={() => onViewChange(item.id as any)}
            >
              <Icon className="w-6 h-6" />
            </Button>
          );
        })}
      </div>
    </nav>
  );
};