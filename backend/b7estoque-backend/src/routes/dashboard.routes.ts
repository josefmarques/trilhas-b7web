import { Router } from "express";
import * as dashboardController from '../controllers/dashboard.controller';

const router = Router();

// GET /api/dashboard/inventory-value - Get total inventory value
router.get('/inventory-value', dashboardController.getInventoryValue);

// GET /api/dashboard/moves-summary - Get total/count of in and out moves (in given period)
router.get('/moves-summary', dashboardController.getMovesSummary);

// GET /api/dashboard/moves-graph - Get data for dashboard graph (OUT moves only)
router.get('/moves-graph', dashboardController.getMovesGraph);

// GET /api/dashboard/low-stock - Get products with low inventory
router.get('/low-stock', dashboardController.getLowStockProducts);

// GET /api/dashboard/stagnant-products - Get products that haven't had OUT moves in a given period.
router.get('/stagnant-products', dashboardController.getStagnantProducts);

export default router;