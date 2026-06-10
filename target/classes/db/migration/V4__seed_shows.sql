-- V4__seed_shows.sql
-- Shows reais do São João de Campina Grande 2026

-- ==========================================
-- PARQUE DO POVO (Polo ID: 1)
-- ==========================================

-- 03 de Junho (Quarta-feira) - Abertura
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id, observacoes) VALUES
                                                                                     ('2026-06-03 19:00:00', 80, 1, 4, 'Abertura - Brasas do Forró'),
                                                                                     ('2026-06-03 20:30:00', 80, 1, 3, 'Abertura - Limão com Mel'),
                                                                                     ('2026-06-03 22:00:00', 90, 1, 142, 'Abertura - João Gomes (Projeto Dominguinho)'),
                                                                                     ('2026-06-03 23:40:00', 60, 1, 143, 'Abertura - Mestrinho (Projeto Dominguinho)'),
                                                                                     ('2026-06-04 00:50:00', 60, 1, 144, 'Abertura - Jota.pê (Projeto Dominguinho)'),
                                                                                     ('2026-06-04 02:00:00', 90, 1, 2, 'Abertura - Solange Almeida');

-- 04 de Junho (Quinta-feira)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-04 19:00:00', 75, 1, 8), -- Mikael Santos
                                                                        ('2026-06-04 20:30:00', 75, 1, 7), -- Samya Maia
                                                                        ('2026-06-04 22:00:00', 90, 1, 6), -- Dorgival Dantas
                                                                        ('2026-06-04 23:45:00', 120, 1, 5); -- À Vontade (Raí, Zezo, Luan)

-- 05 de Junho (Sexta-feira)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-05 19:00:00', 75, 1, 12), -- Deanzinho
                                                                        ('2026-06-05 20:30:00', 75, 1, 11), -- Marcynho Sensação
                                                                        ('2026-06-05 22:00:00', 90, 1, 10), -- Eric Land
                                                                        ('2026-06-05 23:45:00', 120, 1, 9); -- Wesley Safadão

-- 06 de Junho (Sábado)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-06 19:00:00', 75, 1, 15), -- Bia Frazzo
                                                                        ('2026-06-06 20:30:00', 75, 1, 16), -- Nathan Vinícius
                                                                        ('2026-06-06 22:00:00', 90, 1, 14), -- Walkyria Santos
                                                                        ('2026-06-06 23:45:00', 120, 1, 13); -- Henrique & Juliano

-- 07 de Junho (Domingo)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-07 19:00:00', 75, 1, 20), -- Gitana Pimentel
                                                                        ('2026-06-07 20:30:00', 75, 1, 18), -- Raphaela Santos
                                                                        ('2026-06-07 22:00:00', 90, 1, 19), -- Tarcísio do Acordeon
                                                                        ('2026-06-07 23:45:00', 120, 1, 17); -- Nattanzinho Lima

-- 09 de Junho (Terça-feira) - Noite Religiosa
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-09 19:00:00', 60, 1, 21), -- Kelly Patrícia
                                                                        ('2026-06-09 20:15:00', 60, 1, 22), -- Ana Clara Rocha
                                                                        ('2026-06-09 21:30:00', 60, 1, 23), -- Ítalo
                                                                        ('2026-06-09 22:45:00', 75, 1, 24); -- Padre Nilson

-- 10 de Junho (Quarta-feira)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-10 19:00:00', 75, 1, 28), -- Matheuzin
                                                                        ('2026-06-10 20:30:00', 75, 1, 26), -- Magníficos
                                                                        ('2026-06-10 22:00:00', 90, 1, 27), -- Matheus Fernandes
                                                                        ('2026-06-10 23:45:00', 90, 1, 25); -- Léo Magalhães

-- 11 de Junho (Quinta-feira)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-11 19:00:00', 75, 1, 32), -- Karkará
                                                                        ('2026-06-11 20:30:00', 75, 1, 31), -- Cavaleiros do Forró
                                                                        ('2026-06-11 22:00:00', 90, 1, 30), -- Jonas Esticado
                                                                        ('2026-06-11 23:45:00', 90, 1, 29); -- Matuê

