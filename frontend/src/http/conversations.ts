import { Conversation } from "@/interfaces/conversation";
import { API_URL } from "./env";
import { getUser } from "./user";

export async function getConversationsByUserId(userId: string) {
  const response = await fetch(`${API_URL}/conversations/user/${userId}`);
  const data = await response.json();
  return data;
}

export async function getConversationBetweenTwoUsers(user1Id: string, user2Id: string) {
  const response = await fetch(
    `${API_URL}/conversations/by-users/${user1Id}/${user2Id}`
  );

  const data = await response.json();
  return data;
}

export async function createConversationBetweenTwoUsers(
  user1Id: string,
  user2Id: string
) {
  const response = await fetch(`${API_URL}/conversations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user1Id, user2Id }),
  });

  if (!response.ok) {
    alert('Erro ao iniciar conversa');
    console.table(await response.json());
    return;
  }

  const data = await response.json();
  return data.id;
}

export async function getOtherUserData(userId: string, conversation: Conversation) {
  if (conversation.user1Id == userId)
    return await getUser(conversation.user2Id);

  return await getUser(conversation.user1Id);
}