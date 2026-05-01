import { createProductSchema, listProductsSchema, productIdSchema, updateProductSchema } from './../validators/product.validator';
import * as productService from '../services/product.service';
import { RequestHandler } from "express";
import { AppError } from '../utils/apperror';

export const createProduct: RequestHandler = async (req, res) => {
    const data = createProductSchema.parse(req.body);
    const product = await productService.createProduct(data);
    res.status(201).json({ error: null, data: product });
}

export const listProducts: RequestHandler = async (req, res) => {
    const { offset, limit, name } = listProductsSchema.parse(req.query);
    const products = await productService.listProducts(offset, limit, name);
    res.status(200).json({ error: null, data: products });
}

export const getProduct: RequestHandler = async (req, res) => {    
    const { id } = productIdSchema.parse(req.params);
    const product = await productService.getProductByIdWithDetails(id);
    if (!product) throw new AppError('Produto não encontrado!', 404);
    res.status(200).json({ error: null, data: product });
}

export const updateProduct: RequestHandler = async (req, res) => {
    const { id } = productIdSchema.parse(req.params);
    console.log('ID recebido:', req.params.id);
    const data = updateProductSchema.parse(req.body);    
    const updatedProduct = await productService.updateProduct(id, data);
    console.log('Resultado do update:', updatedProduct);
    if (!updatedProduct) throw new AppError('Produto não encontrado!', 404);
    res.status(200).json({ error: null, data: updatedProduct });
}

export const deleteProduct: RequestHandler = async (req, res) => {
    const { id } = productIdSchema.parse(req.params);
    const deletedProduct = await productService.deleteProduct(id);
    if (!deletedProduct) throw new AppError('Produto não encontrado!', 404);
    res.status(200).json({ error: null, data: null });
}