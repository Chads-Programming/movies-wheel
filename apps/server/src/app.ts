import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import wheelsRouter from "./routers/wheels.controller";
import { getSocket } from "./utils/socket";
import { connectionEvent } from "./events/connection.event";

const app = express();

app.use(
	cors({
		origin: "*",
	}),
);

app.use(bodyParser.json());

app.use("/wheels", wheelsRouter);

const httpServer = createServer(app);

export const io = new Server(httpServer, {
	cors: {
		origin: "*",
	},
});

export const adapter = io.of("").adapter;
export const rooms = adapter.rooms;

adapter.on("join-room", (roomId, socketId) => {
	const socket = getSocket(socketId);

});

io.on("connection", connectionEvent);

httpServer.listen(4002);
