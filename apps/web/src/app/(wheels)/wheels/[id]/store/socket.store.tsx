"use client";
import { Maybe } from "@/types/maybe.type";
import { Profile, ProfileWithAdmin, Stage } from "@repo/shared";
import { useParams } from "next/navigation";
import { createContext, useMemo, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { toast } from "sonner";

type StageOrUndefined = Maybe<Stage>;

interface SocketContextActions {
	connectSocket: (profile: Profile) => void;
	getParticipants: () => void;
	changeStage: (stage: Stage) => void;
}

interface SocketContextValues {
	socketClient: Socket;
	participants: ProfileWithAdmin[];
	socketError: boolean | null;
	isAdmin: boolean;
	stage: StageOrUndefined;
}

interface SocketContextData extends SocketContextActions, SocketContextValues {}

export const SocketContext = createContext<SocketContextData>(
	{} as SocketContextData,
);

interface ISocketProviderProps {
	children: React.ReactNode;
}

export const SocketProvider = ({ children }: ISocketProviderProps) => {
	const { id } = useParams() as { id: string };
	const [stage, setStage] = useState<StageOrUndefined>(undefined);
	const [socketClient, setSocketClient] = useState<Socket>(
		null as unknown as Socket,
	);
	const [participants, setParticipants] = useState<ProfileWithAdmin[]>([]);
	const isAdmin = useMemo(() => {
		const foundSocket = participants.find(
			(participant) => participant.id === socketClient?.id,
		);
		console.log({ foundSocket, participants });
		return Boolean(foundSocket?.isAdmin);
	}, [participants, socketClient]);

	const socketError = useRef<boolean | null>(null);

	function getParticipants() {
		socketClient!
			.emitWithAck("rooms-participants-with-ack")
			.then((res) => setParticipants(res));
	}

	function changeStage(stage: Stage) {
		socketClient!.emit("change-stage", stage);
	}

	function connectSocket(profile: Profile) {
		const socket = io(process.env.NEXT_PUBLIC_WS_SERVER!, {
			query: {
				id,
				profile: JSON.stringify(profile),
			},
		});

		socket.on("setup-completed", () =>
			socket
				.timeout(8000)
				.emitWithAck("stage-with-ack")
				.then((stage) => {
					setStage(stage);
				})
				.finally(() => {
					setSocketClient(socket);
					socketError.current = false;
				}),
		);

		socket.on("stage-change", (val: Stage) => setStage(val));

		socket.on("rooms-participants", (data: any) => {
			setParticipants(data);
		});

		socket.on("connection-error", (msg: string) => {
			socketError.current = true;
			if (msg) toast.error(msg);
			setSocketClient(null as unknown as Socket);
		});

		socket.on("disconnect", () => {
			if (socketError.current) return;
			setSocketClient(null as unknown as Socket);
			toast.error("Disconnecting from server");
		});
	}

	return (
		<SocketContext.Provider
			value={{
				socketError: socketError.current,
				participants,
				socketClient,
				connectSocket,
				getParticipants,
				stage,
				isAdmin,
				changeStage,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};
