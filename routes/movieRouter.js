import express from "express";
import { createNewMovie, deleteMovie, geMoviesBySearch, getAllMovies, getMovieById, updateMovieDetails } from "../controllers/movieController.js";

const movieRouter = express.Router();

movieRouter.post("/", createNewMovie);

movieRouter.get("/all", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.get("/search", geMoviesBySearch);

movieRouter.put("/:id", updateMovieDetails);
movieRouter.delete("/:id", deleteMovie);

export default movieRouter;