import express from 'express';
import { ProductsController } from '../controller/ProductsController';
import { ProductsBusiness } from '../business/ProductsBusiness';
import { ProductsDatabase } from '../database/ProductsDatabase';

export const productsRouter = express.Router();

const productsController = new ProductsController(
	new ProductsBusiness(new ProductsDatabase())
);

productsRouter.post('/upload', productsController.checkCSV);
productsRouter.put('/update', productsController.update);
productsRouter.get('/products', productsController.getProducts)
