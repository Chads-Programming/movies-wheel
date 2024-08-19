import { Button } from "@/components/ui/button";
import useSocket from "@/hooks/useSocket";
import { useState } from "react";
import MovieSelect from "./movie-select";
import { OptionType } from "./movie-select.type";
import PickedMovie from "./picked-movie";

export default function MoviePicker() {
	const { socketClient } = useSocket();

	const [value, onChange] = useState<OptionType | null>(null);

	async function pickMovie() {
		if (!value) return;
		const movie = {
			id: value.value,
		};
		socketClient.emitWithAck("movie-pick-with-ack", movie);
	}

	return (
		<div className="flex">
			<div className="gap-14 flex flex-col">
				<h2 className="font-semibold text-xl ">Movie Picker</h2>
				<div className="flex flex-col items-center gap-4">
					<MovieSelect value={value} onChange={onChange} />
					<Button onClick={pickMovie} className="w-full">
						Pick
					</Button>
				</div>
			</div>
			<PickedMovie value={value} />
		</div>
	);
}
