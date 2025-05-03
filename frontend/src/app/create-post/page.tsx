'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header/header';

export default function CreatePostPage() {
	const user = localStorage.getItem('user');
	const router = useRouter();

	if (!user) {
		router.push('/welcome');
	}

	const userData = JSON.parse(user ?? '');

	const [form, setForm] = useState({
		name: '',
		description: '',
		category: '',
		userId: userData?.id,
	});

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		await fetch('http://localhost:3333/products', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form),
		});

		router.push('/feed');
	}

	return (
		<>
			<Header />
			<form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
				<input
					className="w-full p-2 border rounded"
					placeholder="Nome do produto"
					onChange={(e) => setForm({ ...form, name: e.target.value })}
				/>
				<textarea
					className="w-full p-2 border rounded"
					placeholder="Descrição"
					onChange={(e) => setForm({ ...form, description: e.target.value })}
				/>
				<input
					className="w-full p-2 border rounded"
					placeholder="Categoria"
					onChange={(e) => setForm({ ...form, category: e.target.value })}
				/>
				<button
					type="submit"
					className="px-4 py-2 border rounded cursor-pointer bg-green-700 text-slate-50 hover:bg-green-600"
				>
					Criar produto
				</button>
			</form>
		</>
	);
}
