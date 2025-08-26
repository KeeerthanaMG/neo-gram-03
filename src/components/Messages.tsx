import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MoreHorizontal, Send, MessageCircle } from 'lucide-react';

const mockConversations = [
  {
    id: 1,
    user: {
      username: 'alex_wanderer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      online: true
    },
    lastMessage: 'That photo is incredible! Where did you take it?',
    timestamp: '2m ago',
    unread: 2,
    messages: [
      { id: 1, text: 'Hey! How are you?', sender: 'alex_wanderer', timestamp: '10:30 AM' },
      { id: 2, text: 'I\'m doing great! Just posted a new photo.', sender: 'me', timestamp: '10:32 AM' },
      { id: 3, text: 'That photo is incredible! Where did you take it?', sender: 'alex_wanderer', timestamp: '10:33 AM' }
    ]
  },
  {
    id: 2,
    user: {
      username: 'sarah_creates',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face',
      online: false
    },
    lastMessage: 'Thanks for the follow! Love your content ✨',
    timestamp: '1h ago',
    unread: 0,
    messages: [
      { id: 1, text: 'Hi! Thanks for following me!', sender: 'sarah_creates', timestamp: '9:15 AM' },
      { id: 2, text: 'No problem! Your content is amazing.', sender: 'me', timestamp: '9:20 AM' },
      { id: 3, text: 'Thanks for the follow! Love your content ✨', sender: 'sarah_creates', timestamp: '9:22 AM' }
    ]
  },
  {
    id: 3,
    user: {
      username: 'david_lens',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      online: true
    },
    lastMessage: 'Would love to collaborate on a project',
    timestamp: '3h ago',
    unread: 1,
    messages: [
      { id: 1, text: 'Your photography style is amazing!', sender: 'david_lens', timestamp: '7:45 AM' },
      { id: 2, text: 'Thank you so much!', sender: 'me', timestamp: '8:00 AM' },
      { id: 3, text: 'Would love to collaborate on a project', sender: 'david_lens', timestamp: '8:15 AM' }
    ]
  }
];

export const Messages: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage('');
    }
  };

  const selectedChat = selectedConversation 
    ? mockConversations.find(conv => conv.id === selectedConversation)
    : null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
        {/* Conversations List */}
        <div className="glass-card p-4 md:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Messages</h1>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search messages..." 
              className="pl-10"
            />
          </div>
          
          <div className="space-y-2 overflow-y-auto custom-scrollbar">
            {mockConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-secondary/50 ${
                  selectedConversation === conversation.id ? 'bg-primary/10 border border-primary/20' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={conversation.user.avatar} />
                    <AvatarFallback>{conversation.user.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {conversation.user.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm truncate">{conversation.user.username}</p>
                    <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>
                
                {conversation.unread > 0 && (
                  <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    {conversation.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="glass-card md:col-span-2 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedChat.user.avatar} />
                  <AvatarFallback>{selectedChat.user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedChat.user.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedChat.user.online ? 'Active now' : 'Last seen recently'}
                  </p>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-3">
                {selectedChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        message.sender === 'me'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    size="sm" 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your Messages</h3>
                <p className="text-muted-foreground">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};