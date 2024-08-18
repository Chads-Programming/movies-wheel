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
import { Infer } from "@/types/infer.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface ProfileSetupProps {
	setupProfile: (data: Profile) => void;
}
export default function ProfileSetup({ setupProfile }: ProfileSetupProps) {
	const form = useForm({
		resolver: zodResolver(ProfileSetupDto),
		defaultValues: {
			name: "testtt",
			profilePic: "",
		},
	});

	function onSubmit(data: Profile) {
		console.log({ data });
		setupProfile(data);
	}

	return (
		<div className="h-screen w-screen flex justify-center items-center">
			<Form {...form}>
				<form
					className="grid place-items-center gap-2"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="text-center">
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

					<Button>Join</Button>
				</form>
			</Form>
		</div>
	);
}
