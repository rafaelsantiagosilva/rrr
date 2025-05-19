import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { FormEvent, useState } from 'react';

export function RegisterForm({
	onSubmit,
}: {
	onSubmit: (showLoginForm: boolean) => void;
}) {
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		const data = {
			name,
			username,
			email,
			password,
		};

		console.log(data);

		const response = await fetch('http://localhost:3333/users/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		if (response.ok) {
			onSubmit(true);
		} else {
			const res = await response.json();
			alert('Falha no cadastro! Tente novamente!');

			console.table(res);
			console.log(res.error ?? '');
		}
	}

	return (
		<form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
			<h2 className="text-center text-xl">Registre-se</h2>
			<Input
				type="text"
				placeholder="Nome"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Input
				type="text"
				placeholder="Nome de usuário"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<Input
				type="email"
				placeholder="E-mail"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Input
				type="password"
				placeholder="Senha"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button type="submit">Criar conta</Button>
		</form>
	);
}
