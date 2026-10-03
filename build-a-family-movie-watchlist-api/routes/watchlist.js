import express from 'express';
import { authorizeModification } from '../middleware/authorize.js';
import { 
    deleteMovie, 
    getMovies, 
    postMovie, 
    putMovie 
} from '../controllers/watchlist.js';

import { authenticate } from '../middleware/authenticate.js'

const router = express.Router();

router.get('/:userId', getMovies);

router.post('/:userId/movies', authenticate, authorizeModification, postMovie);

router.put('/:userId/movies/:movieId', authenticate, authorizeModification, putMovie);

router.delete('/:userId/movies/:movieId', authenticate, authorizeModification, deleteMovie);

export default router;