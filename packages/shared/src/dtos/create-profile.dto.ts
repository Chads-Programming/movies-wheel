import { z } from "zod";
import { Infer } from "../";

export type Profile = Infer<typeof ProfileSetupDto>;

export const ProfileSetupDto = z.object({
	name: z.string().min(4).max(18),
	profilePic: z.string().optional(),
});
