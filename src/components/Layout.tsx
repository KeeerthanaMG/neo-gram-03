import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { MobileNavigation } from './MobileNavigation';
import { ThemeToggle } from './ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'home' | 'explore' | 'upload' | 'profile' | 'notifications' | 'messages' | 'settings'>('home');

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
            {children}
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
            {children}
          </div>
        </main>
        
        <MobileNavigation currentView={currentView} onViewChange={setCurrentView} />
      </div>
    </div>
  );
};