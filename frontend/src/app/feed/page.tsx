'use client';

import { HeaderLogged } from '@/components/header/header-logged';
import { Product } from '@/interfaces/product';
import { User } from '@/interfaces/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Post } from './components/post';

import { getProducts } from '@/http/products';

export default function Feed() {
	const [products, setProducts] = useState<Product[]>([]);
	const router = useRouter();

	if (!localStorage.getItem('user')) {
		router.push('/welcome');
	}

	const user: User = JSON.parse(localStorage.getItem('user')!);

	async function loadProducts() {
		const data = await getProducts();
		setProducts(data);
	}

	useEffect(() => {
		loadProducts();
	}, []);

	return (
		<>
			<HeaderLogged />

			<main className="p-6 flex flex-col justify-between gap-4 items-center">
				<h1>Olá {user.name}!</h1>
				{products.map((product) => {
					const formattedDate = new Intl.DateTimeFormat('pt-BR').format(
						new Date(product.createdAt)
					);

					return (
						<Post
							key={product.id}
							product={product}
							formattedDate={formattedDate}
							userId={user.id}
						/>
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
