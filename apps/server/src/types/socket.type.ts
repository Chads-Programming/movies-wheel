import { Profile } from "@repo/shared";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type Event = DefaultEventsMap;

export type BaseSocket<T = SocketData> = Socket<Event, Event, Event, T>;

type SocketData = {
	profile: Profile & { isAdmin: boolean };
};

export type SocketProfile = BaseSocket & {
	data: SocketData;
};