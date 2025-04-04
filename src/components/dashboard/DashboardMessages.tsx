
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { X, Send } from 'lucide-react';
import { Conversation, MessageChatProps } from '@/types/dashboard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const DashboardMessages = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();
  
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

  const [chatMessages, setChatMessages] = useState<{[key: string]: Array<{sender: string, text: string, time: string}>}>({
    '1': [
      { sender: 'other', text: 'Hi, I have a question about your gig...', time: '2:30 PM' },
      { sender: 'self', text: 'Sure, I\'d be happy to help! What would you like to know?', time: '2:32 PM' },
    ],
    '2': [
      { sender: 'other', text: 'Thanks for the quick response!', time: '1:45 PM' },
    ],
    '3': [
      { sender: 'other', text: 'Looking forward to working with you!', time: '3:15 PM' },
    ]
  });

  const handleSendMessage = (chatId: string) => {
    if (!newMessage.trim()) return;
    
    // Add new message to chat
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    setChatMessages(prev => ({
      ...prev,
      [chatId]: [
        ...prev[chatId], 
        { 
          sender: 'self', 
          text: newMessage, 
          time: currentTime 
        }
      ]
    }));
    
    // Reset input
    setNewMessage('');
    
    // Show toast notification
    toast({
      title: "Message sent",
      description: `Message sent to ${conversations.find(c => c.id === chatId)?.username}`,
    });
  };

  // Message chat component
  const MessageChat = ({ isOpen, onClose, chatId }: MessageChatProps & { chatId: string }) => {
    if (!isOpen) return null;
    
    const conversation = conversations.find(c => c.id === chatId);
    
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <div className="flex flex-col h-full">
          {/* Chat header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <img 
                src={conversation?.avatar} 
                alt="User avatar" 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h3 className="font-medium">{conversation?.username}</h3>
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
              {chatMessages[chatId]?.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex items-end ${message.sender === 'self' ? 'justify-end' : ''}`}
                >
                  {message.sender === 'other' && (
                    <img 
                      src={conversation?.avatar}
                      alt="User avatar" 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <div className={`rounded-lg p-3 max-w-[75%] ${
                    message.sender === 'self' 
                      ? 'bg-fiverr-green text-white' 
                      : 'bg-gray-100'
                  }`}>
                    <p>{message.text}</p>
                    <span className={`text-xs mt-1 ${
                      message.sender === 'self' ? 'text-white/80' : 'text-fiverr-gray'
                    }`}>{message.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Message input */}
          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-l-md p-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(chatId);
                  }
                }}
              />
              <Button 
                onClick={() => handleSendMessage(chatId)}
                className="bg-fiverr-green text-white px-4 py-2 rounded-r-md hover:bg-fiverr-dark-green"
              >
                <Send className="h-5 w-5" />
              </Button>
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
            {conversations.length > 0 ? (
              conversations.map(conversation => (
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
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-fiverr-gray">No messages yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {activeChat && (
        <MessageChat 
          isOpen={!!activeChat}
          onClose={() => setActiveChat(null)}
          chatId={activeChat}
        />
      )}
    </>
  );
};

export default DashboardMessages;
