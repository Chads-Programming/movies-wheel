import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import wheelsRouter from "./routers/wheels.router";
import { connectionEvent } from "./events/connection.event";
import { getRoomParticipantsByRoomId } from "./utils/rooms";
import dotenv from "dotenv";
import moviesRouter from "./routers/movies.router";
dotenv.config();


const app = express();

app.use(
	cors({
		origin: "*",
	}),
);

app.use(bodyParser.json());

app.use("/wheels", wheelsRouter);
app.use("/movies", moviesRouter);

const httpServer = createServer(app);

export const io = new Server(httpServer, {
	cors: {
		origin: "*",
	},
});

export const adapter = io.of("").adapter;
export const rooms = adapter.rooms;

adapter.on("join-room", (roomId, socketId) => {
	const participants = getRoomParticipantsByRoomId(roomId);
	io.to(roomId).emit("rooms-participants", participants);
});

adapter.on("leave-room", (roomId, socketId) => {
	const participants = getRoomParticipantsByRoomId(roomId);
	io.to(roomId).emit("rooms-participants", participants);
});

io.on("connection", connectionEvent);

httpServer.listen(4002);
