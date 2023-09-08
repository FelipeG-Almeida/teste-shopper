import './App.css';
import logo from './logo.png';
import { useState, useRef } from 'react';

function App() {
	const [selectedFile, setSelectedFile] = useState(null);
	const fileInputRef = useRef(null);

	const handleFileChange = (event) => {
		const file = event.target.files[0];

		if (file && file.type === 'text/csv') {
			// Faça algo com o arquivo CSV selecionado, por exemplo, carregue-o ou processe-o.
			console.log('Arquivo CSV selecionado:', file.name);
			setSelectedFile(file);
		} else {
			alert('Por favor, selecione um arquivo CSV válido.');
		}
	};

	return (
		<div>
			<header>
				<img className="logo" src={logo} />
				<h1>Teste Técnico</h1>
			</header>
			<main>
				<p className="option">Escolha uma das opção abaixo</p>
				<div className="buttons__container">
					<button onClick={() => fileInputRef.current.click()}>
						Validar CSV
					</button>
					<button>Atualizar</button>
					<button>Carregar todos Produtos</button>
					<input
						type="file"
						accept=".csv"
						onChange={handleFileChange}
						style={{ display: 'none' }}
						ref={fileInputRef}
					/>
				</div>
			</main>
		</div>
	);
}

export default App;
