
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface MessageListProps {
  conversations: Conversation[];
  onSelectConversation: (conversationId: string) => void;
  activeConversationId?: string;
}

const MessageList = ({ conversations, onSelectConversation, activeConversationId }: MessageListProps) => {
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 h-full">
        <div className="text-5xl mb-3">💬</div>
        <h3 className="text-xl font-medium text-fiverr-black">No messages yet</h3>
        <p className="text-fiverr-gray mt-1 text-center">
          When you contact a seller or receive messages, they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-fiverr-border-gray">
      {conversations.map((conversation) => (
        <button
          key={conversation.id}
          onClick={() => onSelectConversation(conversation.id)}
          className={`w-full flex items-start p-4 hover:bg-gray-50 text-left ${
            activeConversationId === conversation.id ? 'bg-gray-50' : ''
          }`}
        >
          <Avatar className="h-10 w-10 mr-3 flex-shrink-0">
            <AvatarImage src={conversation.participantAvatar} />
            <AvatarFallback>
              {conversation.participantName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-fiverr-black truncate">
                {conversation.participantName}
              </h4>
              <span className="text-xs text-fiverr-gray">
                {conversation.timestamp}
              </span>
            </div>
            <p className={`text-sm truncate mt-1 ${conversation.unread > 0 ? 'font-medium text-fiverr-black' : 'text-fiverr-gray'}`}>
              {conversation.lastMessage}
            </p>
          </div>
          {conversation.unread > 0 && (
            <span className="ml-2 bg-fiverr-green text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1">
              {conversation.unread}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default MessageList;
