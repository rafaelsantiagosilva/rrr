export interface Message {
  id: string;
  content: string;
  userSenderId: string;
  conversationId: string;
  createdAt?: string;
}