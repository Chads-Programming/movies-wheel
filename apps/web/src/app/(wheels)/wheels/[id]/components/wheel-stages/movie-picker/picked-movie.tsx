import { Badge } from "@/components/ui/badge";
import useMovie from "@/hooks/useMovie";
import getPosterImage from "@/lib/get-poster-image";
import humanizeDuration from "humanize-duration";
import { Loader2 } from "lucide-react";
import { OptionType } from "./movie-select.type";

interface PickedMovieProps {
	value: OptionType | null;
}

export default function PickedMovie({ value }: PickedMovieProps) {
	const { isLoading, movieData } = useMovie(value);
	if (isLoading)
		return (
			<div className="relative">
				<div className="absolute left-2 -top-11 w-[500px] min-h-[250px] ml-4 grid place-items-center">
					<Loader2 className="animate-spin" size={40} />
				</div>
			</div>
		);
	return (
		<>
			{movieData && (
				<div className="relative">
					<div className="absolute left-2 -top-11 w-[530px] gap-6 flex ml-4">
						<img
							className="h-[300px] w-[200px] rounded-lg"
							src={getPosterImage(movieData.poster_path)}
						/>
						<div className="flex flex-col gap-1">
							<h2 className="font-bold text-left text-lg">
								{movieData.title}{" "}
								{movieData.vote_average && (
									<Badge>{movieData.vote_average.toFixed(2)}</Badge>
								)}
							</h2>
							<p className="text-left line-clamp-[11]">{movieData.overview}</p>
							{movieData.runtime && (
								<p className="mt-3 font-bold text-[#666] text-left">
									{humanizeDuration(movieData.runtime * 60000)}
								</p>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
