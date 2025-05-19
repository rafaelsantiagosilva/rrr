import Link from 'next/link';

export function Header() {
	return (
		<header className="z-20 p-4 flex justify-center sm:justify-between items-center w-screen bg-green-700 h-[65px] shadow fixed">
			<Link
				href={'/'}
				className="flex items-center font-bold text-3xl gap-1 text-slate-100 "
			>
				<img src="/white-logo.png" className="w-40" />
			</Link>
		</header>
	);
}
