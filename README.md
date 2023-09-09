# Teste Shopper - Projeto de Validação e Atualização de Produtos

![localhost_3000_](https://github.com/FelipeG-Almeida/teste-shopper/assets/73674044/82245ad9-fd34-421e-acfa-82e6553df24a)

## Visão Geral

Este projeto é um teste técnico que consiste em uma aplicação web para validar e atualizar informações de produtos com base em um arquivo CSV. Ele foi desenvolvido como parte de um teste técnico,

## Funcionalidades Principais

- **Validação de CSV:** A aplicação permite que você faça o upload de um arquivo CSV contendo informações de produtos para validação.

- **Atualização de Preços:** Após a validação, você pode atualizar os preços dos produtos diretamente a partir da aplicação.

- **Visualização de Produtos:** Você pode visualizar todos os produtos disponíveis no sistema.

## Tecnologias Utilizadas

- **Frontend:** O frontend da aplicação foi desenvolvido em React.js.

- **Backend:** O backend da aplicação utiliza Node.js com Express.js para criar uma API para o frontend. Os dados são armazenados em um banco de dados SQL (MySQL).

- **Banco de Dados:** O banco de dados é utilizado para armazenar informações de produtos, pacotes e outras informações relacionadas.

## Configuração do Projeto

1. Clone o repositório para sua máquina:

   ```bash
   git clone https://github.com/FelipeG-Almeida/teste-shopper.git

2. Navegue até o diretório do projeto:

   ```bash
   cd teste-shopper

3. Instale as dependências do frontend e do backend:

   ```bash
   cd client
   npm install
   
   cd ..
   npm install

4. Configure o banco de dados: Configure as credenciais do banco de dados no arquivo de configuração apropriado.

5. Inicialize o servidor do backend:

   ```bash
   npm run dev

6. Inicialize o servidor do frontend:

   ```bash
   cd client
   npm run start

Acesse a aplicação no seu navegador em http://localhost:3000

## Como Usar

Na página inicial, clique no botão "Validar CSV" para fazer o upload de um arquivo CSV contendo informações de produtos.

Após a validação, a lista de produtos validados será exibida na tabela.

Se desejar atualizar os preços dos produtos, clique no botão "Atualizar". Os preços serão atualizados com base nas informações fornecidas no arquivo CSV.

Você também pode visualizar todos os produtos disponíveis clicando no botão "Carregar todos Produtos".
