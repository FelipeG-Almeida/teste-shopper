export interface Products {
	product_code: string;
	new_price: number;
}

export interface CSVCheck {
	index: number;
	product_code: string;
	name: string;
	old_price: number;
	new_price: number;
	status: string;
}

export interface productDB {
	code: string;
	name: string;
	cost_price: number;
	sales_price: number;
}

export interface productPackageDB {
	id: string;
	pack_id: string;
	product_id: string;
	qty: number;
}

export enum CSV_RULES {
	WRONG_CODE = 'Código do produto inexistente',
	WRONG_PRICE = 'O preço informado é inválido',
	LOW_COST_PRICE = 'O preço informado está abaixo do custo do produto',
	MAX_ADJUST_PRICE = 'O preço informado está acima do limite de 10%',
	WRONG_PACK = 'Algum Produto do pacote é inválido',
	WRONG_PACK_PRICE = 'Algum produco do pacote está com preço diferente da unidade',
	OK = 'Ok',
}
