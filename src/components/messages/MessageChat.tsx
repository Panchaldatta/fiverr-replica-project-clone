
import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Message } from './MessageList';

export interface MessageChatProps {
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
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  if (!conversationId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <div className="text-6xl mb-4">💬</div>
        <h3 className="text-xl font-medium text-fiverr-black mb-2">Your Messages</h3>
        <p className="text-fiverr-gray max-w-md">
          Select a conversation from the sidebar to view your messages.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="p-4 border-b border-fiverr-border-gray">
        <div className="flex items-center">
          {participant.avatar && (
            <img 
              src={participant.avatar}
              alt={participant.name}
              className="w-10 h-10 rounded-full mr-3"
            />
          )}
          <div>
            <div className="font-medium">{participant.name}</div>
            <div className="text-xs text-fiverr-gray">
              Usually responds within a few hours
            </div>
          </div>
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isCurrentUser = msg.senderId === currentUserId;
          return (
            <div 
              key={msg.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex max-w-[70%]">
                {!isCurrentUser && msg.senderAvatar && (
                  <img 
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-8 h-8 rounded-full mr-2 mt-1"
                  />
                )}
                <div>
                  <div 
                    className={`p-3 rounded-lg ${
                      isCurrentUser 
                        ? 'bg-fiverr-green text-white rounded-br-none' 
                        : 'bg-gray-100 text-fiverr-black rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                  <div className={`text-xs mt-1 text-fiverr-gray ${isCurrentUser ? 'text-right' : ''}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="border-t border-fiverr-border-gray p-4">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-fiverr-border-gray rounded-l-md p-2 focus:outline-none focus:border-fiverr-green"
          />
          <button
            type="submit"
            className="bg-fiverr-green text-white p-2 rounded-r-md hover:bg-fiverr-dark-green transition-colors"
            disabled={!message.trim()}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageChat;
