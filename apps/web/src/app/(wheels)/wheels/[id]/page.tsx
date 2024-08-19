"use client";

import { useParams } from "next/navigation";
import ProfileSetup from "./components/profile-setup";
import useSocket from "@/hooks/useSocket";
import ParticipantList from "./components/participant-list/participant-list";
import MoviePicker from "./components/movie-picker/movie-picker";

export default function WheelPage() {
	const { id } = useParams() as { id: string };
	const { socketClient, connectSocket, participants } = useSocket();
	if (!socketClient?.connected)
		return <ProfileSetup setupProfile={connectSocket} />;

	return (
		<div className="p-2 h-full w-full flex">
			<ParticipantList participants={participants} />
			<div className="items-center text-center self-center flex-1 gap-6 flex flex-col justify-center">
				<MoviePicker />
			</div>
		</div>
	);
}

