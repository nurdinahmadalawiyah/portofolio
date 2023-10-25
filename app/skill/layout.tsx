export default function SkillLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mb-20" id="skill">
			<div className="flex flex-col md:flex-col items-center justify-center gap-10">
				{children}
			</div>
		</section>
	);
}
