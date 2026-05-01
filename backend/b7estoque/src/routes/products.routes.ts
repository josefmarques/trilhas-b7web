import { Router } from "express";
import * as productController from '../controllers/product.controller';

const router = Router();

// POST /api/products - Create a new product
router.post('/', productController.createProduct);

// GET /api/products - List products (pagination & name search)
router.get('/', productController.listProducts);

// GET /api/products/:id - Get productl by id
router.get('/:id', productController.getProduct);

// PUT /api/products/:id - Update product by id
router.put('/:id', productController.updateProduct)

// DELETE /api/products/:id - Delete product by id
router.delete('/:id', productController.deleteProduct)

export default router;