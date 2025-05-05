export async function getConversationBetweenTwoUsers(user1Id: string, user2Id: string) {
  const response = await fetch(
    `http://localhost:3333/conversations/by-users/${user1Id}/${user2Id}`
  );

  const data = await response.json();
  return data;
}

export async function createConversationBetweenTwoUsers(
  user1Id: string,
  user2Id: string
) {
  const response = await fetch('http://localhost:3333/conversations', {
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