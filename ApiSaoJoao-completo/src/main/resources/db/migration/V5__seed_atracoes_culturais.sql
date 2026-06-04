-- V5__seed_atracoes_culturais.sql
-- Atrações culturais permanentes dos polos durante o São João

INSERT INTO atracoes_culturais (nome, descricao, tipo, horario_funcionamento, polo_id) VALUES

-- Parque do Povo
('Vila Nova da Rainha',
 'Recriação de uma cidade do interior nordestino com casinhas coloridas, bandeirolas e cenografia temática. Ponto turístico e fotográfico do evento.',
 'CULTURAL', '18:00 às 02:00', 1),

('Praça de Alimentação do Parque',
 'Ampla praça de alimentação com barracas de comidas típicas nordestinas: carne de bode, baião-de-dois, cuscuz, milho cozido, pamonha, pé-de-moleque e muito mais.',
 'CULINARIA', '17:00 às 02:00', 1),

('Parque de Diversões',
 'Espaço com brinquedos e atrações para crianças e adultos, reestruturado em 2025 para garantir mais segurança e conforto, afastado dos palcos principais.',
 'PARQUE_DIVERSOES', '17:00 às 01:00', 1),

('Quadrilhas Juninas',
 'Apresentações das quadrilhas mais tradicionais e renomadas de Campina Grande e da Paraíba durante toda a festa junina.',
 'DANCA', '19:00 às 22:00', 1),

-- Vila do Artesão
('Feira de Artesanato Paraibano',
 'A maior feira de artesanato do São João, reunindo artesãos de toda a Paraíba. Cerâmica, renda renascença, bordado, couro, madeira e muito mais.',
 'ARTESANATO', '09:00 às 22:00', 3),

('Exposição de Arte Popular',
 'Exposição permanente com obras de arte popular nordestina, incluindo xilogravuras, literatura de cordel e pinturas temáticas.',
 'EXPOSICAO', '09:00 às 20:00', 3),

('Gastronomia Típica',
 'Praça de alimentação com os sabores mais autênticos da culinária nordestina: queijo coalho, doces regionais, tapioca e derivados do milho.',
 'CULINARIA', '09:00 às 22:00', 3),

-- Vila Forró

-- Trem do Forró

('Festa em Galante',
 'Ao chegar no distrito de Galante, os passageiros encontram a festa nas ruas ao puro estilo interiorano, com forró, comidas caseiras e muita alegria.',
 'CULTURAL', 'Fins de semana de junho', 5),

-- Vila Sítio São João
('Vila Sítio São João',
 'Recriação de uma cidade do interior nordestino com casinhas coloridas, bandeirolas e cenografia temática. Ponto turístico e fotográfico do evento.',
 'CULTURAL', '12:00 às 22:00', 2)
