import Navbar from "./components/navbar/navbar";

interface LayoutProps {
	children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<Navbar />
			{children}
		</div>
	);
}
