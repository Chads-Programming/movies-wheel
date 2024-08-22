import { Button } from "@/components/ui/button";
import useSocket from "@/hooks/useSocket";
import { useEffect, useState } from "react";
import MovieSelect from "./movie-select";
import { OptionType } from "./movie-select.type";
import PickedMovie from "./picked-movie";
import { toast } from "sonner";
import StageDialog, { ConfirmationState } from "./stage-dialog";

export default function MoviePicker() {
	const { socketClient, changeStage, isAdmin } = useSocket();

	const [value, onChange] = useState<OptionType | null>(null);
	const [confirmDialog, setConfirmDialog] = useState<ConfirmationState>({
		isOpen: false,
		message: "",
		title: "",
	});
	const [isPicked, setIsPicked] = useState(false);
	useEffect(() => {
		setIsPicked(false);
	}, [value]);
	async function pickMovie() {
		if (!value) return;
		const movie = {
			id: value.value,
		};
		socketClient
			.emitWithAck("movie-pick-with-ack", movie)
			.then(() => setIsPicked(true));
	}

	async function switchToRoulette() {
		const res = await changeStage("roulette");

		if (!res?.error) return;
		const commonArgs = {
			isOpen: true,
			message: res.message,
		};
		if (!res.requiresConfirmation)
			return setConfirmDialog({
				...commonArgs,
				title: "Error while changing stage",
			});

		setConfirmDialog({
			...commonArgs,
			title: "",
			callback() {
				const { socketClient } = useSocket();
				return socketClient.emit("change-stage", "roulette");
			},
		});
	}

	return (
		<div className="flex centered-absolute">
			<div className="gap-14 flex flex-col">
				<h2 className="font-semibold text-xl ">Movie Picker</h2>
				<div className="flex flex-col items-center gap-4">
					<MovieSelect value={value} onChange={onChange} />
					<Button
						variant={isPicked ? "success" : "default"}
						onClick={pickMovie}
						className="w-full"
					>
						{isPicked ? "Picked" : "Pick"}
					</Button>
					{isAdmin && (
						<Button
							variant="outline"
							onClick={switchToRoulette}
							className="w-full"
						>
							Switch to Roulette
						</Button>
					)}
				</div>
			</div>
			<StageDialog
				changeIsOpen={setConfirmDialog}
				isOpen={confirmDialog.isOpen}
				message={confirmDialog.message}
				title={confirmDialog.title}
				action={confirmDialog.callback}
			/>
			<PickedMovie value={value} />
		</div>
	);
}
