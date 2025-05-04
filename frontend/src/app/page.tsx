'use client';

import { LoadingSpinner } from '@/components/loading-spinner';
import { useRouter } from 'next/navigation';

export default function Home() {
	const user = localStorage.getItem('user');
	const router = useRouter();

	if (!user) router.push('/welcome');

	router.push('/feed');

	return (
		<div className="h-dvh w-full flex items-center justify-center">
			<LoadingSpinner />
		</div>
	);
}
