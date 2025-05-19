'use client';

import { HeaderLogged } from '@/components/header/header-logged';
import { Product } from '@/interfaces/product';
import { User } from '@/interfaces/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Post } from './components/post';
import { FaPlus } from 'react-icons/fa';

import { getProducts } from '@/http/products';
import Link from 'next/link';

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

			<main className="mx-0 p-6 pt-[65px] flex flex-col justify-between gap-4 items-center">
				{products.map((product) => {
					return (
						<Post
							key={product.id}
							product={product}
							userId={user.id}
							router={router}
						/>
					);
				})}
			</main>

			<div className="group">
				<Link
					href="/create-post"
					className="fixed bottom-[120px] right-5 flex items-center gap-2 border border-r-4 border-b-4 border-green-800 px-4 py-3 font-bold text-slate-50 text-xl cursor-pointer rounded-full shadow bg-green-700 hover:bg-green-600 transition-all duration-300 w-16 hover:w-60 overflow-hidden"
				>
					<span>
						<FaPlus className="text-2xl text-center" />
					</span>
					<span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						Adicionar um Post
					</span>
				</Link>
			</div>
		</>
	);
}
