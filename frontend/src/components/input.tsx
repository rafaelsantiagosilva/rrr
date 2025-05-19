export function Input({
	type,
	placeholder,
	value,
	onChange,
}: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className="px-4 py-2 border-1 border-b-2 border-r-2 border-green-600 text-xl rounded focus:outline w-full"
		/>
	);
}
