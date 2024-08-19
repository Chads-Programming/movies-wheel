"use client";
import { Button } from "@/components/ui/button";
import useSocket from "@/hooks/useSocket";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Navbar() {
	const { socketClient } = useSocket();
	const router = useRouter();
	const redirectHome = () => router.replace("/");
	return (
		<div className="flex p-4 gap-3 items-center justify-end absolute top-0 right-0 w-screen">
			<Button
				onClick={() => {
					socketClient?.disconnect();
					redirectHome();
				}}
			>
				Home
			</Button>
			{socketClient && (
				<Button onClick={() => socketClient?.disconnect()}>
					<LogOut className="h-6 w-6" />
				</Button>
			)}
		</div>
	);
}
