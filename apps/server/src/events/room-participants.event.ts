import { Socket } from "socket.io";
import { getSocketRoom } from "../utils/socket";
import { ProfileWithAdmin } from "../types/socket.type";
import { getRoomParticipants } from "../utils/rooms";

export default function GetRoomParticipants(socket: Socket) {
	const room = getSocketRoom(socket.id);
	if (!room) return;
	const participants = getRoomParticipants(room);
	return participants;
}
