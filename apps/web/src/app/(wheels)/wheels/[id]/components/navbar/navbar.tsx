"use client";
import { Button } from "@/components/ui/button";
import useSocket from "@/hooks/useSocket";
import { Link, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { ShareWheelLink } from "./share-wheel";

export default function Navbar() {
	const { socketClient } = useSocket();
	const router = useRouter();
	const redirectHome = () => router.replace("/");
	return (
		<div className="flex p-4 gap-3 items-center justify-between w-screen">
			<Button
				variant="outline"
				onClick={() => {
					socketClient?.disconnect();
					redirectHome();
				}}
			>
				Home
			</Button>
			{socketClient && (
				<div className="flex items-center">
					<ShareWheelLink>
						<Button variant="outline">
							<Link className="h-6 w-6" />
						</Button>
					</ShareWheelLink>
					<Button onClick={() => socketClient?.disconnect()}>
						<LogOut className="h-4 w-4" />
					</Button>
				</div>
			)}
		</div>
	);
}
