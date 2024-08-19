import { Socket } from "socket.io";
import { getSocketRoom } from "../utils/socket";
import { ProfileWithAdmin } from "../types/socket.type";
import { getRoom, getRoomParticipants } from "../utils/rooms";

export default function GetRoomParticipantsBySocket(socket: Socket) {
	const room = getSocketRoom(socket.id);
	if (!room) return;
	const participants = getRoomParticipants(room);
	return participants;
}

