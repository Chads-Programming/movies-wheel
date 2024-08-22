import { ProfileWithAdmin } from "@repo/shared";
import ParticipantItem from "./participant-item";

interface ParticipantListProps {
	participants: ProfileWithAdmin[];
}

export default function ParticipantList({
	participants,
}: ParticipantListProps) {
	return (
		<div className="flex flex-col gap-2">
			{participants.map((participant) => (
				<ParticipantItem participant={participant} key={participant.id} />
			))}
		</div>
	);
}
