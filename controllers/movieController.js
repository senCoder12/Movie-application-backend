import Movie from "../models/movie.model.js";

// Create a new Movie object
export const createNewMovie = async(req, res) => {
    const movie = req.body;
    const newMovie = Movie({...movie});
    try {
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(404).json({message: "Something went wrong"})
    }
}

//Get all the Movie objects
export const getAllMovies = async(req, res) => {
    try {
        const {page} = req.query || 1;
        const limit = 6;
        const total = await Movie.countDocuments({});
        const starIndex = (Number(page)-1 ) * limit;
        const movies = await Movie.find().limit(limit).skip(starIndex);
        res.json({
            data: movies,
            currentPage: Number(page),
            totalMovies: total,
            noOfPages: Math.ceil(total / limit)
        })
    } catch (error) {
        res.status(404).json({message: error})
    }
}

// Get a particular Movie object
export const getMovieById = async(req, res) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findById(id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(404).json({message: "Something went wrong"})
    }
}

// Get a specific Movie object by searching
export function geMoviesBySearch () {
    
}

//Update a specific Movie object
export function updateMovieDetails () {
    
}

//Delete a specific Movie object
export function deleteMovie () {
    
}