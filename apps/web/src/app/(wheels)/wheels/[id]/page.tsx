"use client";

import { useParams } from "next/navigation";
import ProfileSetup from "./components/profile-setup";
import useSocket from "@/hooks/useSocket";
import ParticipantList from "./components/participant-list/participant-list";
import WheelStages from "./components/wheel-stages/wheel-stages";

export default function WheelPage() {
	const { id } = useParams() as { id: string };
	const { socketClient, connectSocket, participants } = useSocket();
	if (!socketClient?.connected)
		return (
			<div className="p-2 h-full w-full flex justify-center">
				<ProfileSetup setupProfile={connectSocket} />
			</div>
		);

	return (
		<div className="p-2 h-full w-full flex">
			<ParticipantList participants={participants} />
			<WheelStages />
		</div>
	);
}
