import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { extractColors } from "extract-colors";
import { z } from "zod";

const f = createUploadthing();

const imageInput = z.object({
	color: z.string().max(8),
});
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({ image: { maxFileSize: "4MB" } })
		.input(imageInput)
		.middleware(async ({ input }) => {
			return { color: input.color };
		})
		// Set permissions and file types for this FileRoute
		.onUploadComplete(async ({ metadata }) => ({ color: metadata.color })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
