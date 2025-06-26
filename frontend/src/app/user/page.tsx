'use client';

import { HeaderLogged } from '@/components/header/header-logged';
import { Post as Product } from '@/app/feed/components/post';
import { User as IUser } from '@/interfaces/user';
import { Product as IProduct } from '@/interfaces/product';
import { useRouter } from 'next/navigation';

import { API_URL } from '@/http/env';
import { IoMdExit } from 'react-icons/io';
import { LuUpload } from 'react-icons/lu';
import { updateProfileImg } from '@/http/user';

import { useState, useEffect } from 'react';
import { LoadingSpinner } from '@/components/loading-spinner';

export default function User() {
	const router = useRouter();

	if (!localStorage.getItem('user')) {
		router.push('/welcome');
	}

	const user: IUser = JSON.parse(localStorage.getItem('user')!);
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	async function handleUpdateProfile(file: File) {
		const response = await updateProfileImg(user.id, file);

		if (!response.ok) {
			return alert('Erro ao atualizar imagem');
		}
	}

	function handleExit() {
		localStorage.removeItem('user');
		router.push('/welcome');
	}

	async function loadProducts() {
		setIsLoading(true);
		try {
			const response = await fetch(`${API_URL}/products/user/${user.id}`);
			const data = await response.json();
			setProducts(data);
		} catch (error) {
			alert('Erro ao carregar os produtos');
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		loadProducts();
	}, []);

	return (
		<>
			<HeaderLogged />

			<main className="mx-0 p-6 pt-[65px] flex flex-col justify-between gap-4 items-center">
				<section className="pt-6 flex items-center justify-center gap-2">
					<div className="flex justify-center items-center gap-2">
						<div className="flex flex-col gap-2 items-center justify-center">
							<img
								src={`${API_URL}/users/profile/${user.id}`}
								onError={(e) => {
									e.currentTarget.src = '/default-avatar.png';
								}}
								className="size-32 rounded-full shadow"
							/>
							<label
								htmlFor="file-upload"
								className="flex text-center justify-center items-center w-14 gap-2 text-zinc-50 bg-green-700 p-2 hover:bg-green-600 cursor-pointer shadow rounded"
							>
								<LuUpload />
								<input
									id="file-upload"
									type="file"
									accept=".png, .jpg, .jpeg"
									className="hidden"
									onChange={(e) => {
										const file = e.target.files?.[0];
										if (file) {
											handleUpdateProfile(file);
										}
									}}
								/>
							</label>
						</div>

						<div className="flex flex-col justify-center">
							<h1 className="text-6xl font-semibold">{user.name}</h1>
							<h2 className="text-2xl">@{user.username}</h2>
						</div>
					</div>
				</section>

				<section className="flex flex-col justify-center gap-4 w-full max-w-3xl">
					<h2 className="text-2xl font-bold">Produtos</h2>

					<div className="flex flex-wrap justify-center gap-4 w-full">
						{isLoading ? (
							<LoadingSpinner />
						) : (
							products.map((product) => (
								<Product
									key={product.id}
									product={product}
									userId={user.id}
									router={router}
								/>
							))
						)}
					</div>
				</section>

				<button
					onClick={handleExit}
					className="flex gap-1 items-center text-2xl text-red-600 hover:text-red-700 cursor-pointer"
				>
					<IoMdExit /> Sair
				</button>
			</main>
		</>
	);
}
