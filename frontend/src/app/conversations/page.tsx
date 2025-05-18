'use client';

import { HeaderLogged } from '@/components/header/header-logged';
import { getConversationsByUserId } from '@/http/conversations';
import { Conversation as IConversation } from '@/interfaces/conversation';
import { User } from '@/interfaces/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Conversation } from './components/conversation';

export default function Conversations() {
	const [conversations, setConversations] = useState<IConversation[]>([]);
	const router = useRouter();

	if (!localStorage.getItem('user')) {
		router.push('/welcome');
	}

	const user: User = JSON.parse(localStorage.getItem('user')!);

	async function loadConversations() {
		const data = await getConversationsByUserId(user.id);
		setConversations(data);
	}

	useEffect(() => {
		loadConversations();
	}, []);

	return (
		<>
			<HeaderLogged />

			<main className="mx-0 p-6 pt-[65px] flex flex-col justify-between gap-4 items-center">
				{conversations.map((conversation) => {
					return (
						<Conversation
							key={conversation.id}
							userId={user.id}
							conversation={conversation}
						/>
					);
				})}
			</main>
		</>
	);
}
