import { Button } from "@/components/ui/button";
import useSocket from "@/hooks/useSocket";
import { Maybe } from "@/types/maybe.type";
import { Movie, Profile, ProfileWithAdmin } from "@repo/shared";
import { useEffect, useMemo, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { WheelData } from "react-custom-roulette/dist/components/Wheel/types";

type WheelDataWithId = WheelData & { id: string };

function rouletteDataFromParticipants(
	participants: ProfileWithAdmin[],
): WheelDataWithId[] {
	const filteredParticipants = participants.filter(
		(participant) => participant.movie,
	);
	const movies: WheelDataWithId[] = filteredParticipants.map((participant) => {
		const movie = participant.movie!;
		const title = movie.title;
		return {
			completeOption: title,
			id: participant.id,
			style: {
				backgroundColor: participant.color,
				fontWeight: 800,
			},
			option:
				title.length >= 30 ? title.substring(0, 30).trimEnd() + "..." : title,
		};
	});

	return movies;
}
type SpinnedMovie = Movie & { participantId: string };

export default function Roulette() {
	const { participants, isAdmin, socketClient } = useSocket();

	const [mustSpin, setMustSpin] = useState(false);
	const [prizeNumber, setPrizeNumber] = useState(0);
	const rouletteData = useMemo<WheelDataWithId[]>(
		() => rouletteDataFromParticipants(participants),
		[participants],
	);

	const handleSpinClick = () => socketClient.emit("spin-wheel");

	const handleSpin = (prizeNumber: number) => {
		setPrizeNumber(prizeNumber);
		setMustSpin(true);
	};

	useEffect(() => {
		socketClient.on("wheel-spin", (res: Maybe<SpinnedMovie>) => {
			if (!res) return;
			const foundIndex = rouletteData.findIndex(
				(option) => option.id === res.participantId,
			);
			handleSpin(foundIndex);
		});
	}, []);
	if (!rouletteData.length) return <div>Movie list empty</div>;
	return (
		<div>
			<Wheel
				mustStartSpinning={mustSpin}
				spinDuration={0.2}
				prizeNumber={prizeNumber}
				data={rouletteData}
				outerBorderColor={"#ccc"}
				outerBorderWidth={14}
				radiusLineColor={"#ccc"}
				radiusLineWidth={4}
				textDistance={55}
				startingOptionIndex={0}
				fontSize={14}
				onStopSpinning={() => {
					setMustSpin(false);
				}}
			/>
			{isAdmin && <Button onClick={handleSpinClick}>SPIN</Button>}
		</div>
	);
}
