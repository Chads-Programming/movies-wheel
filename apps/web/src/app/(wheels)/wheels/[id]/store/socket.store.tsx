"use client";
import { ProfileSetupDto } from "@repo/shared";
import { useParams } from "next/navigation";
import { createContext, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { toast } from "sonner";
import { z } from "zod";

type Profile = z.infer<typeof ProfileSetupDto>;

interface SocketContextValues {
	socketClient: Socket;
	participants: Profile[];
	socketError: boolean | null;
	connectSocket: (profile: Profile) => void;
	getParticipants: () => void;
}

export const SocketContext = createContext<SocketContextValues>(
	{} as SocketContextValues,
);

interface ISocketProviderProps {
	children: React.ReactNode;
}
export const SocketProvider = ({ children }: ISocketProviderProps) => {
	const { id } = useParams() as { id: string };
	const [socketClient, setSocketClient] = useState<Socket>(
		null as unknown as Socket,
	);
	const [participants, setParticipants] = useState<Profile[]>([]);

	const socketError = useRef<boolean | null>(null);

	function getParticipants() {
		socketClient!
			.emitWithAck("rooms-participants-with-ack")
			.then((res) => setParticipants(res));
	}

	function connectSocket(profile: Profile) {
		const socket = io(process.env.NEXT_PUBLIC_WS_SERVER!, {
			query: {
				id,
				profile: JSON.stringify(profile),
			},
		});

		socket.on("setup-completed", () => {
			setSocketClient(socket);
			socketError.current = false;
		});

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
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};
