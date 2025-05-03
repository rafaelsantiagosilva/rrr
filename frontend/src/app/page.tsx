'use client';

import { Header } from '@/components/header';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const res = await fetch('http://localhost:3333/users/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});
		if (res.ok) {
			localStorage.setItem('user', JSON.stringify(await res.json()));
			router.push('/feed');
		} else {
			alert('Login falhou! Verifique as informações e tente novamente.');
		}
	}

	return (
		<>
			<Header />

			<main className="w-full h-full mt-6 flex flex-col items-center justify-around">
				<h1 className="text-xl">Faça seu login!</h1>

				<form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
					<input
						type="email"
						className="px-4 py-2 border text-xl rounded focus:border-none"
						placeholder="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						className="px-4 py-2 border text-xl rounded focus:border-none"
						placeholder="senha"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						type="submit"
						className="px-4 py-2 border rounded cursor-pointer bg-green-700 text-slate-50 hover:bg-green-600"
					>
						Logar
					</button>

					<Link
						className="text-center text-blue-700 hover:text-blue-600 hover:underline"
						href={'/register'}
					>
						Não possui uma conta? Cadastrar
					</Link>
				</form>
			</main>
		</>
	);
}
