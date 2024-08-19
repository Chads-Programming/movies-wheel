import {
	MovieRoot,
	OptionsFetcher,
} from "../components/movie-picker/movie-select.type";
import { api } from "@/lib/api";

const fetchMovies: OptionsFetcher = async (search: string, _, opts) => {
	try {
		const page = opts?.page || 1;
		const { data } = await api.get<{ results: MovieRoot[] }>(
			`/movies?search=${search}`,
			{
				headers: {
					accept: "application/json",
				},
			},
		);
		return {
			options: data.results.map((item) => ({
				value: item.id,
				label: item.title,
				data: item,
			})),
			hasMore: false,
			additional: {
				page: page + 1,
			},
		};
	} catch (error) {
		console.log({ error });
		return {
			options: [],
		};
	}
};
export default fetchMovies;
