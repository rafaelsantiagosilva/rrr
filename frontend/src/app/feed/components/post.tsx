import { Category } from '@/components/category';
import {
	createConversationBetweenTwoUsers,
	getConversationBetweenTwoUsers,
} from '@/http/conversations';
import { deleteProduct } from '@/http/products';
import { getUser } from '@/http/user';
import { Product } from '@/interfaces/product';
import { User } from '@/interfaces/user';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useState } from 'react';
import { BiLike } from 'react-icons/bi';
import { FaRegTrashAlt } from 'react-icons/fa';

interface PostProps {
	product: Product;
	userId: string;
	router: AppRouterInstance;
}

export function Post({ product, userId, router }: PostProps) {
	const [owner, setOwner] = useState<User | null>(null);

	async function goToConversation(user1Id: string, user2Id: string) {
		const data = await getConversationBetweenTwoUsers(user1Id, user2Id);
		const baseUrlToConversation = '/chat/';

		if (!data) {
			const newConversationId = await createConversationBetweenTwoUsers(
				user1Id,
				user2Id
			);

			if (!newConversationId) return;

			router.push(`${baseUrlToConversation}${newConversationId.id}`);
			return;
		}

		router.push(`${baseUrlToConversation}${data.id}`);
	}

	async function loadOwner(userId: string) {
		const user = await getUser(userId);
		setOwner(user);
	}

	loadOwner(product.userId);

	const formattedDate = new Intl.DateTimeFormat('pt-BR').format(
		new Date(product.createdAt)
	);

	return (
		<section className="w-96 mt-4 shadow-lg border p-2 rounded bg-slate-100">
			<header className="w-full border-b flex items-center justify-between">
				<div className="flex items-center">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={`http://localhost:3333/users/profile/${product.userId}`}
						alt="Foto de perfil"
						onError={(e) => {
							e.currentTarget.src = '/default-avatar.png'; // caminho da imagem padrão
						}}
						className="size-8 m-1 rounded-full object-cover"
					/>

					<div className="flex gap-1 items-center">
						<p className="text-lg font-semibold">{owner?.name}</p>
						<p className="text-sm text-slate-600">@{owner?.username}</p>
					</div>
				</div>
				<div>{formattedDate}</div>
			</header>
			<nav className="flex gap-1 my-2">
				<Category categoryName={product.category} />
			</nav>
			<p className="w-full">{product.description}</p>
			<footer>
				{userId == product.userId ? (
					<button
						onClick={async () => {
							await deleteProduct(product.id);
						}}
						className="flex items-center gap-1 text-red-700 hover:text-red-600 cursor-pointer text-lg"
					>
						<FaRegTrashAlt /> Deletar
					</button>
				) : (
					<button
						onClick={async () => {
							await goToConversation(userId, product.userId);
						}}
						className="flex items-center gap-1 text-green-700 hover:text-green-600 cursor-pointer text-lg"
					>
						<BiLike /> Me interessei!
					</button>
				)}
			</footer>
		</section>
	);
}
