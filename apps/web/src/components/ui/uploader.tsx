"use client";

import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { extractColors } from "extract-colors";

interface UploaderProps {
	onClientUploadComplete: (res: { url: string }[]) => void;
	onUploadError: (error: Error) => void;
	children: React.ReactNode;
}

export default function Uploader({
	onClientUploadComplete,
	onUploadError,
	children,
}: UploaderProps) {
	const { startUpload, isUploading } = useUploadThing("imageUploader", {
		onClientUploadComplete,
		onUploadError,
	});

	return (
		<>
			<label
				htmlFor="file-upload"
				className={cn(isUploading && "animate-pulse", "flex justify-center")}
			>
				{children}
			</label>
			<input
				id="file-upload"
				accept="image/*"
				hidden
				type="file"
				onChange={async (e) => {
					const file = e.target.files?.[0];
					if (!file) return;

					const imgData = await fileToImageData(file); // Call the function
					const colors = await extractColors(imgData);
					console.log({ colors });
					const color = colors.sort((a, b) => (a.area < b.area ? 1 : -1))[0];
					// then start the upload
					await startUpload([file], { color: color.hex });
				}}
			/>
		</>
	);
}

function fileToImageData(file: File): Promise<ImageData> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (e) => {
			const image = new Image();
			image.onload = () => {
				const canvas = document.createElement("canvas");
				const ctx = canvas.getContext("2d");
				if (!ctx) {
					reject(new Error("Failed to get canvas context"));
					return;
				}
				canvas.width = image.width;
				canvas.height = image.height;
				ctx.drawImage(image, 0, 0);
				resolve(ctx.getImageData(0, 0, image.width, image.height));
			};
			image.onerror = reject;
			image.src = e.target?.result as string;
		};

		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}
