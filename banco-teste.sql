-- USUÁRIOS
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome_usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW()
);

-- CATEGORIAS
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

-- DESENVOLVEDORES
CREATE TABLE desenvolvedores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    pais VARCHAR(50)
);

-- JOGOS
CREATE TABLE jogos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    ano_lancamento INT,
    preco DECIMAL(10, 2),
    categoria_id INT REFERENCES categorias(id),
    desenvolvedor_id INT REFERENCES desenvolvedores(id),
    criado_em TIMESTAMP DEFAULT NOW()
);

-- PLATAFORMAS
CREATE TABLE plataformas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

-- JOGO ⇄ PLATAFORMA (N:M)
CREATE TABLE jogos_plataformas (
    jogo_id INT REFERENCES jogos(id),
    plataforma_id INT REFERENCES plataformas(id),
    PRIMARY KEY (jogo_id, plataforma_id)
);

-- AVALIAÇÕES
CREATE TABLE avaliacoes (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    jogo_id INT REFERENCES jogos(id),
    nota INT CHECK (nota BETWEEN 1 AND 5),
    comentario TEXT,
    criado_em TIMESTAMP DEFAULT NOW()
);

-- PEDIDOS
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    total DECIMAL(10, 2),
    criado_em TIMESTAMP DEFAULT NOW()
);

-- ITENS DO PEDIDO
CREATE TABLE pedido_itens (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES pedidos(id),
    jogo_id INT REFERENCES jogos(id),
    quantidade INT DEFAULT 1
);
-- USUÁRIOS
INSERT INTO usuarios (nome_usuario, email, senha) VALUES
('talys_dev', 'talys@email.com', '123456'),
('gamer_ana', 'ana@email.com', 'senha123');

-- CATEGORIAS
INSERT INTO categorias (nome) VALUES
('RPG'), ('Ação'), ('Esporte');

-- DESENVOLVEDORES
INSERT INTO desenvolvedores (nome, pais) VALUES
('CD Projekt Red', 'Polônia'),
('EA Sports', 'EUA');

-- PLATAFORMAS
INSERT INTO plataformas (nome) VALUES
('PC'), ('PS5'), ('Xbox Series');

-- JOGOS
INSERT INTO jogos (titulo, descricao, ano_lancamento, preco, categoria_id, desenvolvedor_id) VALUES
('The Witcher 3', 'RPG de mundo aberto', 2015, 149.99, 1, 1),
('FIFA 24', 'Simulador de futebol', 2024, 249.99, 3, 2);

-- JOGO ⇄ PLATAFORMA
INSERT INTO jogos_plataformas (jogo_id, plataforma_id) VALUES
(1, 1), (1, 2),
(2, 2), (2, 3);

-- AVALIAÇÕES
INSERT INTO avaliacoes (usuario_id, jogo_id, nota, comentario) VALUES
(1, 1, 5, 'Melhor jogo da vida'),
(2, 2, 4, 'Muito bom, mas repetitivo');

-- PEDIDOS
INSERT INTO pedidos (usuario_id, total) VALUES
(1, 399.98), (2, 249.99);

-- ITENS DO PEDIDO
INSERT INTO pedido_itens (pedido_id, jogo_id, quantidade) VALUES
(1, 1, 1),
(1, 2, 1),
(2, 2, 1);
