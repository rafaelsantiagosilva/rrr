'use client';

import { Category } from '@/components/category';
import { Header } from '@/components/header';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { BiLike } from 'react-icons/bi';
import { FaRegTrashAlt } from 'react-icons/fa';

export default function Feed() {
	interface Product {
		id: string;
		name: string;
		description: string;
		category: string;
		userId: string;
		createdAt: string;
	}

	interface User {
		id: string;
		name: string;
		username: string;
		email: string;
		whatsappNumber: string | null;
		cnpj: string | null;
		password: string;
		type: string;
		createdAt: string;
	}

	const [products, setProducts] = useState<Product[]>([]);
	const router = useRouter();

	if (!localStorage.getItem('user')) {
		router.push('/login');
	}

	const user: User = JSON.parse(localStorage.getItem('user')!);

	async function getProducts() {
		const response = await fetch('http://localhost:3333/products');
		const data = await response.json();
		setProducts(data);
	}

	async function deleteProduct(id: string) {
		console.log(`> id: ${id}`);
		const response = await fetch(`http://localhost:3333/products/${id}`, {
			method: 'DELETE',
		});

		if (!response.ok) {
			alert('Erro ao excluir produto');
			console.table(await response.json());
			return;
		}

		await getProducts();
	}

	async function createConversationBetweenTwoUsers(
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

	async function goToConversation(user1Id: string, user2Id: string) {
		const response = await fetch(
			`http://localhost:3333/conversations/by-users/${user1Id}/${user2Id}`
		);

		const data = await response.json();

		if (!data) {
			const newConversationId = await createConversationBetweenTwoUsers(
				user1Id,
				user2Id
			);

			if (!newConversationId) return;

			router.push(`/messages/${newConversationId.id}`);
			return;
		}

		router.push(`/messages/${data.id}`);
	}

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<>
			<Header />

			<main className="p-6 flex flex-col justify-between gap-4 items-center">
				<h1>Olá {user.name}!</h1>
				{products.map((product) => {
					const formattedDate = new Intl.DateTimeFormat('pt-BR').format(
						new Date(product.createdAt)
					);

					return (
						<section
							key={product.id}
							className="w-full md:w-[70%] shadow-lg border p-2 rounded bg-slate-100"
						>
							<header className="w-full border-b flex items-center justify-between">
								<h2 className="text-lg font-bold">{product.name}</h2>
								<small>{formattedDate}</small>
							</header>
							<nav className="flex gap-1 my-2">
								<Category categoryName={product.category} />
							</nav>
							<p className="w-full">{product.description}</p>
							<footer>
								{user.id == product.userId ? (
									<button
										onClick={async () => {
											await deleteProduct(product.id);
										}}
										className="flex items-center gap-1 text-red-700 hover:text-red-600 cursor-pointer text-lg"
									>
										<FaRegTrashAlt /> Deletar
									</button>
								) : (
									<button
										onClick={async () => {
											await goToConversation(user.id, product.userId);
										}}
										className="flex items-center gap-1 text-green-700 hover:text-green-600 cursor-pointer text-lg"
									>
										<BiLike /> Me interessei!
									</button>
								)}
							</footer>
						</section>
					);
				})}
			</main>
			<button
				onClick={() => {
					router.push('/create-post');
				}}
				className="fixed bottom-0 right-0 mb-12 mr-12 w-16 h-16 p-2 font-bold text-slate-50 text-4xl cursor-pointer rounded-full shadow bg-blue-700 hover:bg-blue-600"
			>
				+
			</button>
		</>
	);
}
