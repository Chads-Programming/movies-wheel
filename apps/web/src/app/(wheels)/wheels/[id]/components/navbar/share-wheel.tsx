import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export function ShareWheelLink({ children }: React.PropsWithChildren) {
	const [hasCopied, setHasCopied] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setHasCopied(false);
		}, 5000);
	}, [hasCopied]);
	function onCopy() {
		const url = window.location.href;
		if (!(navigator && navigator.clipboard && navigator.clipboard.writeText))
			return Promise.reject("The Clipboard API is not available.");

		setHasCopied(true);
		return navigator.clipboard.writeText(url);
	}
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Share link</DialogTitle>
					<DialogDescription>
						Anyone who has this link will be able to join your wheel.
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center space-x-2">
					<div className="grid flex-1 gap-2">
						<Label htmlFor="link" className="sr-only">
							Link
						</Label>
						<Input id="link" defaultValue={window.location.href} readOnly />
					</div>
					<TooltipProvider>
						<Tooltip open={hasCopied}>
							<TooltipContent className="-ml-4">
								<p>Copied!</p>
							</TooltipContent>
							<TooltipTrigger>
								<Button
									variant={hasCopied ? "outline" : "default"}
									type="submit"
									size="sm"
									className="px-3"
									onClick={onCopy}
								>
									<span className="sr-only">Copy</span>
									{hasCopied ? (
										<Check className="h-4 w-4" />
									) : (
										<Copy className="h-4 w-4" />
									)}
								</Button>
							</TooltipTrigger>
						</Tooltip>
					</TooltipProvider>
				</div>
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
