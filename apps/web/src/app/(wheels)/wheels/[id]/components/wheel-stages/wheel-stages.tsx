import useSocket from "@/hooks/useSocket";
import MoviePicker from "./movie-picker/movie-picker";
import Roulette from "./roulette/roulette";
import { Loader2 } from "lucide-react";


export default function WheelStages() {
	const {stage} = useSocket();

	if (!stage) return <Loading />;

	return (
		<div className="items-center text-center self-center flex-1 gap-6 flex flex-col justify-center">
			{stage === "movie-picking" ? <MoviePicker /> : <Roulette />}
		</div>
	);
}

function Loading() {
	return (
		<div className="items-center text-center self-center flex-1 gap-6 flex flex-col justify-center">
			<Loader2 className="animate-spin h-12 w-12" />
		</div>
	);
}
