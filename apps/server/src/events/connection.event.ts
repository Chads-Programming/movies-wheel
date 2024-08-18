import { Profile, ProfileSetupDto } from "@repo/shared";
import { BaseSocket } from "../types/socket.type";
import { getRoom, isEmptyRoom, isFullRoom } from "../utils/rooms";
import { addAdmin, addProfile } from "../utils/socket";
import { z } from "zod";

type Socket = BaseSocket<any>;

const decode = (encoded: string) => JSON.parse(encoded);

class ConnectionError extends Error {}

function parseProfile(data: unknown): Profile {
	try {
		const decodedProfile = decode((data as string) || "") as unknown as
			| Profile
			| undefined;

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

		if (typeof roomId !== "string") throw new ConnectionError();

		const room = getRoom(roomId);

		if (!room) throw new ConnectionError("Room not found");

		const isFull = isFullRoom(roomId);

		if (isFull) throw new ConnectionError("Room is full");

		const socketId = socket.id;
		const isAdmin = isEmptyRoom(roomId);

		if (isAdmin) addAdmin(socketId, profile);
		else addProfile(socketId, profile);

		await socket.join(roomId);

		socket.emit("setup-completed");
	} catch (error: unknown) {
		if (!(error instanceof ConnectionError))
			return connectionError("Error while connecting");

		return connectionError(error.message);
	}
};
