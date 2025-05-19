'use client';

import Image from 'next/image';
import { useState } from 'react';
import { RiRecycleFill } from 'react-icons/ri';
import { LoginForm } from './components/forms/login-form';
import { RegisterForm } from './components/forms/register-form';

export default function Login() {
	const [isLoginForm, setIsLoginForm] = useState(true);

	const textsLink: Record<number, string> = {
		0: 'Já possui uma conta? Login',
		1: 'Não possui uma conta? Registre-se',
	};

	return (
		<div className="p-10 flex flex-col md:flex-row md:justify-between justify-center items-center h-full w-full">
			<section className="w-1/2 flex flex-col items-center gap-4">
				<img src={'/green-logo.png'} className="w-72 mt-6" />
				<h1 className="text-xl text-center">
					Bem vindo! Aqui você pode descartar seus <br /> bens com pessoas que os
					querem!
				</h1>
				<Image
					className="rounded shadow hidden md:block"
					src={'/landing-page-woman.jpg'}
					width={325}
					height={325}
					alt="Uma mulher com jaqueta azul e cabelo castanho, sorrindo em direção a câmera, com árvores atrás dela"
				/>
			</section>

			<div className="md:w-1/2 p-2 mt-4 flex flex-col items-center justify-center">
				{isLoginForm ? <LoginForm /> : <RegisterForm />}
				<span
					onClick={() => {
						setIsLoginForm(!isLoginForm);
					}}
					className="mt-2 text-lg text-center text-green-600 underline  hover:text-green-700 cursor-pointer"
				>
					{textsLink[isLoginForm ? 1 : 0]}
				</span>
			</div>
		</div>
	);
}
