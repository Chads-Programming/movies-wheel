import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { SetState } from "@/types";
import React from "react";

export type ConfirmationState = {
	isOpen: boolean;
	message: string;
	title: string;
	callback?: (...args: any[]) => any;
};

interface StageDialogProps {
	title: string;
	message?: string;
	isOpen: boolean;
	action: ConfirmationState["callback"];
	changeIsOpen: SetState<ConfirmationState>;
}
const DEFAULT_VALUES: ConfirmationState = {
	title: "",
	callback: undefined,
	message: "",
	isOpen: false,
};

export default function StageDialog({
	isOpen,
	message,
	changeIsOpen,
	action,
	title,
}: StageDialogProps) {
	const resetConfirmDialog = () => changeIsOpen(DEFAULT_VALUES);

	function onConfirm() {
		if (action) action();
		resetConfirmDialog();
	}

	return (
		<AlertDialog open={isOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{message}.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					{action && (
						<AlertDialogCancel onClick={resetConfirmDialog}>
							Cancel
						</AlertDialogCancel>
					)}
					<AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
