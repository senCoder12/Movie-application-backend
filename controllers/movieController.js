import mongoose from "mongoose";
import Movie from "../models/movie.model.js";

// Create a new Movie object
export const createNewMovie = async(req, res) => {
    const movie = req.body;
    const newMovie = Movie({...movie});
    try {
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({message: error.message});  //64e9a8d63080570e5e462742
    }
}

//Get all the Movie objects
export const getAllMovies = async(req, res) => {
    try {
        const {page} = req.query;
        const limit = 6;
        const total = await Movie.countDocuments({});
        const starIndex = (Number(page)-1 ) * limit;
        const movies = await Movie.find().limit(limit).skip(starIndex);
        res.json({
            data: movies,
            currentPage: Number(page) || 1,
            totalMovies: total,
            noOfPages: Math.ceil(total / limit)
        })
    } catch (error) {
        res.status(500).json({message: error})
    }
}

// Get a particular Movie object
export const getMovieById = async(req, res) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findById(id);
        if(!movie) {
            return res.status(404).send({message: 'Movie not found'});
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({message: "Something went wrong !!!"});
    }
}

// Get a specific Movie object by searching
export const geMoviesBySearch = async(req, res) =>{
    const {searchQuery} = req.query;
    try {
        const title = new RegExp(searchQuery,"i");
        const movies = await Movie.find({title})
        const total = movies.length;
        const limit = 6;
        return res.status(200).json({
            data:movies,
            noOfPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
}

//Update a specific Movie object
export const updateMovieDetails =  async(req, res) => {
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: "User does not exist"});
        }
        const updatedData = {
            ...req.body,_id: id
        }
        await Movie.findByIdAndUpdate(id,updatedData,{new: true});
        return res.status(200).json(updatedData);   
    } catch (error) {
        return res.status(500).json({message: error.message});  
    }
}

//Delete a specific Movie object
export const deleteMovie = async(req, res) =>{
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: "User does not exist"});
        }
        await Movie.findByIdAndRemove(id);
        return res.status(200).json({message: "Movie has been deleted !!"});   
    } catch (error) {
        return res.status(500).json({message: "Something went wrong !!"});  
    }
}