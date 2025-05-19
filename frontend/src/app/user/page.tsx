'use client';

import { HeaderLogged } from '@/components/header/header-logged';
import { User as IUser } from '@/interfaces/user';
import { useRouter } from 'next/navigation';

import { API_URL } from '@/http/env';
import { IoMdExit } from 'react-icons/io';
import { LuUpload } from 'react-icons/lu';
import { updateProfileImg } from '@/http/user';

export default function User() {
	const router = useRouter();

	if (!localStorage.getItem('user')) {
		router.push('/welcome');
	}

	const user: IUser = JSON.parse(localStorage.getItem('user')!);

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

	return (
		<>
			<HeaderLogged />

			<main className="mx-0 p-6 pt-[65px] flex flex-col justify-between gap-4 items-center">
				<section className="pt-6 flex flex-col items-center gap-2">
					<div className="flex flex-col justify-end items-center gap-2">
						<img
							src={`${API_URL}/users/profile/${user.id}`}
							onError={(e) => {
								e.currentTarget.src = '/default-avatar.png';
							}}
							className="size-16 rounded-full shadow"
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

					<div>
						<h1 className="text-2xl font-semibold">{user.name}</h1>
						<h2 className="text-xl">@{user.username}</h2>
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
