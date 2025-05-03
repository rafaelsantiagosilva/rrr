'use client';

import { Header } from '@/components/header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Login() {
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [type, setType] = useState('PF');
	const router = useRouter();

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		const data = {
			name,
			username,
			email,
			whatsappNumber: null,
			cnpj: null,
			password,
			type,
		};

		console.log(data);

		const response = await fetch('http://localhost:3333/users/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		if (response.ok) {
			router.push('/login');
		} else {
			const res = await response.json();
			alert('Falha no cadastro! Tente novamente!');

			console.table(res);
			console.log(res.error ?? '');
		}
	}

	return (
		<>
			<Header />

			<main className="w-full h-full mt-6 flex flex-col items-center justify-around">
				<h1 className="text-xl">Faça seu login!</h1>

				<form
					onSubmit={async (event) => {
						await handleSubmit(event);
					}}
					className="mt-4 flex flex-col gap-4"
				>
					<input
						type="text"
						className="px-4 py-2 border text-xl rounded focus:border-none"
						placeholder="nome"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="text"
						className="px-4 py-2 border text-xl rounded focus:border-none"
						placeholder="nome de usuário"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
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
					<select
						className="px-4 py-2 border text-xl rounded focus:border-none"
						name="type"
						id="type"
						value={type}
						onChange={(e) => setType(e.target.value)}
					>
						<option
							className="px-4 py-2 border text-xl rounded focus:border-none"
							value="PF"
						>
							Pessoa Física
						</option>
						<option
							className="px-4 py-2 border text-xl rounded focus:border-none"
							value="PJ"
						>
							Pessoa Jurídica
						</option>
					</select>
					<button
						type="submit"
						className="px-4 py-2 border rounded cursor-pointer bg-green-700 text-slate-50 hover:bg-green-600"
					>
						Cadastrar
					</button>

					<Link
						className="text-center text-blue-700 hover:text-blue-600 hover:underline"
						href={'/'}
					>
						Já possui uma conta? Entrar
					</Link>
				</form>
			</main>
		</>
	);
}
