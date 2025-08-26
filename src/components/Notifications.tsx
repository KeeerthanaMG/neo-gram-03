import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, UserPlus, AtSign } from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    type: 'like',
    user: {
      username: 'alex_wanderer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
    },
    post: {
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop'
    },
    message: 'liked your photo.',
    timestamp: '2h ago',
    read: false
  },
  {
    id: 2,
    type: 'follow',
    user: {
      username: 'sarah_creates',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face'
    },
    message: 'started following you.',
    timestamp: '4h ago',
    read: false
  },
  {
    id: 3,
    type: 'comment',
    user: {
      username: 'david_lens',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    post: {
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=80&h=80&fit=crop'
    },
    message: 'commented on your photo: "Amazing shot! 📸"',
    timestamp: '6h ago',
    read: true
  },
  {
    id: 4,
    type: 'mention',
    user: {
      username: 'maya_travels',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    post: {
      image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=80&h=80&fit=crop'
    },
    message: 'mentioned you in their story.',
    timestamp: '8h ago',
    read: true
  },
  {
    id: 5,
    type: 'like',
    user: {
      username: 'jake_fitness',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    post: {
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=80&h=80&fit=crop'
    },
    message: 'and 12 others liked your photo.',
    timestamp: '12h ago',
    read: true
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'like':
      return <Heart className="w-4 h-4 text-red-500 fill-red-500" />;
    case 'comment':
      return <MessageCircle className="w-4 h-4 text-blue-500" />;
    case 'follow':
      return <UserPlus className="w-4 h-4 text-primary" />;
    case 'mention':
      return <AtSign className="w-4 h-4 text-green-500" />;
    default:
      return <Heart className="w-4 h-4 text-primary" />;
  }
};

export const Notifications: React.FC = () => {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="glass-card p-6">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>
        
        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <div 
              key={notification.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-secondary/50 ${
                !notification.read ? 'bg-primary/5 border border-primary/20' : ''
              }`}
            >
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={notification.user.avatar} />
                  <AvatarFallback>{notification.user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
                  {getNotificationIcon(notification.type)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold">{notification.user.username}</span>
                  {' '}
                  <span className="text-muted-foreground">{notification.message}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
              </div>
              
              {notification.post && (
                <div className="flex-shrink-0">
                  <img 
                    src={notification.post.image} 
                    alt="Post"
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                </div>
              )}
              
              {notification.type === 'follow' && (
                <Button variant="outline" size="sm" className="flex-shrink-0">
                  Follow Back
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="ghost" className="text-sm text-muted-foreground">
            View Older Notifications
          </Button>
        </div>
      </div>
    </div>
  );
};