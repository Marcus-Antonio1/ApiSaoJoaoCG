-- V4__seed_shows.sql
-- Shows reais do São João de Campina Grande 2025
-- Parque do Povo = polo_id 1 | Vila Sítio São João = polo_id 2
-- Vila do Artesão = polo_id 3 | Vila Forró = polo_id 4
-- Trem do Forró = polo_id 5 | Arraiá de Cumpade = polo_id 6 | Campestre = polo_id 7

-- Artistas: Luan Santana=1, Walkyria Santos=2, Raphael Moura=3, João Gomes=4,
-- Wesley Safadão=5, Dorgival Dantas=6, Xand Avião=7, Natanzinho Lima=8,
-- Taty Girl=9, Santanna=10, Flávio José=11, Elba Ramalho=12, Alceu Valença=13,
-- Geraldo Azevedo=14, Alok=15, Matuê=16, Leonardo=17, Jorge e Mateus=18,
-- Priscila Senna=19, Forró Pegado=20, Solange Almeida=21, Léo Foguete=22,
-- Rey Vaqueiro=23, Nathan Vinícius=24, Bismarck Carcará=25, Kadu Martins=26,
-- Waldonys=27, Gegê=28, Filipe Santos=29

-- ABERTURA: 30 de maio (sexta)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
('2025-05-30 22:00:00', 90,  1, 1),   -- Luan Santana - Parque do Povo
('2025-05-30 20:30:00', 60,  1, 2),   -- Walkyria Santos - Parque do Povo
('2025-05-30 19:00:00', 60,  1, 3);   -- Raphael Moura - Parque do Povo

-- 01 de junho (domingo)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
('2025-06-01 22:00:00', 90,  1, 4),   -- João Gomes - Parque do Povo
('2025-06-01 20:30:00', 60,  1, 26),  -- Kadu Martins - Parque do Povo
('2025-06-01 19:00:00', 60,  1, 29);  -- Filipe Santos - Parque do Povo

-- 06 de junho (sexta)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
('2025-06-06 22:00:00', 100, 1, 5),   -- Wesley Safadão - Parque do Povo
('2025-06-06 20:30:00', 60,  1, 6),   -- Dorgival Dantas - Parque do Povo
('2025-06-06 19:00:00', 60,  1, 23),  -- Rey Vaqueiro - Parque do Povo
('2025-06-06 18:00:00', 50,  1, 24);  -- Nathan Vinícius - Parque do Povo

-- 07 de junho (sábado)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
('2025-06-07 22:00:00', 90,  1, 7),   -- Xand Avião - Parque do Povo
('2025-06-07 20:30:00', 60,  1, 22),  -- Léo Foguete - Parque do Povo
('2025-06-07 19:00:00', 60,  1, 28),  -- Gegê - Parque do Povo
('2025-06-07 18:00:00', 50,  1, 25);  -- Bismarck Carcará - Parque do Povo

-- 08 de junho (domingo)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
('2025-06-08 22:00:00', 90,  1, 8),   -- Natanzinho Lima - Parque do Povo
('2025-06-08 20:30:00', 75,  1, 9),   -- Taty Girl - Parque do Povo
('2025-06-08 19:00:00', 60,  1, 20),  -- Forró Pegado - Parque do Povo
('2025-06-08 18:00:00', 60,  1, 10);  -- Santanna, O Cantador - Parque do Povo

-- 12 de junho - Dia dos Namorados (quinta)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id, observacoes) VALUES
('2025-06-12 22:00:00', 100, 1, 17, 'Show especial de Dia dos Namorados'),  -- Leonardo
('2025-06-12 20:00:00', 60,  1, 11, 'Flávio José - Dia dos Namorados');     -- Flávio José

-- 13 de junho - Dia de Santo Antônio (sexta)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id, observacoes) VALUES
('2025-06-13 22:00:00', 90,  1, 13,  'Dia de Santo Antônio'),  -- Alceu Valença
('2025-06-13 20:30:00', 75,  1, 14,  'Dia de Santo Antônio');  -- Geraldo Azevedo

-- 14 de junho (sábado)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
('2025-06-14 22:00:00', 90,  1, 16),  -- Matuê - Parque do Povo
('2025-06-14 20:30:00', 75,  1, 15);  -- Alok - Parque do Povo

-- 20 de junho (sexta)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
('2025-06-20 22:00:00', 90,  1, 18),  -- Jorge e Mateus - Parque do Povo
('2025-06-20 20:30:00', 75,  1, 19);  -- Priscila Senna - Parque do Povo

-- 23 de junho - Véspera de São João (segunda)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id, observacoes) VALUES
('2025-06-23 22:00:00', 100, 1, 12, 'Véspera de São João - noite mais esperada da festa'), -- Elba Ramalho
('2025-06-23 20:30:00', 75,  1, 13, 'Véspera de São João'),  -- Alceu Valença
('2025-06-23 19:00:00', 60,  1, 11, 'Véspera de São João');  -- Flávio José

-- 24 de junho - Dia de São João (terça)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id, observacoes) VALUES
('2025-06-24 22:00:00', 100, 1, 5, 'Dia de São João'),   -- Wesley Safadão
('2025-06-24 20:30:00', 75,  1, 7, 'Dia de São João'),   -- Xand Avião
('2025-06-24 19:00:00', 60,  1, 6, 'Dia de São João');   -- Dorgival Dantas

-- Vila Sítio São João (fins de semana de junho)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
('2025-06-07 21:00:00', 90,  2, 12),  -- Elba Ramalho - Vila Sítio
('2025-06-08 21:00:00', 90,  2, 11),  -- Flávio José - Vila Sítio
('2025-06-14 21:00:00', 90,  2, 13),  -- Alceu Valença - Vila Sítio
('2025-06-15 21:00:00', 90,  2, 14),  -- Geraldo Azevedo - Vila Sítio
('2025-06-21 21:00:00', 90,  2, 6),   -- Dorgival Dantas - Vila Sítio
('2025-06-22 21:00:00', 90,  2, 21),  -- Solange Almeida - Vila Sítio
('2025-06-27 21:00:00', 90,  2, 27),  -- Waldonys - Vila Sítio
('2025-06-28 21:00:00', 90,  2, 10);  -- Santanna, O Cantador - Vila Sítio

-- Campestre (datas específicas)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
('2025-05-31 21:00:00', 90,  7, 10),  -- Santanna - Campestre
('2025-06-14 21:00:00', 90,  7, 27),  -- Waldonys - Campestre
('2025-06-18 21:00:00', 90,  7, 2);   -- Walkyria Santos - Campestre

-- Arraiá de Cumpade
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
('2025-06-06 20:00:00', 90,  6, 11),  -- Flávio José - Arraiá de Cumpade
('2025-06-13 20:00:00', 90,  6, 8),   -- Natanzinho Lima - Arraiá de Cumpade
('2025-06-20 20:00:00', 90,  6, 19);  -- Priscila Senna - Arraiá de Cumpade
