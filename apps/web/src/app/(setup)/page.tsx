"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreateWheelDto } from "@repo/shared/src/dtos/create-wheel.dto";
import { api } from "@/lib/api";

const val = Math.random().toFixed(4);

export default function Home() {
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			participantLimit: 1,
			wheelName: `Testing ${val}`,
		},
		reValidateMode: "onChange",
		resolver: zodResolver(CreateWheelDto),
	});

	async function onSubmit(values: z.infer<typeof CreateWheelDto>) {
		try {
			const {
				data: { id },
			} = await api.post<{ id: string }>("/wheels", values);
			toast.success(`Wheel created ${id}`);
			router.replace(`/wheels/${id}`);
		} catch (error) {
			if (!(error instanceof AxiosError)) return;
			toast.error(error.message);
		}
	}

	return (
		<main className="h-screen w-screen flex justify-center items-center">
			<Form {...form}>
				<form
					className="grid place-items-center gap-2"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name="wheelName"
						render={({ field }) => (
							<FormItem className="text-center">
								<FormLabel>Wheel Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Your Super Wheel Name"
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
						name="participantLimit"
						render={({ field }) => (
							<FormItem className="text-center">
								<FormLabel>Participants</FormLabel>
								<FormControl>
									<Input
										placeholder="Participant amount"
										className="text-center"
										type="number"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button>Create</Button>
				</form>
			</Form>
		</main>
	);
}
