import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import { productsRouter } from './router/productsRouter';

dotenv.config();
const app = express();

app.use(cors());
app.use(fileUpload())
app.use(express.json());

app.listen(process.env.PORT || 3003, () => {
	console.log('Servidor rodando na porta', 3003);
});

app.use('/products', productsRouter);
