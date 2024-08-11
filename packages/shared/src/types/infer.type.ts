import { Schema, z } from "zod";

export type Infer<T extends Schema> = z.infer<T>;
