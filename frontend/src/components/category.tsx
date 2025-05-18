export function Category({ categoryName }: { categoryName: string }) {
	return (
		<div className="bg-sky-700 hover:bg-sky-600 py-[3px] px-[5px] rounded-lg font-bold text-slate-50 text-lg">
			{categoryName}
		</div>
	);
}
