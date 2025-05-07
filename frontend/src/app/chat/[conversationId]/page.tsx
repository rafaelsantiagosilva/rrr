'use client';

import { HeaderLogged } from '@/components/header/header-logged';
import { API_URL } from '@/http/env';
import { Message } from '@/interfaces/message';
import { useParams, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { IoIosSend } from 'react-icons/io';

export default function MessagePage() {
	const { conversationId } = useParams();
	const [messages, setMessages] = useState<Message[]>([]);
	const [messageContent, setMessageContent] = useState<string>('');

	const router = useRouter();

	if (!localStorage.getItem('user')) {
		router.push('/welcome');
	}

	const user = JSON.parse(localStorage.getItem('user')!);

	async function getMessages() {
		const response = await fetch(
			`${API_URL}/messages/conversation/${conversationId}`
		);

		const data = await response.json();
		console.table(data);
		setMessages(data);
	}

	async function sendMessage(e: FormEvent) {
		e.preventDefault();

		const body = JSON.stringify({
			content: messageContent,
			userSenderId: user.id,
			conversationId,
		});

		const response = await fetch(API_URL + '/messages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body,
		});

		if (!response.ok) {
			alert('Erro ao enviar mensagem');
			console.log(response);
		}

		await getMessages();
	}

	useEffect(() => {
		getMessages();
	}, []);

	return (
		<>
			<HeaderLogged />

			<main className="bg-sky-50 mx-0 p-6 pt-[65px] flex flex-col justify-between gap-4 items-center">
				<div className="rounded-sm max-h-4/6 bg-sky-50 w-full sm:w-8/12 p-4 mb-12 flex flex-col items-center justify-center gap-2 overflow-x-hidden snap-end">
					{messages.map((message) => (
						<section
							className={`p-6 relative w-full my-2 mx-12 rounded-lg ${
								message.userSenderId === user.id
									? 'relative bg-sky-600 text-zinc-50 text-right'
									: 'relative border border-sky-600 text-sky-600'
							}`}
							key={message.id}
						>
							<p>{message.content}</p>
						</section>
					))}
				</div>

				<form
					onSubmit={async (e) => {
						await sendMessage(e);
					}}
					className="fixed mb-4 bottom-1/7 sm:bottom-0 w-9/12"
				>
					<div className="w-full flex gap-2 items-center">
						<input
							type="text"
							className="bg-slate-100 w-[85%] shadow border border-sky-600 text-lg px-4 py-3 rounded-sm"
							required
							value={messageContent}
							onChange={(e) => setMessageContent(e.target.value)}
						/>
						<button
							className="p-3 rounded-full shadow border-r-4 border-r-sky-800 cursor-pointer text-3xl text-center text-slate-50 bg-sky-700 hover:bg-sky-600 flex items-center justify-center"
							type="submit"
						>
							<IoIosSend />
						</button>
					</div>
				</form>
			</main>
		</>
	);
}
