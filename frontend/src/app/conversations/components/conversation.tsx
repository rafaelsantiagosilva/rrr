'use client';

import { LoadingSpinner } from '@/components/loading-spinner';
import { getOtherUserData } from '@/http/conversations';
import { API_URL } from '@/http/env';
import { Conversation as IConversation } from '@/interfaces/conversation';
import { User } from '@/interfaces/user';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Conversation({
	userId,
	conversation,
}: {
	userId: string;
	conversation: IConversation;
}) {
	const [otherUser, setOtherUser] = useState<User | null>(null);

	async function loadOtherUser() {
		const data = await getOtherUserData(userId, conversation);
		setOtherUser(data);
	}

	useEffect(() => {
		loadOtherUser();
	}, []);

	return otherUser ? (
		<Link
			href={`/chat/${conversation.id}`}
			className="border rounded-sm px-4 py-2 mt-4 w-8/12 shadow hover:scale-105 transition-all cursor-pointer"
		>
			<header className="flex gap-2 items-center">
				<img
					src={`${API_URL}/users/profile/${otherUser.id}`}
					onError={(e) => {
						e.currentTarget.src = '/default-avatar.png';
					}}
					className="size-12 rounded-full"
				/>
				<h1 className="text-2xl font-bold">{otherUser.name}</h1>
			</header>
		</Link>
	) : (
		<LoadingSpinner />
	);
}