-- 12 de Junho (Sexta-feira) - Dia dos Namorados
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id, observacoes) VALUES
                                                                                     ('2026-06-12 19:00:00', 75, 1, 35, 'Especial Dia dos Namorados'), -- Tito
                                                                                     ('2026-06-12 20:30:00', 75, 1, 34, 'Especial Dia dos Namorados'), -- Gegê Bismarck
                                                                                     ('2026-06-12 22:00:00', 90, 1, 36, 'Especial Dia dos Namorados'), -- Alexandre Tan
                                                                                     ('2026-06-12 23:45:00', 120, 1, 33, 'Especial Dia dos Namorados - Marisa Monte');

-- 13 de Junho (Sábado)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-13 19:00:00', 75, 1, 40), -- Lipe Lucena
                                                                        ('2026-06-13 20:30:00', 75, 1, 39), -- Ávine Vinny
                                                                        ('2026-06-13 22:00:00', 90, 1, 38), -- Mari Fernandez
                                                                        ('2026-06-13 23:45:00', 120, 1, 37); -- Henry Freitas

-- 14 de Junho (Domingo)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-14 19:00:00', 90, 1, 42), -- Cavalo de Pau
                                                                        ('2026-06-14 20:45:00', 90, 1, 43), -- Juarez
                                                                        ('2026-06-14 22:30:00', 120, 1, 41); -- Roberto Carlos

-- 17 de Junho (Quarta-feira)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-17 19:00:00', 75, 1, 48), -- Léo Foguete
                                                                        ('2026-06-17 20:30:00', 75, 1, 49), -- Michelle Andrade
                                                                        ('2026-06-17 22:00:00', 90, 1, 50), -- Jonny Garotinho
                                                                        ('2026-06-17 23:45:00', 90, 1, 47); -- Menos é Mais

-- 18 de Junho (Quinta-feira)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-18 19:00:00', 75, 1, 54), -- Mexe Ville
                                                                        ('2026-06-18 20:30:00', 75, 1, 53), -- Grelo
                                                                        ('2026-06-18 22:00:00', 90, 1, 52), -- Calcinha Preta
                                                                        ('2026-06-18 23:45:00', 90, 1, 51); -- Matheus & Kauan

-- 19 de Junho (Sexta-feira)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-19 19:00:00', 75, 1, 57), -- Manim Vaqueiro
                                                                        ('2026-06-19 20:30:00', 75, 1, 56), -- Zé Cantor
                                                                        ('2026-06-19 22:00:00', 90, 1, 58), -- Fabiano Guimarães
                                                                        ('2026-06-19 23:45:00', 120, 1, 55); -- Iguinho e Lulinha

-- 20 de Junho (Sábado)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-20 19:00:00', 75, 1, 62), -- Bob Léo
                                                                        ('2026-06-20 20:30:00', 75, 1, 61), -- Ton Oliveira
                                                                        ('2026-06-20 22:00:00', 90, 1, 60), -- Garota Safada
                                                                        ('2026-06-20 23:45:00', 120, 1, 59); -- Fagner

-- 21 de Junho (Domingo)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-21 19:00:00', 75, 1, 63), -- Fernandinha
                                                                        ('2026-06-21 20:30:00', 75, 1, 64), -- Samyra Show
                                                                        ('2026-06-21 22:00:00', 90, 1, 66), -- Raphael Moura
                                                                        ('2026-06-21 23:45:00', 120, 1, 65); -- Amazan

-- 22 de Junho (Segunda-feira)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-22 19:00:00', 75, 1, 67), -- Amanda Rainha da Farra
                                                                        ('2026-06-22 20:30:00', 75, 1, 68), -- Eliane
                                                                        ('2026-06-22 22:00:00', 90, 1, 69), -- Os 3 do Nordeste
                                                                        ('2026-06-22 23:45:00', 120, 1, 145); -- Lauana Prado

-- 23 de Junho (Terça-feira) - Véspera de São João
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id, observacoes) VALUES
                                                                                     ('2026-06-23 19:00:00', 75, 1, 73, 'Véspera de São João'), -- Capilé
                                                                                     ('2026-06-23 20:30:00', 75, 1, 72, 'Véspera de São João'), -- Lucy Alves
                                                                                     ('2026-06-23 22:00:00', 90, 1, 71, 'Véspera de São João'), -- Guilherme Dantas
                                                                                     ('2026-06-23 23:45:00', 120, 1, 70, 'Véspera de São João - Elba Ramalho');

