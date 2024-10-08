import { Profile } from "@repo/shared";
import { SocketProfile } from "../types/socket.type";
import { io } from "../app";
import { getRoom, getRoomParticipantsByRoomId } from "./rooms";
import { Room } from "../types/room.type";

export const getSocket = (socketId: string): SocketProfile | undefined =>
	io.sockets.sockets.get(socketId) as SocketProfile | undefined;

const addProfileToSocket = (
	socketId: string,
	roomId: string,
	profile: Profile,
	isAdmin: boolean = false,
): SocketProfile => {
	const socket = getSocket(socketId)!;
	socket["data"] = {
		profile: { ...profile, id: socketId, isAdmin },
		roomId,
	};
	return socketId as unknown as SocketProfile;
};

type ProfileParams = Parameters<typeof addProfileToSocket>;
type ProfileParamsWithoutIsAdmin = [
	ProfileParams[0],
	ProfileParams[1],
	ProfileParams[2],
];

export const addAdmin = (...args: ProfileParamsWithoutIsAdmin) =>
	addProfileToSocket(...args, true);

export const addProfile = (...args: ProfileParamsWithoutIsAdmin) =>
	addProfileToSocket(...args);

export function getSocketRoom(socketId: string): Room | null {
	const socket = getSocket(socketId);
	const roomId = socket?.data.roomId;
	if (!roomId) return null;
	const room = getRoom(roomId);
	return room;
}

export function modifySocketData(
	socketId: string,
	profile: Partial<Profile>,
): SocketProfile {
	const socket = getSocket(socketId)!;
	const oldProfile = socket.data.profile;
	socket.data.profile = { ...oldProfile, ...profile };
	return socket as unknown as SocketProfile;
}

export function isRoomAdmin(socketId: string, roomId: string) {
	const participants = getRoomParticipantsByRoomId(roomId)!;
	const admin = participants.find((participant) => participant.isAdmin);
	return admin?.id === socketId;
}
