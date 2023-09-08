import { ProductsDatabase } from '../database/ProductsDatabase';
import {
	CSVCheck,
	CSV_RULES,
	Products,
	productDB,
	productPackageDB,
} from '../models/Products';

export class ProductsBusiness {
	constructor(private productsDatabase: ProductsDatabase) {}

	public checkCSV = async (input: Products[]): Promise<CSVCheck[]> => {
		const csvCheck: CSVCheck[] = [];

		for (const [index, product] of input.entries()) {
			if (product.product_code == null || '') {
				csvCheck.push({
					index: index,
					product_code: '',
					name: '',
					old_price: 0,
					new_price: 0,
					status: CSV_RULES.WRONG_CODE,
				});
			}

			const productBD: productDB =
				await this.productsDatabase.gerProductByCode(
					product.product_code
				);

			const productPackage: productPackageDB[] = [
				await this.productsDatabase.getPackageByCode(
					product.product_code
				),
			];

			if (!productBD) {
				csvCheck.push({
					index: index,
					product_code: '',
					name: '',
					old_price: 0,
					new_price: 0,
					status: CSV_RULES.WRONG_CODE,
				});
			} else if (typeof product.new_price !== 'number') {
				csvCheck.push({
					index: index,
					product_code: product.product_code,
					name: productBD.name,
					old_price: productBD.sales_price,
					new_price: 0,
					status: CSV_RULES.WRONG_PRICE,
				});
			} else if (product.new_price < productBD.cost_price) {
				csvCheck.push({
					index: index,
					product_code: product.product_code,
					name: productBD.name,
					old_price: productBD.sales_price,
					new_price: product.new_price,
					status: CSV_RULES.LOW_COST_PRICE,
				});
			} else if (
				product.new_price > productBD.sales_price * 1.1 ||
				product.new_price < productBD.sales_price * 0.9
			) {
				csvCheck.push({
					index: index,
					product_code: product.product_code,
					name: productBD.name,
					old_price: productBD.sales_price,
					new_price: product.new_price,
					status: CSV_RULES.MAX_ADJUST_PRICE,
				});
			} else if (productPackage[0] !== undefined) {
				for (const pack of productPackage) {
					const packProducts = input.filter(
						(product) => product.product_code == pack.product_id
					);
					if (!packProducts || packProducts.length === 0) {
						csvCheck.push({
							index: index,
							product_code: product.product_code,
							name: productBD.name,
							old_price: productBD.sales_price,
							new_price: product.new_price,
							status: CSV_RULES.WRONG_PACK,
						});
					} else {
						let isPackPriceValid = true;
						for (const packProduct of packProducts) {
							const expectedPrice =
								packProduct.new_price * pack.qty;
							if (
								Math.abs(product.new_price - expectedPrice) >
								0.01
							) {
								isPackPriceValid = false;
								break;
							}
						}

						if (!isPackPriceValid) {
							csvCheck.push({
								index: index,
								product_code: product.product_code,
								name: productBD.name,
								old_price: productBD.sales_price,
								new_price: product.new_price,
								status: CSV_RULES.WRONG_PACK_PRICE,
							});
						} else {
							csvCheck.push({
								index: index,
								product_code: product.product_code,
								name: productBD.name,
								old_price: productBD.sales_price,
								new_price: product.new_price,
								status: CSV_RULES.OK,
							});
						}
					}
				}
			} else {
				csvCheck.push({
					index: index,
					product_code: product.product_code,
					name: productBD.name,
					old_price: productBD.sales_price,
					new_price: product.new_price,
					status: CSV_RULES.OK,
				});
			}
		}

		return csvCheck;
	};
}
