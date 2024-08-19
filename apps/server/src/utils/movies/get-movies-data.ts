import { MovieData } from "@repo/shared";
import axios from "axios";

export default async function getMovieData(movieId: number) {
	const API_KEY = process.env.MOVIE_API_KEY;
	try {
		const { data } = await axios.get<MovieData>(
			`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`,
		);
		return data;
	} catch (error) {
		console.log({ error });
		return null;
	}
}

