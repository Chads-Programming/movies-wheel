import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import getPosterImage from "@/lib/get-poster-image";
import { Movie, Profile, ProfileWithAdmin } from "@repo/shared";
import humanizeDuration from "humanize-duration";
import { Crown } from "lucide-react";

interface ParticipantItemProps {
	participant: ProfileWithAdmin;
}

export default function ParticipantItem({ participant }: ParticipantItemProps) {
	const movie = participant.movie;
	return (
		<div className="flex items-center gap-2">
			<ParticipantLogo participant={participant} />
			<div className="flex flex-col gap-2">
				<div className="flex gap-1">
					<span>{capitalize(participant.name)}</span>
					{participant.isAdmin && (
						<Badge className="p-[0.3rem] rounded-full">
							<Crown color="yellow" className="h-[15px] w-[15px]" />
						</Badge>
					)}
				</div>
				{!movie ? (
					<span className="animate-pulse font-semibold text-sm">
						Picking...
					</span>
				) : (
					<PickedMovie {...movie} />
				)}
			</div>
		</div>
	);
}

interface PickedMovieProps extends Movie {}
function PickedMovie({
	title,
	thumbnail,
	desc,
	duration,
	rating,
}: PickedMovieProps) {
	return (
		<HoverCard>
			<HoverCardTrigger className="font-semibold text-[#555] cursor-default">
				{title}
			</HoverCardTrigger>
			<HoverCardContent className="flex min-w-[500px] gap-2">
				{thumbnail && (
					<img
						src={getPosterImage(thumbnail)}
						className="h-[250px] w-[150px]"
						height={220}
						width={150}
					/>
				)}
				<div className="flex flex-col ml-2 w-full">
					<h3 className="text-center mx-auto mb-2 font-semibold text-lg">
						{title} {rating && <Badge>{rating.toFixed(2)}</Badge>}
					</h3>
					<p className="line-clamp-[8]">{desc}</p>
					{duration && (
						<p className="mt-3 font-bold text-[#666]">
							{humanizeDuration(duration * 60000)}
						</p>
					)}
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}

function ParticipantLogo({ participant }: ParticipantItemProps) {
	return (
		<Avatar className="w-14 h-14">
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
	);
}

function nameToLogo(word: string) {
	const [name, lastName] = word.split(" ");
	if (!lastName) return name.slice(0, 2);
	return [name[0], lastName[0]].join(" ");
}

const capitalize = (word: string) => word[0].toUpperCase() + word.substring(1);
