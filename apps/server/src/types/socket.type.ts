import { Profile } from "@repo/shared";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type Event = DefaultEventsMap;

export type BaseSocket<T = SocketData> = Socket<Event, Event, Event, T>;

export type ProfileWithAdmin = Profile & { isAdmin: boolean };

type SocketData = {
	profile: ProfileWithAdmin;
	roomId: string;
};

export type SocketProfile = BaseSocket & {
	data: SocketData;
};
