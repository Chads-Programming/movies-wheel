export interface RoomData {
	name: string;
	participantLimit: number;
}

export interface Room extends Set<string> {
	data: RoomData;
}
