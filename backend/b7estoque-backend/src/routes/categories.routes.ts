import { Router } from "express";
import * as categoryController from '../controllers/category.controller';

const router = Router();

// POST /api/categories - Create a new category
router.post('/', categoryController.createCategory);

// GET /api/categories - List all categories (with includeProductCount flag)
router.get('/', categoryController.listCategories);

// GET /api/categories/:id - Get category by id
router.get('/:id', categoryController.getCategory);

// PUT /api/categories/:id - Update category by id
router.put('/:id', categoryController.updateCategory);

// DELETE /api/categories/:id - Delete category by id
router.delete('/:id', categoryController.deleteCategory);

export default router;