import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Post {
  id: number;
  user: {
    username: string;
    avatar: string;
    name: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: number) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { toast } = useToast();

  const handleDoubleClick = () => {
    if (!post.isLiked) {
      onLike(post.id);
      setShowLikeAnimation(true);
      setTimeout(() => setShowLikeAnimation(false), 600);
    }
  };

  const handleLike = () => {
    onLike(post.id);
    if (!post.isLiked) {
      setShowLikeAnimation(true);
      setTimeout(() => setShowLikeAnimation(false), 600);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      description: isBookmarked ? "Removed from bookmarks" : "Saved to bookmarks",
    });
  };

  const handleComment = () => {
    if (newComment.trim()) {
      toast({
        description: "Comment posted!",
      });
      setNewComment('');
    }
  };

  return (
    <article className="neuro-card scale-hover">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={post.user.avatar} />
            <AvatarFallback>{post.user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{post.user.username}</p>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Image */}
      <div 
        className="relative aspect-square cursor-pointer"
        onDoubleClick={handleDoubleClick}
      >
        <img
          src={post.image}
          alt="Post content"
          className="w-full h-full object-cover"
        />
        
        {/* Double tap heart animation */}
        {showLikeAnimation && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart className="w-20 h-20 text-white fill-current heart-animate" />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`p-0 hover:bg-transparent transition-all duration-200 ${
                post.isLiked ? 'text-red-500 scale-110' : 'text-foreground hover:text-red-400'
              }`}
            >
              <Heart className={`w-6 h-6 transition-all duration-200 ${post.isLiked ? 'fill-current' : ''}`} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="p-0 hover:bg-transparent"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            
            <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
              <Send className="w-6 h-6" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`p-0 hover:bg-transparent transition-all duration-200 ${
              isBookmarked ? 'text-primary scale-110' : 'text-foreground hover:text-primary'
            }`}
          >
            <Bookmark className={`w-6 h-6 transition-all duration-200 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm mb-2">
          {post.likes.toLocaleString()} likes
        </p>

        {/* Caption */}
        <div className="text-sm mb-2">
          <span className="font-semibold mr-2">{post.user.username}</span>
          <span>{post.caption}</span>
        </div>

        {/* Comments Preview */}
        {post.comments > 0 && (
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all {post.comments} comments
          </button>
        )}

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-3 slide-up">
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-semibold mr-2">sarah_creates</span>
                    <span>Amazing shot! 📸</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                    <span>2h</span>
                    <button className="hover:text-foreground">Reply</button>
                    <button className="hover:text-foreground">Like</button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-semibold mr-2">david_lens</span>
                    <span>This is incredible! What camera did you use?</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                    <span>1h</span>
                    <button className="hover:text-foreground">Reply</button>
                    <button className="hover:text-foreground">Like</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comment Input */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-3">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleComment()}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleComment}
              className="text-primary hover:text-primary/80 disabled:opacity-50"
              disabled={!newComment.trim()}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};