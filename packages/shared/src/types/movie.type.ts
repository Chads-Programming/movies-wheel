import z from "zod";
import { MovieDto } from "../dtos";

export type Movie = z.infer<typeof MovieDto>;

export type MovieData = {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: {
		id: number;
		name: string;
		poster_path: string;
		backdrop_path: string;
	};
	budget: number;
	genres: Array<{
		id: number;
		name: string;
	}>;
	homepage: string;
	id: number;
	imdb_id: string;
	origin_country: Array<string>;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: Array<{
		id: number;
		logo_path?: string;
		name: string;
		origin_country: string;
	}>;
	production_countries: Array<{
		iso_3166_1: string;
		name: string;
	}>;
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: Array<{
		english_name: string;
		iso_639_1: string;
		name: string;
	}>;
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

export interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

export interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}
