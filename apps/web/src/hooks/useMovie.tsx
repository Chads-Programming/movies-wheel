import { OptionType } from "@/app/(wheels)/wheels/[id]/components/movie-picker/movie-select.type";
import { api } from "@/lib/api";
import { MovieData } from "@repo/shared";
import { useEffect, useState } from "react";

export default function useMovie(value: OptionType | null) {
	const [movieData, setMovieData] = useState<MovieData | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!value) return;
		setMovie(value.value);
	}, [value]);

	async function setMovie(id: number) {
		setIsLoading(true);
		const movieData = await getMovie(id);
		setMovieData(movieData);
		setIsLoading(false);
	}

	async function getMovie(movieId: number) {
		try {
			const { data } = await api.get<MovieData>(`/movies/${movieId}`);
			return data;
		} catch (error) {
			console.log({ error });
			return null;
		}
	}
	return { movieData, isLoading };
}
