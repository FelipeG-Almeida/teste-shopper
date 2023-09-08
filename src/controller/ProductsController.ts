import { Request, Response } from 'express';
import { BadRequestError } from '../errors/BadRequestError';
import fileUpload from 'express-fileupload';
import { ProductsBusiness } from '../business/ProductsBusiness';
import { BaseError } from '../errors/BaseError';
import { Products } from '../models/Products';

export class ProductsController {
	constructor(private productsBusiness: ProductsBusiness) {}

	public checkCSV = async (req: Request, res: Response) => {
		try {
			if (!req.files || !req.files.file) {
				throw new BadRequestError('Arquivo CSV não enviado');
			}

			const csvFile = req.files.file as fileUpload.UploadedFile;
			const csvData = csvFile.data.toString('utf-8');

			const results: Products[] = [];

			csvData
				.trim()
				.split('\n')
				.slice(1)
				.forEach((line) => {
					const [product_code, new_price] = line.split(',');
					const newPrice = parseFloat(new_price);
					results.push({ product_code, new_price: newPrice });
				});

			const output = await this.productsBusiness.checkCSV(results);

			res.status(201).send(output);
		} catch (error) {
			console.log(error);

			if (error instanceof BaseError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(500).send('Erro inesperado');
			}
		}
	};
}
