import { SocketContext } from "@/app/(wheels)/wheels/[id]/store/socket.store";
import { useContext } from "react";

export default function useSocket() {
	const socketContext = useContext(SocketContext);

	if (!socketContext) throw new Error("Socket Context not found");

	return socketContext;
}
