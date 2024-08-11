import { Profile } from "@repo/shared";
import { SocketProfile } from "../types/socket.type";
import { io } from "../app";

export const getSocket = (socketId: string): SocketProfile | undefined =>
	io.sockets.sockets.get(socketId) as SocketProfile | undefined;

const addProfileToSocket = (
	socketId: string,
	profile: Profile,
	isAdmin: boolean = false,
): SocketProfile => {
	const socket = getSocket(socketId)!;
	socket.data["profile"] = { ...profile, isAdmin };

	return socketId as unknown as SocketProfile;
};

type ProfileParams = Parameters<typeof addProfileToSocket>;
type ProfileParamsWithoutIsAdmin = [ProfileParams[0], ProfileParams[1]];

export const addAdmin = (...args: ProfileParamsWithoutIsAdmin) =>
	addProfileToSocket(...args, true);

export const addProfile = (...args: ProfileParamsWithoutIsAdmin) =>
	addProfileToSocket(...args);
