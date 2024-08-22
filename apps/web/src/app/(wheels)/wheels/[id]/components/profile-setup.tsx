import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Profile, ProfileSetupDto } from "@repo/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ColorPicker } from "@/components/ui/color-picker";
import Uploader from "@/components/ui/uploader";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import randomColor from "randomcolor";
import _ from "lodash";

const images = [
	"https://utfs.io/f/0013ee06-b14e-416d-bfc9-fae4d22077b8-9ch3om.png",
	"https://utfs.io/f/5456be80-2c77-4409-b8c0-690519831ac2-23ti.png",
	"https://utfs.io/f/91be928f-54ec-4855-9c67-4ce51dc73a4a-npjhe0.png",
	"https://utfs.io/f/9d691f7f-0e25-45b5-aa5d-af7699ff29ac-ugazk9.jpg",
	"https://utfs.io/f/049981dc-0935-4758-9ab1-8e44dfa41fe7-qlw0jq.png",
];

interface ProfileSetupProps {
	setupProfile: (data: Profile) => void;
}

const initialColor = randomColor({
	luminosity: "bright",
});

export default function ProfileSetup({ setupProfile }: ProfileSetupProps) {
	const form = useForm({
		resolver: zodResolver(ProfileSetupDto),
		defaultValues: {
			name: "Testing",
			color: initialColor,
			profilePic: _.sample(images),
		},
	});

	const { setValue, watch } = form;
	const avatar = watch("profilePic");
	const color = watch("color");

	function onSubmit(data: Profile) {
		setupProfile(data);
	}

	return (
		<div className="flex justify-center items-center centered-absolute">
			<Form {...form}>
				<form
					className="grid place-items-center gap-2"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name="name"
						render={() => (
							<FormItem className="flex flex-col gap-2 items-center">
								<FormLabel>Avatar</FormLabel>
								<FormControl>
									<Uploader
										onClientUploadComplete={(res) => {
											// Do something with the response
											if (!res.length) return;
											const file = res[0] as {
												url: string;
												serverData: { color: string };
											};
											const color = file.serverData.color;
											setValue("color", color);
											setValue("profilePic", file.url);
										}}
										onUploadError={(error: Error) => {
											toast.error("Something went wrong!", {
												description: error?.message,
											});
										}}
									>
										<Avatar
											style={{
												border: `5px solid ${color}`,
											}}
											className="flex justify-center items-center cursor-pointer w-24 h-24"
										>
											<AvatarImage
												src={avatar}
												alt={avatar}
												width={20}
												height={20}
												className="w-24 h-24 object-cover object-center"
											/>
										</Avatar>{" "}
									</Uploader>
								</FormControl>
							</FormItem>
						)}
					/>

					<div className="flex items-center gap-3 my-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Your name"
											{...field}
											className="text-center"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="color"
							render={({ field }) => (
								<FormItem>
									<FormControl className="mt-[31px]">
										<ColorPicker
											onChange={field.onChange}
											name={field.value}
											value={field.value}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button>Join</Button>
				</form>
			</Form>
		</div>
	);
}
