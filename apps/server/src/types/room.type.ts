import { Stage } from "@repo/shared";

export interface RoomData {
	name: string;
	participantLimit: number;
	stage: Stage;
}

export interface Room extends Set<string> {
	data: RoomData;
}
