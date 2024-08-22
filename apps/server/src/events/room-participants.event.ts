import { Socket } from "socket.io";
import { getSocketRoom } from "../utils/socket";
import { getRoomParticipants } from "../utils/rooms";

export default function GetRoomParticipantsBySocket(socket: Socket) {
	const room = getSocketRoom(socket.id);
	if (!room) return;
	const participants = getRoomParticipants(room);
	return participants;
}
