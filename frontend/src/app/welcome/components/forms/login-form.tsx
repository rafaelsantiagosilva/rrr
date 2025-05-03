import { Button } from '@/components/button';
import { Input } from '@/components/input';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LoginForm() {
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
		<form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
			<h2 className="text-center text-xl">Login</h2>
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
			<Button type="submit">Entrar</Button>
		</form>
	);
}
