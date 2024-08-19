import { Profile } from "@repo/shared";
import ParticipantItem from "./participant-item";

interface ParticipantListProps {
	participants: Profile[];
}

export default function ParticipantList({
	participants,
}: ParticipantListProps) {
	return (
		<div className="flex flex-col gap-2 t-0 l-2 absolute">
			{participants.map((participant) => (
				<ParticipantItem participant={participant} />
			))}
		</div>
	);
}
