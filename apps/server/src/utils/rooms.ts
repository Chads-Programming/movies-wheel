import { ProfileWithAdmin, Stage } from "@repo/shared";
import { rooms } from "../app";
import { Room, RoomData } from "../types/room.type";
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

export function getRoomParticipantsByRoomId(roomId: string) {
	const room = getRoom(roomId);
	if (!room) return;
	const participants = getRoomParticipants(room);
	return participants;
}

export function setRoomData(roomData: RoomData, roomId: string) {
	let set = getRoom(roomId) as any;
	set ??= new Set<string>();

	Object.defineProperty(set, "data", {
		value: roomData,
		configurable: true,
		enumerable: true,
	});

	rooms.set(roomId, set);

	return roomData;
}

export function setRoomStage(stage: Stage, roomId: string) {
	const room = getRoom(roomId)!;
	return setRoomData({ ...room.data, stage }, roomId);
}
