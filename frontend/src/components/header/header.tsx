import Link from 'next/link';
import { RiRecycleFill } from 'react-icons/ri';

export function Header() {
	return (
		<header className="p-4 flex justify-center sm:justify-between items-center w-screen bg-sky-700 h-[65px] shadow fixed">
			<Link
				href={'/'}
				className="flex items-center font-bold text-3xl gap-1 text-slate-100 "
			>
				RRR
				<RiRecycleFill />
			</Link>
		</header>
	);
}
