"use client";

import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import ProfileSetup from "./components/profile-setup";
import { Profile } from "@repo/shared";
import { toast } from "sonner";

export default function WheelPage() {
	const { id } = useParams() as { id: string };
	const [socketClient, setSocketClient] = useState<Socket | null>(null);
	const socketError = useRef<boolean | null>(null);

	function connectSocket(profile: Profile) {
		const socket = io(process.env.NEXT_PUBLIC_WS_SERVER!, {
			query: {
				id,
				profile: JSON.stringify(profile),
			},
		});

		socket.on("setup-completed", () => {
			setSocketClient(socket);
			socket.emit("rooms-participants");
		});

		socket.on("rooms-participants", (...roomData: any) =>
			console.log({ roomData }),
		);

		socket.on("connection-error", (msg: string) => {
			socketError.current = true;
			if (msg) toast.error(msg);
			setSocketClient(null);
		});

		socket.on("disconnect", () => {
			if (socketError.current) return;
			setSocketClient(null);
			toast.error("Disconnecting from server");
		});
	}

	if (!socketClient?.connected)
		return <ProfileSetup setupProfile={connectSocket} />;
	return <div>this is your wheel id: {id}</div>;
}