-- 24 de Junho (Quarta-feira) - Dia de São João
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id, observacoes) VALUES
                                                                                     ('2026-06-24 20:30:00', 90, 1, 75, 'Dia de São João'), -- José Augusto
                                                                                     ('2026-06-24 22:15:00', 120, 1, 146, 'Dia de São João'); -- Murilo Huff


-- ==========================================
-- VILA SÍTIO SÃO JOÃO (Polo ID: 2)
-- ==========================================

-- 06 de Junho (Sábado)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-06 15:00:00', 120, 2, 68),  -- Eliane
                                                                        ('2026-06-06 17:30:00', 120, 2, 6),   -- Dorgival Dantas
                                                                        ('2026-06-06 20:00:00', 120, 2, 127); -- Kátia Cilene e Aduílio Mendes

-- 07 de Junho (Domingo)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-07 15:00:00', 120, 2, 128), -- Desejo de Menina
                                                                        ('2026-06-07 17:30:00', 120, 2, 147), -- Silvânia e Berg
                                                                        ('2026-06-07 20:00:00', 120, 2, 7);   -- Samya Maia

-- 13 de Junho (Sábado)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-13 15:00:00', 120, 2, 129), -- Luan Estilizado
                                                                        ('2026-06-13 17:30:00', 120, 2, 118), -- Flávio José
                                                                        ('2026-06-13 20:00:00', 120, 2, 130); -- Lara Amélia

-- 14 de Junho (Domingo)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-14 15:00:00', 120, 2, 92),  -- Mara Pavanelly
                                                                        ('2026-06-14 17:30:00', 120, 2, 18),  -- Raphaela Santos
                                                                        ('2026-06-14 20:00:00', 120, 2, 76);  -- Waldonys

-- 20 de Junho (Sábado)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-20 14:00:00', 90, 2, 131),  -- Assum Preto
                                                                        ('2026-06-20 16:00:00', 90, 2, 110),  -- Toca do Vale
                                                                        ('2026-06-20 18:00:00', 90, 2, 74),   -- Vicente Nery
                                                                        ('2026-06-20 20:00:00', 90, 2, 77);   -- Fabiana Souto

-- 21 de Junho (Domingo)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-21 14:00:00', 90, 2, 56),   -- Zé Cantor
                                                                        ('2026-06-21 16:00:00', 90, 2, 42),   -- Cavalo de Pau
                                                                        ('2026-06-21 18:00:00', 90, 2, 132),  -- Jorge de Altinho
                                                                        ('2026-06-21 20:00:00', 90, 2, 65);   -- Amazan

-- 23 de Junho (Terça-feira)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-23 15:00:00', 120, 2, 133), -- Verônica Ryos e Banda
                                                                        ('2026-06-23 17:30:00', 120, 2, 134), -- Jeito Nordestino
                                                                        ('2026-06-23 20:00:00', 120, 2, 135); -- Forró Campina

-- 24 de Junho (Quarta-feira)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-24 16:00:00', 120, 2, 136), -- Juzé
                                                                        ('2026-06-24 19:00:00', 120, 2, 137); -- Assisão

-- 27 de Junho (Sábado)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-27 14:00:00', 90, 2, 70),   -- Elba Ramalho
                                                                        ('2026-06-27 16:00:00', 90, 2, 61),   -- Ton Oliveira
                                                                        ('2026-06-27 18:00:00', 90, 2, 117),  -- Rey Vaqueiro
                                                                        ('2026-06-27 20:00:00', 90, 2, 28);   -- Matheuzin

-- 28 de Junho (Domingo)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-28 14:00:00', 90, 2, 14),   -- Walkyria Santos
                                                                        ('2026-06-28 16:00:00', 90, 2, 108),  -- Taty Girl
                                                                        ('2026-06-28 18:00:00', 90, 2, 138),  -- Tropykália
                                                                        ('2026-06-28 20:00:00', 90, 2, 139);  -- Donas da Farra

