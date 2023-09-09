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
				continue;
			}

			const productBD: productDB =
				await this.productsDatabase.gerProductByCode(
					product.product_code
				);

			if (!productBD) {
				csvCheck.push({
					index: index,
					product_code: '',
					name: '',
					old_price: 0,
					new_price: 0,
					status: CSV_RULES.WRONG_CODE,
				});
				continue;
			}

			const productPackage: productPackageDB[] =
				await this.productsDatabase.getPackageByCode(
					product.product_code
				);

			if (productPackage[0] !== undefined) {
				let isPackPriceValid = true;
				for (const pack of productPackage) {
					const packProducts = input.filter(
						(product) => product.product_code == pack.product_id
					);

					if (!packProducts || packProducts.length === 0) {
						isPackPriceValid = false;
						break;
					}

					let expectedPackPrice: number = 0;
					for await (const packProduct of packProducts) {
						expectedPackPrice += packProduct.new_price * pack.qty;
					}

					if (
						Math.abs(product.new_price - expectedPackPrice) > 0.01
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

	public update = async (input: Products[]): Promise<void> => {
		for (const product of input) {
			await this.productsDatabase.updatePrice(
				product.product_code,
				product.new_price
			);
		}
	};

	public getProducts = async (): Promise<productDB[]> => {
		const response = await this.productsDatabase.getProducts();

		return response;
	};
}
