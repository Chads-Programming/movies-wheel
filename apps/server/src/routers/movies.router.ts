import { Request, Response, Router } from "express";
import getMovieData from "../utils/movies/get-movies-data";
import axios from "axios";
import getMovies from "../utils/movies/get-movies";

const moviesRouter = Router();

moviesRouter.get("/:movieId", async (req: Request, res: Response) => {
	try {
		const movieId = req.params?.movieId;
		if (!movieId || Number.isNaN(+movieId)) throw new Error("Invalid Movie id");
		const movieData = await getMovieData(+movieId);
		if (!movieData) throw new Error("Movie not found");
		return res.json(movieData);
	} catch (error: any) {
		return res.status(400).send(error.message || "Error");
	}
});

moviesRouter.get("/", async (req: Request, res: Response) => {
	const search = req.query.search as string;
	try {
		const movies = await getMovies(search);
		return res.json({
			results: movies,
		});
	} catch (error) {
		return res.status(400).send("Error while fetching movies");
	}
});

export default moviesRouter;
