'use client';

import { Header } from '@/components/header/header';
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
			`http://localhost:3333/messages/conversation/${conversationId}`
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

		const response = await fetch('http://localhost:3333/messages', {
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
		<div>
			<Header />

			<main className="p-6 h-[80dvh] flex flex-col justify-between gap-4 items-center ">
				<div className="w-full p-4 flex flex-col items-center justify-center gap-2 overflow-x-hidden overflow">
					{messages.map((message) => (
						<section
							className={`p-6 relative w-lg my-2 mx-12 rounded-lg ${
								message.userSenderId === user.id
									? 'relative bg-blue-600 text-zinc-50'
									: 'relative border border-blue-600 text-blue-600'
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
					className="fixed mb-4 bottom-0 w-9/12"
				>
					<div className="w-full flex gap-2 items-center">
						<input
							type="text"
							className="bg-slate-100 w-[85%] shadow border border-blue-600 text-lg px-4 py-3 rounded-sm"
							required
							value={messageContent}
							onChange={(e) => setMessageContent(e.target.value)}
						/>
						<button
							className="p-3 rounded-full shadow border-r-4 border-r-blue-800 cursor-pointer text-3xl text-center text-slate-50 bg-blue-700 hover:bg-blue-600 flex items-center justify-center"
							type="submit"
						>
							<IoIosSend />
						</button>
					</div>
				</form>
			</main>
		</div>
	);
}