-- 04 de Julho (Sábado)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-07-04 15:00:00', 120, 2, 106), -- Mastruz com Leite
                                                                        ('2026-07-04 17:30:00', 120, 2, 140), -- Batista Lima
                                                                        ('2026-07-04 20:00:00', 120, 2, 4);   -- Brasas do Forró

-- 05 de Julho (Domingo)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-07-05 15:00:00', 120, 2, 141), -- Santanna
                                                                        ('2026-07-05 17:30:00', 120, 2, 2),   -- Solange Almeida
                                                                        ('2026-07-05 20:00:00', 120, 2, 85);  -- Raniery Gomes


-- ==========================================
-- GALANTE (Polo ID: 8)
-- ==========================================

-- 06 de Junho (Sábado)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-06 10:00:00', 120, 8, 16),  -- Nathan Vinícius
                                                                        ('2026-06-06 12:30:00', 120, 8, 120), -- Sirano e Sirino
                                                                        ('2026-06-06 15:00:00', 120, 8, 34);  -- Gegê Bismarck

-- 07 de Junho (Domingo)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-07 10:00:00', 120, 8, 32),  -- Karkará
                                                                        ('2026-06-07 12:30:00', 120, 8, 69),  -- Os 3 do Nordeste
                                                                        ('2026-06-07 15:00:00', 120, 8, 65);  -- Amazan

-- 13 de Junho (Sábado)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-13 10:00:00', 120, 8, 50),  -- Jonny Garotinho
                                                                        ('2026-06-13 12:30:00', 120, 8, 103), -- Forró Pegado
                                                                        ('2026-06-13 15:00:00', 120, 8, 121); -- J Show e Chapéu Palha

-- 14 de Junho (Domingo)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-14 10:00:00', 120, 8, 107), -- Matheus Felipe
                                                                        ('2026-06-14 12:30:00', 120, 8, 91),  -- Japãozin
                                                                        ('2026-06-14 15:00:00', 120, 8, 95);  -- Bonde do Brasil

-- 20 de Junho (Sábado)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-20 10:00:00', 120, 8, 54),  -- Mexe Ville
                                                                        ('2026-06-20 12:30:00', 120, 8, 7),   -- Samya Maia
                                                                        ('2026-06-20 15:00:00', 120, 8, 73);  -- Capilé

-- 21 de Junho (Domingo)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-21 10:00:00', 120, 8, 93),  -- Nicácia Brasil
                                                                        ('2026-06-21 12:30:00', 120, 8, 122), -- Forró Medonho
                                                                        ('2026-06-21 15:00:00', 120, 8, 123); -- Ferro na Boneca

-- 27 de Junho (Sábado)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-27 10:00:00', 120, 8, 58),  -- Fabiano Guimarães
                                                                        ('2026-06-27 12:30:00', 120, 8, 4),   -- Brasas do Forró
                                                                        ('2026-06-27 15:00:00', 120, 8, 43);  -- Juarez

-- 28 de Junho (Domingo)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-06-28 10:00:00', 120, 8, 28),  -- Matheuzin
                                                                        ('2026-06-28 12:30:00', 120, 8, 124), -- Collo de Menina
                                                                        ('2026-06-28 15:00:00', 120, 8, 12);  -- Deanzinho

-- 04 de Julho (Sábado)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-07-04 10:00:00', 80,  8, 89),  -- Stella Alves
                                                                        ('2026-07-04 11:50:00', 80,  8, 125), -- Kally Silva
                                                                        ('2026-07-04 13:40:00', 80,  8, 85),  -- Ranniery Gomes
                                                                        ('2026-07-04 15:30:00', 90,  8, 126); -- Saulo Farra

-- 05 de Julho (Domingo)
INSERT INTO shows (data_hora, duracao_minutos, polo_id, artista_id) VALUES
                                                                        ('2026-07-05 10:00:00', 120, 8, 81),  -- Jefferson Arretado (Jeferson Arretado)
                                                                        ('2026-07-05 12:30:00', 120, 8, 61),  -- Ton Oliveira
                                                                        ('2026-07-05 15:00:00', 120, 8, 62);  -- Bob Léo
