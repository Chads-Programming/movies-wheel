"use client";

import { useParams } from "next/navigation";
import { useRef } from "react";
import io, { Socket } from "socket.io-client";
import ProfileSetup from "./components/profile-setup";
import { Profile } from "@repo/shared";

export default function WheelPage() {
	const { id } = useParams() as { id: string };
	const socketClient = useRef<Socket | null>(null);

	function connectSocket(profile: Profile) {
		console.log({ profile });
		socketClient.current = io(process.env.NEXT_PUBLIC_WS_SERVER!, {
			query: {
				id,
				profile: JSON.stringify(profile),
			},
		});
	}

	if (!socketClient.current)
		return <ProfileSetup setupProfile={connectSocket} />;
	return <div>this is your wheel id: {id}</div>;
}
