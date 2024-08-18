"use client";

import { useParams } from "next/navigation";
import ProfileSetup from "./components/profile-setup";
import useSocket from "@/hooks/useSocket";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function WheelPage() {
	const { id } = useParams() as { id: string };
	const { socketClient, connectSocket, getParticipants, participants } =
		useSocket();
	if (!socketClient?.connected)
		return <ProfileSetup setupProfile={connectSocket} />;

	return (
		<div className="p-2">
			<div className="flex gap-2 items-center justify-end">
				<Button onClick={getParticipants}>Get Participants</Button>
				<Button onClick={() => socketClient.disconnect()}>
					<LogOut className="h-6 w-6" />
				</Button>
			</div>
			<div className="flex flex-col">
				{participants.map((participant) => (
					<div className="flex items-center gap-2">
						<Avatar className="w-16 h-16">
							<AvatarImage
								className="rounded-full"
								style={{
									borderStyle: "solid",
									borderWidth: "5px",
									borderColor: participant.color,
								}}
								color="orange"
								src={participant.profilePic}
							/>
							<AvatarFallback style={{ background: participant.color }}>
								{nameToLogo(participant.name)}
							</AvatarFallback>
						</Avatar>
						<span>- {participant.name}</span>
					</div>
				))}
			</div>
			this is your wheel id: {id}{" "}
		</div>
	);
}

function nameToLogo(word: string) {
	const [name, lastName] = word.split(" ");
	if (!lastName) return name.slice(0, 2);
	return [name[0], lastName[0]].join(" ");
}
