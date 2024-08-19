import { Movie } from "@repo/shared";
import axios from "axios";

export default async function getMovies(search: string) {
	const API_KEY = process.env.MOVIE_API_KEY;
	try {
		const { data } = await axios.get<{ results: Movie[] }>(
			`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`,
			{
				headers: {
					accept: "application/json",
				},
			},
		);
		return data.results;
	} catch (error) {
		return [];
	}
}
