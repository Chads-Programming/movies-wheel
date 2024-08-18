import { rooms } from "../app";
import { Room } from "../types/room.type";
import { ProfileWithAdmin } from "../types/socket.type";
import { getSocket } from "./socket";

export const getRoom = (roomId: string): null | Room => {
	const foundRoom = rooms.get(roomId) as Room | null;
	return foundRoom;
};

export const isEmptyRoom = (roomId: string) => {
	const room = rooms.get(roomId) as Room;
	const participantsCount = room.size;
	return participantsCount <= 0;
};

export const isFullRoom = (roomId: string) => {
	const room = rooms.get(roomId) as Room;
	const participantsCount = room.size;
	return participantsCount >= room.data!.participantLimit;
};

export const getRoomParticipants = (room: Room): ProfileWithAdmin[] => {
	const roomParticipants = Array.from(room.values());
	const participants = roomParticipants
		.map((socketId) => getSocket(socketId)?.data?.profile)
		.filter(Boolean) as ProfileWithAdmin[];
	return participants;
};
