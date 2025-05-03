export function Button({
	type,
	onClick,
	children,
}: React.ComponentProps<'button'>) {
	return (
		<button
			type={type}
			onClick={onClick}
			className="px-4 py-2 border-1 border-b-6 border-r-6 border-sky-800 bg-sky-700 text-xl text-slate-100 rounded focus:outline-none hover:bg-sky-600 active:bg-sky-700 cursor-pointer"
		>
			{children}
		</button>
	);
}
