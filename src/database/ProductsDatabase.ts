import { productDB, productPackageDB } from '../models/Products';
import { BaseDataBase } from './BaseDatabase';

export class ProductsDatabase extends BaseDataBase {
	public static TABLE_PRODUCTS = 'products';
	public static TABLE_PACKS = 'packs';

	public async gerProductByCode(code: string): Promise<productDB> {
		const [productDB]: productDB[] = await BaseDataBase.connection(
			ProductsDatabase.TABLE_PRODUCTS
		).where({ code });
		return productDB;
	}

	public async getPackageByCode(code: string): Promise<productPackageDB> {
		const [packageDB]: productPackageDB[] = await BaseDataBase.connection(
			ProductsDatabase.TABLE_PACKS
		).where('pack_id', '=', code);
		return packageDB;
	}
}
