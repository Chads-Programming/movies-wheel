import { Button } from "@/components/ui/button";
import useSocket from "@/hooks/useSocket";
import { useEffect, useState } from "react";
import MovieSelect from "./movie-select";
import { OptionType } from "./movie-select.type";
import PickedMovie from "./picked-movie";

export default function MoviePicker() {
	const { socketClient, changeStage, isAdmin } = useSocket();

	const [value, onChange] = useState<OptionType | null>(null);
	const [isPicked, setIsPicked] = useState(false);
	useEffect(() => {
		setIsPicked(false);
	}, [value]);
	async function pickMovie() {
		if (!value) return;
		const movie = {
			id: value.value,
		};
		socketClient
			.emitWithAck("movie-pick-with-ack", movie)
			.then(() => setIsPicked(true));
	}

	return (
		<div className="flex centered-absolute">
			<div className="gap-14 flex flex-col">
				<h2 className="font-semibold text-xl ">Movie Picker</h2>
				<div className="flex flex-col items-center gap-4">
					<MovieSelect value={value} onChange={onChange} />
					<Button
						variant={isPicked ? "success" : "default"}
						onClick={pickMovie}
						className="w-full"
					>
						{isPicked ? "Picked" : "Pick"}
					</Button>
					{isAdmin && (
						<Button
							variant="destructive"
							onClick={() => changeStage("roulette")}
							className="w-full"
						>
							Change Stage
						</Button>
					)}
				</div>
			</div>
			<PickedMovie value={value} />
		</div>
	);
}
