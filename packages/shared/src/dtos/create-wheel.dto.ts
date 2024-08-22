import { z } from "zod";

export const CreateWheelDto = z.object({
	wheelName: z.string().min(4),
	participantLimit: z
		.string()
		.or(z.number())
		.transform((arg) => +arg)
		.refine((arg) => !(Number.isNaN(arg) || arg <= 1 || arg > 8), {
			message: "Participant limit must be over 1 and below 8",
		}),
});
