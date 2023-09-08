-- Active: 1694129778137@@127.0.0.1@3306@shopper

CREATE TABLE
    products (
        code bigint PRIMARY KEY,
        # CODIGO DO PRODUTO 
        name varchar(100) NOT NULL,
        # NOME DO PRODUTO
        cost_price decimal(9, 2) NOT NULL,
        # CUSTO DO PRODUTO
        sales_price decimal(9, 2) NOT NULL # PRE�O DE VENDA DO PRODUTO
    );

INSERT INTO products
VALUES
    (16, 'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML', 18.44, 20.49),
    (18, 'BEBIDA ENERGÉTICA VIBE 2L', 8.09, 8.99),
    (19, 'ENERGÉTICO  RED BULL ENERGY DRINK 250ML', 6.56, 7.29),
    (20, 'ENERGÉTICO RED BULL ENERGY DRINK 355ML', 9.71, 10.79),
    (21, 'BEBIDA ENERGÉTICA RED BULL RED EDITION 250ML', 10.71, 11.71),
    (22, 'ENERGÉTICO  RED BULL ENERGY DRINK SEM AÇÚCAR 250ML', 6.74, 7.49),
    (23, 'ÁGUA MINERAL BONAFONT SEM GÁS 1,5L', 2.15, 2.39),
    (24, 'FILME DE PVC WYDA 28CMX15M', 3.59, 3.99),
    (26, 'ROLO DE PAPEL ALUMÍNIO WYDA 30CMX7,5M', 5.21, 5.79),
    (1000, 'BEBIDA ENERGÉTICA VIBE 2L - 6 UNIDADES', 48.54, 53.94),
    (1010, 'KIT ROLO DE ALUMÍNIO + FILME PVC WYDA', 8.80, 9.78),
    (1020, 'SUPER PACK RED BULL VARIADOS - 6 UNIDADES', 51.81, 57.00);


CREATE TABLE
    packs (
        id bigint AUTO_INCREMENT PRIMARY KEY,
        # id primario da tabela
        pack_id bigint NOT NULL,
        # id do produto pack 
        product_id bigint NOT NULL,
        # id do produto componente
        qty bigint NOT NULL,
        # quantidade do produto componente no pack
        CONSTRAINT FOREIGN KEY (pack_id) REFERENCES products(code),
        CONSTRAINT FOREIGN KEY (product_id) REFERENCES products(code)
    );

INSERT INTO packs (pack_id, product_id, qty)
VALUES
    (1000, 18, 6),
    (1010, 24, 1),
    (1010, 26, 1),
    (1020, 19, 3),
    (1020, 21, 3);