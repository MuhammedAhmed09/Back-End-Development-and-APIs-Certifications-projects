import { addMovie, findById, getWatchlist, updateMovie, deleteMovie as removeMovie } from "../utils/db.js";

export const getMovies = (req, res) => {
    const userId = Number(req.params.userId);

    const watchList = getWatchlist(userId);

    return res.status(200).json({ watchList });
}

export const postMovie = (req, res) => {
    const userId = Number(req.params.userId);
    const { title, genre } = req.body;
    
    const user = findById(userId);

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        });
    }
    addMovie(userId, { title, genre });

    const watchList = getWatchlist(userId);

    return res.status(201).json({ watchList });
}

export const putMovie = (req, res) => {
    const userId = Number(req.params.userId);
    const movieId = Number(req.params.movieId);

    const user = findById(userId);

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    const watchList = getWatchlist(userId);

    const movie = watchList.find(movie => movie.id === movieId);

    if (!movie) {
        return res.status(404).json({
            error: "Movie not found in watchlist"
        });
    }

    const updatedMovie = req.body;

    updateMovie(userId, movieId, updatedMovie);
    
    const updatedWatchList = getWatchlist(userId)

    return res.status(200).json({ updatedWatchList });
}

export const deleteMovie = (req, res) => {
    const userId = Number(req.params.userId);
    const movieId = Number(req.params.movieId);

    const user = findById(userId);
    if (!user) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    const watchList = getWatchlist(userId);

    const movie = watchList.find(movie => movie.id === movieId);

    if (!movie) {
        return res.status(404).json({
            error: "Movie not found in watchlist"
        });
    }

    removeMovie(userId, movieId);

    const updatedWatchList = getWatchlist(userId);

    return res.status(200).json({ watchList: updatedWatchList });
}
