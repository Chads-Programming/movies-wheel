import { z } from "zod";
import { Infer } from "../";
import { MovieDto } from "./movie.dto";

export type Profile = Infer<typeof ProfileSetupDto>;

export type ProfileWithAdmin = Profile & { isAdmin: boolean; id: string };

export const ProfileSetupDto = z.object({
	name: z.string().min(4).max(18),
	color: z.string().max(7),
	profilePic: z.string().optional(),
	movie: MovieDto.optional(),
});
