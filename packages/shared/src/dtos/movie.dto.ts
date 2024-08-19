import { z } from "zod";

export const MovieDto = z.object({
	id: z.number(),
	title: z.string(),
	thumbnail: z.string().optional(),
	desc: z.string().optional(),
	duration: z.number().optional(),
	rating: z.number().optional(),
});


