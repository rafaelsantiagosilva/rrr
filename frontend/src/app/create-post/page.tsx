'use client';

import { Button } from '@/components/button';
import { HeaderLogged } from '@/components/header/header-logged';
import { Input } from '@/components/input';
import { API_URL } from '@/http/env';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreatePost() {
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

		await fetch(API_URL + '/products', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form),
		});

		router.push('/feed');
	}

	return (
		<>
			<HeaderLogged />

			<main className="mx-0 p-6 pt-[65px] flex justify-center gap-4 items-center w-full">
				<form
					onSubmit={handleSubmit}
					className="pt-4 w-8/12 flex flex-col justify-center items-center gap-4"
				>
					<h2 className="text-center font-bold text-xl">Criar postagem</h2>
					<Input
						placeholder="Nome do produto"
						onChange={(e) => setForm({ ...form, name: e.target.value })}
					/>
					<textarea
						className="px-4 py-2 border-1 border-b-2 border-r-2 border-green-600 text-xl rounded focus:outline w-full"
						placeholder="Descrição"
						onChange={(e) => setForm({ ...form, description: e.target.value })}
					/>
					<Input
						placeholder="Categoria"
						onChange={(e) => setForm({ ...form, category: e.target.value })}
					/>
					<Button type="submit">Criar produto</Button>
				</form>
			</main>
		</>
	);
}
