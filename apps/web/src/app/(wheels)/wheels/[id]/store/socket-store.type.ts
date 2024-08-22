import { Maybe } from "@/types/maybe.type";
import { Profile, ProfileWithAdmin, Stage } from "@repo/shared";
import { Socket } from "socket.io-client";

export type StageChangeResponse = Maybe<{
	error: boolean;
	message: string;
	requiresConfirmation?: boolean;
}>;

export type StageOrUndefined = Maybe<Stage>;

export interface SocketContextActions {
	connectSocket: (profile: Profile) => void;
	getParticipants: () => void;
	changeStage: (
		stage: Stage,
	) => Promise<
		Maybe<{ error: boolean; message: string; requiresConfirmation?: boolean }>
	>;
}

export interface SocketContextValues {
	socketClient: Socket;
	participants: ProfileWithAdmin[];
	socketError: boolean | null;
	isAdmin: boolean;
	stage: StageOrUndefined;
}

export interface SocketContextData
	extends SocketContextActions,
		SocketContextValues {}
