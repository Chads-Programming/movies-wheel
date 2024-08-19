import { MovieDto } from "@repo/shared";
import { z } from "zod";

export const PickMovieDto = MovieDto.pick({
	id: true,
});
