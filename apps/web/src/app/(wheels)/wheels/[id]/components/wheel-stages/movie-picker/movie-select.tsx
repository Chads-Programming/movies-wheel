import { AsyncPaginate } from "react-select-async-paginate";
import { OptionType } from "./movie-select.type";
import fetchMovies from "../../../utils/fetch-movies";

interface MovieSelectProps {
	value: OptionType | null;
	onChange: React.Dispatch<React.SetStateAction<OptionType | null>>;
}
export default function MovieSelect({ value, onChange }: MovieSelectProps) {
	return (
		<AsyncPaginate
			value={value}
			classNames={{
				option: () => "!w-[250px]",
				control: () => "!w-[250px]",
				menuList: () => "!w-[250px]",
			}}
			loadOptions={fetchMovies}
			onChange={onChange}
			additional={{
				page: 1,
			}}
		/>
	);
}
