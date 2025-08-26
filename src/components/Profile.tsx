import React, { useState } from 'react';
import { Settings, Grid, Bookmark, UserPlus, MessageCircle, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const mockProfile = {
  username: 'john_photographer',
  name: 'John Smith',
  bio: '📸 Professional photographer\n🌍 Travel enthusiast\n✨ Capturing moments that matter\n📍 Based in San Francisco',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
  posts: 487,
  followers: 12500,
  following: 892,
  isVerified: true,
  isFollowing: false
};

const mockUserPosts = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1502780402662-acc01917949e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop'
];

const mockSavedPosts = [
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1502780402662-acc01917949e?w=400&h=400&fit=crop'
];

export const Profile: React.FC = () => {
  const [isFollowing, setIsFollowing] = useState(mockProfile.isFollowing);
  const [followerCount, setFollowerCount] = useState(mockProfile.followers);
  const { toast } = useToast();

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
    toast({
      description: isFollowing ? "Unfollowed user" : "Started following user",
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="neuro-card p-6">
        <div className="flex items-start space-x-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="w-24 h-24 md:w-32 md:h-32">
              <AvatarImage src={mockProfile.avatar} />
              <AvatarFallback className="text-2xl">
                {mockProfile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            {mockProfile.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-foreground fill-current" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold">{mockProfile.username}</h1>
                <p className="text-muted-foreground">{mockProfile.name}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={isFollowing ? "outline" : "default"}
                  onClick={handleFollow}
                  className="neuro-card hover:scale-105 transition-all duration-200"
                >
                  {isFollowing ? (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>
                
                <Button variant="outline" className="neuro-card hover:scale-105">
                  <MessageCircle className="w-4 h-4" />
                </Button>
                
                <Button variant="outline" size="sm" className="neuro-card hover:scale-105">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex space-x-8 mb-4">
              <div className="text-center">
                <div className="text-xl font-bold">{formatNumber(mockProfile.posts)}</div>
                <div className="text-sm text-muted-foreground">Posts</div>
              </div>
              <div className="text-center cursor-pointer hover:text-primary transition-colors">
                <div className="text-xl font-bold">{formatNumber(followerCount)}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="text-center cursor-pointer hover:text-primary transition-colors">
                <div className="text-xl font-bold">{formatNumber(mockProfile.following)}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
            </div>

            {/* Bio */}
            <div className="text-sm whitespace-pre-line">
              {mockProfile.bio}
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2 neuro-card">
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <Grid className="w-4 h-4" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Bookmark className="w-4 h-4" />
            Saved
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="mt-6">
          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {mockUserPosts.map((image, index) => (
              <div
                key={index}
                className="aspect-square relative group cursor-pointer overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Post ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center space-x-4 text-white">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-5 h-5 fill-current" />
                      <span className="text-sm font-medium">{Math.floor(Math.random() * 1000) + 100}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-5 h-5 fill-current" />
                      <span className="text-sm font-medium">{Math.floor(Math.random() * 100) + 10}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="mt-6">
          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {mockSavedPosts.map((image, index) => (
              <div
                key={index}
                className="aspect-square relative group cursor-pointer overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Saved post ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center space-x-4 text-white">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-5 h-5 fill-current" />
                      <span className="text-sm font-medium">{Math.floor(Math.random() * 500) + 50}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-5 h-5 fill-current" />
                      <span className="text-sm font-medium">{Math.floor(Math.random() * 50) + 5}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};