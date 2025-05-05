import { Category } from '@/components/category';
import {
	createConversationBetweenTwoUsers,
	getConversationBetweenTwoUsers,
} from '@/http/conversations';
import { deleteProduct } from '@/http/products';
import { Product } from '@/interfaces/product';
import router from 'next/router';
import { BiLike } from 'react-icons/bi';
import { FaRegTrashAlt } from 'react-icons/fa';

interface PostProps {
	product: Omit<Product, 'createdAt'>;
	userId: string;
	formattedDate: string;
}

export function Post({ product, userId, formattedDate }: PostProps) {
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

	return (
		<section className="w-full md:w-[70%] shadow-lg border p-2 rounded bg-slate-100">
			<header className="w-full border-b flex items-center justify-between">
				<h2 className="text-lg font-bold">{product.name}</h2>
				<small>{formattedDate}</small>
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
