import { z } from "zod";
import { Infer } from "../";

export type Profile = Infer<typeof ProfileSetupDto>;

export const ProfileSetupDto = z.object({
	name: z.string().min(4).max(18),
	color: z.string().max(7),
	profilePic: z.string().optional(),
});
