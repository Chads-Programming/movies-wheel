import { Request, Response, Router } from "express";
import { v4 as uuid } from "uuid";
import { RoomData } from "../types/room.type";
import { rooms } from "../app";
import { CreateWheelDto } from "@repo/shared";
import { setRoomData } from "../utils/rooms";

const wheelsRouter = Router();

wheelsRouter.post("/", (req: Request, res: Response) => {
	const data = CreateWheelDto.parse(req.body);

	const roomId = uuid();

	const roomData: RoomData = {
		name: data.wheelName,
		participantLimit: data.participantLimit,
		stage: "movie-picking",
	};

	setRoomData(roomData, roomId);

	return res.json({
		id: roomId,
	});
});

wheelsRouter.get("/:wheelId", (req: Request, res: Response) => {
	const wheelId = req.params?.wheelId;
	const room = rooms.get(wheelId);

	return res.json({
		room,
	});
});

export default wheelsRouter;
