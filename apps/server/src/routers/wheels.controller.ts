import { Request, Response, Router } from "express";
import { v4 as uuid } from "uuid";
import { RoomData } from "../types/room.type";
import { rooms } from "../app";
import { CreateWheelDto } from "@repo/shared";

const wheelsRouter = Router();

wheelsRouter.post("/", (req: Request, res: Response) => {
	const data = CreateWheelDto.parse(req.body);

	const roomId = uuid();

	const roomData: RoomData = {
		name: data.wheelName,
		participantLimit: data.participantLimit,
	};

	const set = new Set<string>();

	Object.defineProperty(set, "data", { value: roomData });

	rooms.set(roomId, set);

	return res.json({
		id: roomId,
	});
});

export default wheelsRouter;
