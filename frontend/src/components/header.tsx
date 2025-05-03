import Link from 'next/link';

export function Header() {
	return (
		<header className="p-4 flex justify-between items-center w-screen bg-blue-700 h-[60px] shadow">
			<Link href={'/'} className="font-bold text-3xl text-slate-100 ">
				RRR
			</Link>
		</header>
	);
}
