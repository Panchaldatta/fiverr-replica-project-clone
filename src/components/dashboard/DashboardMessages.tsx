
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { X } from 'lucide-react';
import { Conversation, MessageChatProps } from '@/types/dashboard';

const DashboardMessages = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  
  // Mock data
  const conversations: Conversation[] = [
    {
      id: '1',
      username: 'John Smith',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Hi, I have a question about your gig...',
      timestamp: '2 hours ago',
      unread: true
    },
    {
      id: '2',
      username: 'Emma Watson',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Thanks for the quick response!',
      timestamp: '1 day ago',
      unread: false
    },
    {
      id: '3',
      username: 'Michael Brown',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Looking forward to working with you!',
      timestamp: '2 days ago',
      unread: false
    }
  ];

  // Mock message chat component
  const MessageChat = ({ isOpen, onClose }: MessageChatProps) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 bg-white">
        <div className="flex flex-col h-full">
          {/* Chat header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <img 
                src="https://via.placeholder.com/40" 
                alt="User avatar" 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h3 className="font-medium">John Smith</h3>
                <p className="text-xs text-fiverr-gray">Active now</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1">
              <X size={20} />
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-end">
                <img 
                  src="https://via.placeholder.com/40" 
                  alt="User avatar" 
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="bg-gray-100 rounded-lg p-3 max-w-[75%]">
                  <p>Hi, I have a question about your gig...</p>
                  <span className="text-xs text-fiverr-gray mt-1">2:30 PM</span>
                </div>
              </div>
              
              <div className="flex items-end justify-end">
                <div className="bg-fiverr-green text-white rounded-lg p-3 max-w-[75%]">
                  <p>Sure, I'd be happy to help! What would you like to know?</p>
                  <span className="text-xs text-white/80 mt-1">2:32 PM</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Message input */}
          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded-l-md p-2"
              />
              <button className="bg-fiverr-green text-white px-4 py-2 rounded-r-md">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {conversations.map(conversation => (
              <div 
                key={conversation.id}
                onClick={() => setActiveChat(conversation.id)}
                className="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <div className="relative">
                  <img 
                    src={conversation.avatar} 
                    alt={conversation.username} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  {conversation.unread && (
                    <span className="absolute top-0 right-2 w-3 h-3 bg-fiverr-green rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium truncate">{conversation.username}</h4>
                    <span className="text-xs text-fiverr-gray">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-fiverr-gray truncate">{conversation.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {activeChat && (
        <MessageChat 
          isOpen={!!activeChat}
          onClose={() => setActiveChat(null)}
        />
      )}
    </>
  );
};

export default DashboardMessages;
