export function Button({
	type,
	onClick,
	children,
}: React.ComponentProps<'button'>) {
	return (
		<button
			type={type}
			onClick={onClick}
			className="px-4 py-2 border-1 border-b-6 border-r-6 border-green-800 bg-green-700 text-xl text-slate-100 rounded focus:outline-none hover:bg-green-600 active:bg-green-700 cursor-pointer w-full"
		>
			{children}
		</button>
	);
}
