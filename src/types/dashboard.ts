
export interface Conversation {
  id: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

export interface Review {
  id: string;
  username: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  gigTitle?: string;
}

export interface MessageChatProps {
  isOpen: boolean;
  onClose: () => void;
}
