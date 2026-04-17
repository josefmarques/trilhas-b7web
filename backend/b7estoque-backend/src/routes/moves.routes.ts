import { Router } from "express";
import * as moveController from '../controllers/move.controller';

const router = Router();

// POST /api/moves - Create new move
router.post('/', moveController.addMove);

// GET /api/moves - List all moves (with pagination)
router.get('/', moveController.listMoves);

export default router;