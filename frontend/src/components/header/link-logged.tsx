import Link from 'next/link';
import { IconType } from 'react-icons';

interface LinkLoggedProps {
	href: string;
	icon: IconType;
}

export function LinkLogged({ href, icon: Icon }: LinkLoggedProps) {
	return (
		<Link
			href={href}
			className="cursor-pointer hover:bg-green-600 py-2 px-4 rounded-sm"
		>
			<Icon className="text-5xl text-center text-slate-100" />
		</Link>
	);
}
