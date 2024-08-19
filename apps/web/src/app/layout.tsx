import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SocketProvider } from "./(wheels)/wheels/[id]/store/socket.store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={(inter.className, "h-screen w-screen")}>
				<SocketProvider>
					<Toaster richColors />
					{children}
				</SocketProvider>
			</body>
		</html>
	);
}
