import './App.css';
import logo from './logo.png';
import { useState, useRef } from 'react';
import axios from 'axios';

function App() {
	const [validProducts, setValidProducts] = useState([]);
	const [products, setProducts] = useState([]);
	const [status, setStatus] = useState(false);
	const fileInputRef = useRef(null);

	const handleFileChange = async (event) => {
		try {
			setProducts([]);
			const file = event.target.files[0];

			if (file) {
				const formData = new FormData();
				formData.append('file', file);

				const response = await axios.post(
					'http://localhost:3003/products/upload',
					formData
				);
				setValidProducts(response.data);
				setStatus(
					validProducts.every((product) => product.status === 'Ok')
				);
				event.target.value = '';
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async () => {
		try {
			const body = {
				products: validProducts.map((product) => ({
					product_code: product.product_code,
					new_price: product.new_price,
				})),
			};

			await axios.put('http://localhost:3003/products/update', body);

			setValidProducts([]);
			setStatus(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleGetProducts = async () => {
		try {
			setValidProducts([]);

			const response = await axios.get(
				'http://localhost:3003/products/products'
			);

			setProducts(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<header>
				<img className="logo" src={logo} alt="logo" />
				<h1>Teste Técnico</h1>
			</header>
			<main>
				<p className="option">Escolha uma das opção abaixo</p>
				<div className="buttons__container">
					<button onClick={() => fileInputRef.current.click()}>
						Validar CSV
					</button>
					<button disabled={!status} onClick={handleUpdate}>
						Atualizar
					</button>
					<button onClick={handleGetProducts}>
						Carregar todos Produtos
					</button>
					<input
						type="file"
						name="file"
						id="file"
						accept=".csv"
						onChange={(e) => handleFileChange(e)}
						style={{ display: 'none' }}
						ref={fileInputRef}
					/>
				</div>
				{validProducts.length > 0 && (
					<table>
						<thead>
							<tr>
								<th>Número</th>
								<th>Código</th>
								<th>Nome</th>
								<th>Preço Antigo</th>
								<th>Novo Preço</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{validProducts.map((product) => {
								return (
									<tr className="dataRow" key={product.index}>
										<td>{product.index + 1}</td>
										<td>{product.product_code}</td>
										<td>{product.name}</td>
										<td>R$ {product.old_price}</td>
										<td>R$ {product.new_price}</td>
										<td
											className={
												product.status === 'Ok'
													? 'Ok'
													: 'notOk'
											}
										>
											{product.status}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
				{products.length > 0 && (
					<table>
						<thead>
							<tr>
								<th>Código</th>
								<th>Nome</th>
								<th>Custo</th>
								<th>Preço Venda</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => {
								return (
									<tr className="dataRow" key={product.code}>
										<td>{product.code}</td>
										<td>{product.name}</td>
										<td>{product.cost_price}</td>
										<td>{product.sales_price}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</main>
		</div>
	);
}

export default App;
