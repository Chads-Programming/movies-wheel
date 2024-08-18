import { Profile, ProfileSetupDto } from "@repo/shared";
import { BaseSocket } from "../types/socket.type";
import { getRoom, isEmptyRoom, isFullRoom } from "../utils/rooms";
import { addAdmin, addProfile } from "../utils/socket";
import GetRoomParticipants from "./room-participants.event";

type Socket = BaseSocket<any>;

const decode = (encoded: string) => JSON.parse(encoded);

class ConnectionError extends Error {}

function parseProfile(data: unknown): Profile {
	try {
		const decodedProfile = decode((data as string) || "") as unknown as
			| Profile
			| undefined;
		console.log({ decodedProfile });
		const profile = ProfileSetupDto.parse(decodedProfile);

		return profile;
	} catch (error) {
		throw new ConnectionError("Invalid profile");
	}
}

export const connectionEvent = async (socket: Socket) => {
	const connectionError = (msg?: string) => {
		socket.emit("connection-error", msg);
		socket.disconnect();
	};

	try {
		const roomId = socket.handshake.query?.id;

		const profile = parseProfile(socket.handshake.query?.profile);
		console.log({ profile });
		if (typeof roomId !== "string") throw new ConnectionError();

		const room = getRoom(roomId);

		if (!room) throw new ConnectionError("Room not found");

		const isFull = isFullRoom(roomId);

		if (isFull) throw new ConnectionError("Room is full");

		const socketId = socket.id;
		const isAdmin = isEmptyRoom(roomId);

		if (isAdmin) addAdmin(socketId, roomId, profile);
		else addProfile(socketId, roomId, profile);

		await socket.join(roomId);

		socket.on("rooms-participants-with-ack", (response) => {
			const participants = GetRoomParticipants(socket);
			return response(participants);
		});

		socket.on("rooms-participants", () => {
			const participants = GetRoomParticipants(socket);
			return socket.emit("rooms-participants", participants);
		});

		socket.emit("setup-completed");
	} catch (error: unknown) {
		if (!(error instanceof ConnectionError))
			return connectionError("Error while connecting");

		return connectionError(error.message);
	}
};
