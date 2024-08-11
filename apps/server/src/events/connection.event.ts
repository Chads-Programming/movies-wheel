import { Profile } from "@repo/shared";
import { BaseSocket } from "../types/socket.type";
import { getRoom, isEmptyRoom, isFullRoom } from "../utils/rooms";
import { addAdmin, addProfile } from "../utils/socket";

type Socket = BaseSocket<any>;

const decode = (encoded: string) => JSON.parse(encoded);

export const connectionEvent = async (socket: Socket) => {
	const roomId = socket.handshake.query?.id;

	const profile = decode(
		(socket.handshake.query?.profile as string) || "",
	) as unknown as Profile | undefined;

	if (!profile) return socket.disconnect();
	if (typeof roomId !== "string") return socket.disconnect();

	const room = getRoom(roomId);
	if (!room) return socket.disconnect();

	const isFull = isFullRoom(roomId);
	if (isFull) socket.disconnect();

	const socketId = socket.id;
	const isAdmin = isEmptyRoom(roomId);
	if (isAdmin) addAdmin(socketId, profile);
	else addProfile(socketId, profile);

	await socket.join(roomId);
};
