import { io } from "../app";
import { PickMovieDto } from "../dtos/pick-movie.dto";
import getMovieData from "../utils/movies/get-movies-data";
import { getRoomParticipantsByRoomId } from "../utils/rooms";
import { modifySocketData } from "../utils/socket";

export default async function MoviePickeEvent(
	socketId: string,
	roomId: string,
	data: unknown,
	response: (x: any) => void,
) {
	try {
		const movie = PickMovieDto.parse(data);
		const movieData = await getMovieData(movie.id);
		if (!movieData) return null;
		modifySocketData(socketId, {
			movie: {
				id: movieData.id,
				title: movieData.title,
				desc: movieData.overview,
				thumbnail: movieData.poster_path,
				rating: movieData.vote_average,
				duration: movieData.runtime,
			},
		});
		const participants = getRoomParticipantsByRoomId(roomId);

		io.to(roomId).emit("rooms-participants", participants);

		return response({
			data: movie,
		});
	} catch (error) {
		console.log(error);
		response({
			error: true,
			errorMsg: "Movie Parse Error",
			data: null,
		});
	}
}
