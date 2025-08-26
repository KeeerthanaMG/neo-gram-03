import React, { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const mockExploreData = [
  {
    id: 1,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
    likes: 1243,
    comments: 67
  },
  {
    id: 2,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    likes: 2847,
    comments: 124
  },
  {
    id: 3,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=400&fit=crop',
    likes: 1923,
    comments: 87
  },
  {
    id: 4,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop',
    likes: 3567,
    comments: 234
  },
  {
    id: 5,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=400&fit=crop',
    likes: 1456,
    comments: 98
  },
  {
    id: 6,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=400&fit=crop',
    likes: 2134,
    comments: 156
  },
  {
    id: 7,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1502780402662-acc01917949e?w=400&h=400&fit=crop',
    likes: 987,
    comments: 43
  },
  {
    id: 8,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
    likes: 1678,
    comments: 89
  },
  {
    id: 9,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop',
    likes: 3421,
    comments: 267
  }
];

const trendingSearches = [
  'nature photography',
  'urban art',
  'travel',
  'food',
  'fashion',
  'architecture',
  'sunset',
  'minimalism'
];

export const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(mockExploreData);
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Simple search simulation
    if (query.trim()) {
      const filtered = mockExploreData.filter(() => Math.random() > 0.3);
      setFilteredData(filtered);
      toast({
        description: `Found ${filtered.length} posts for "${query}"`,
      });
    } else {
      setFilteredData(mockExploreData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="glass-card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for posts, people, or topics..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            className="pl-10 neuro-inset bg-transparent"
          />
        </div>
        
        {/* Trending Searches */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Trending</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((term) => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                className="text-xs neuro-card hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleSearch(term)}
              >
                #{term}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Explore Grid */}
      <div className="grid grid-cols-3 gap-1 md:gap-2">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="aspect-square relative group cursor-pointer overflow-hidden"
          >
            <img
              src={item.image}
              alt="Explore content"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex items-center space-x-4 text-white">
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span className="text-sm font-medium">{item.likes}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M21 6h-2l-1.27-1.27A2 2 0 0 0 16.32 4H7.68a2 2 0 0 0-1.41.59L5 6H3a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a1 1 0 0 0-1-1zM12 17a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/>
                  </svg>
                  <span className="text-sm font-medium">{item.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Load More */}
      <div className="text-center py-8">
        <Button
          variant="outline"
          className="neuro-card hover:neuro-inset transition-all duration-200 hover:scale-105"
          onClick={() => {
            const newPosts = Array.from({ length: 6 }, (_, i) => ({
              id: filteredData.length + i + 1,
              type: 'image' as const,
              image: `https://images.unsplash.com/photo-${1500000000000 + Math.random() * 100000000}?w=400&h=400&fit=crop`,
              likes: Math.floor(Math.random() * 3000) + 100,
              comments: Math.floor(Math.random() * 200) + 10
            }));
            setFilteredData([...filteredData, ...newPosts]);
            toast({
              description: "Loaded 6 more posts",
            });
          }}
        >
          Load More Posts
        </Button>
      </div>
    </div>
  );
};