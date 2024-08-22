import { GroupBase } from "react-select";
import { LoadOptions } from "react-select-async-paginate";

export interface MovieRoot {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export type OptionType = {
	value: number;
	label: string;
	data: MovieRoot;
};

export type OptionsFetcher = LoadOptions<
	OptionType,
	GroupBase<OptionType>,
	{
		page: number;
	}
>;
