
import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Message } from './MessageList';

interface MessageChatProps {
  conversationId: string;
  messages: Message[];
  participant: {
    id: string;
    name: string;
    avatar?: string;
  };
  currentUserId: string;
  onSendMessage: (content: string) => void;
}

const MessageChat = ({ 
  conversationId, 
  messages, 
  participant,
  currentUserId,
  onSendMessage 
}: MessageChatProps) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!conversationId) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="text-6xl mb-4">💬</div>
        <h3 className="text-xl font-medium text-fiverr-black">Select a conversation</h3>
        <p className="text-fiverr-gray mt-2 text-center">
          Choose a conversation from the list to start chatting
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center p-4 border-b border-fiverr-border-gray">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={participant.avatar} />
          <AvatarFallback>
            {participant.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-fiverr-black">{participant.name}</h3>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-fiverr-gray text-center">
              No messages yet. Send a message to start the conversation.
            </p>
          </div>
        ) : (
          messages.map((message) => {
            const isCurrentUser = message.senderId === currentUserId;
            
            return (
              <div 
                key={message.id} 
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start max-w-[70%]">
                  {!isCurrentUser && (
                    <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                      <AvatarImage src={message.senderAvatar} />
                      <AvatarFallback>
                        {message.senderName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div 
                      className={`rounded-lg p-3 ${
                        isCurrentUser 
                          ? 'bg-fiverr-green text-white' 
                          : 'bg-gray-100 text-fiverr-black'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <div className="text-xs text-fiverr-gray mt-1">
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="border-t border-fiverr-border-gray p-4">
        <div className="flex items-end">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message..."
            className="flex-1 mr-2 min-h-[60px] resize-none"
            rows={2}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!newMessage.trim()}
            className="fiverr-button h-[60px] px-6"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageChat;
