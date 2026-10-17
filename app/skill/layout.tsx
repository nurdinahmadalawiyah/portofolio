export default function SkillLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex w-full flex-col items-center justify-center gap-4 py-8 md:py-10 mb-20">
			<div className="flex w-full flex-col items-center justify-center gap-10">
				{children}
			</div>
		</section>
	);
}
