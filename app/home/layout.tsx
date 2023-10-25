export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mb-20" id="home">
			<div className="flex flex-col md:flex-row justify-center items-center gap-20">
				{children}
			</div>
		</section>
	);
}
