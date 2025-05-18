import Link from 'next/link';

function DefaultLink({ href, children, onClick }: React.ComponentProps<'a'>) {
	return (
		<Link
			href={href ?? '#'}
			onClick={onClick}
			className="text-lg text-center text-sky-600 underline  hover:text-sky-700"
		>
			{children}
		</Link>
	);
}

export { DefaultLink as Link };
