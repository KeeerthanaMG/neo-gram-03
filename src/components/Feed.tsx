import React, { useState } from 'react';
import { PostCard } from './PostCard';
import { StoryBar } from './StoryBar';

// Mock data for posts
const mockPosts = [
  {
    id: 1,
    user: {
      username: 'alex_wanderer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      name: 'Alex Johnson'
    },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop',
    caption: 'Lost in the beauty of mountain peaks 🏔️ #adventure #nature #mountains',
    likes: 2847,
    comments: 124,
    timestamp: '2 hours ago',
    isLiked: false
  },
  {
    id: 2,
    user: {
      username: 'sarah_creates',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face',
      name: 'Sarah Chen'
    },
    image: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=800&fit=crop',
    caption: 'Morning coffee and creativity ☕✨ Starting the day right!',
    likes: 1923,
    comments: 87,
    timestamp: '4 hours ago',
    isLiked: true
  },
  {
    id: 3,
    user: {
      username: 'david_lens',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      name: 'David Miller'
    },
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=800&fit=crop',
    caption: 'Chasing sunsets and dreams 🌅 Life is beautiful when you stop to notice',
    likes: 3567,
    comments: 234,
    timestamp: '6 hours ago',
    isLiked: false
  },
  {
    id: 4,
    user: {
      username: 'maya_travels',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      name: 'Maya Patel'
    },
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=800&fit=crop',
    caption: 'Street art speaks to the soul 🎨 Found this amazing mural in downtown!',
    likes: 1456,
    comments: 98,
    timestamp: '8 hours ago',
    isLiked: true
  }
];

export const Feed: React.FC = () => {
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Stories */}
      <StoryBar />
      
      {/* Posts */}
      <div className="space-y-8">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
          />
        ))}
      </div>
    </div>
  );
};