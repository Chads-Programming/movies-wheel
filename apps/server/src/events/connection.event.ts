import { Profile, ProfileSetupDto, Stage } from "@repo/shared";
import { BaseSocket } from "../types/socket.type";
import {
	getRoom,
	getRoomParticipantsByRoomId,
	isEmptyRoom,
	isFullRoom,
	setRoomStage,
} from "../utils/rooms";
import { addAdmin, addProfile, isRoomAdmin } from "../utils/socket";
import GetRoomParticipants from "./room-participants.event";
import { io } from "../app";
import MoviePickeEvent from "./movie-pick.event";
import _ from "lodash";

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
		console.log(error);
		throw new ConnectionError("Invalid profile");
	}
}

function checkRoom(roomId: string) {
	const room = getRoom(roomId);
	if (!room) throw new ConnectionError("Room not found");

	const isFull = isFullRoom(roomId);

	if (isFull) throw new ConnectionError("Room is full");
	const isAdmin = isEmptyRoom(roomId);

	return { isAdmin, room };
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

		const socketId = socket.id;
		const { isAdmin } = checkRoom(roomId);

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

		socket.on(
			"movie-pick-with-ack",
			async (data, response) =>
				await MoviePickeEvent(socketId, roomId, data, response),
		);

		socket.on("stage-with-ack", async (response) => {
			const room = getRoom(roomId)!;
			return response(room.data.stage);
		});

		socket.on("change-stage", async (stage: Stage) => {
			const isAdmin = isRoomAdmin(socketId, roomId);
			console.log({ isAdmin });
			if (!isAdmin) return;
			setRoomStage(stage, roomId);
			io.to(roomId).emit("stage-change", stage);
		});

		socket.on("spin-wheel", () => {
			const isAdmin = isRoomAdmin(socketId, roomId);
			if (!isAdmin) return;
			const participants = getRoomParticipantsByRoomId(roomId)!;
			const participant = participants.filter(
				(participant) => participant.movie,
			);
			const randomParticipant = _.sample(participant);
			if (!randomParticipant) return;

			io.to(roomId).emit("wheel-spin", {
				...randomParticipant.movie!,
				participantId: randomParticipant.id,
			});
		});

		socket.emit("setup-completed");
	} catch (error: unknown) {
		if (!(error instanceof ConnectionError))
			return connectionError("Error while connecting");

		return connectionError(error.message);
	}
};
