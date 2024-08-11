import { rooms } from "../app";
import { Room } from "../types/room.type";

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
