package com.campinagrande.saojoao.dto;

import com.campinagrande.saojoao.entity.Polo.TipoPolo;

public record PoloResponseDTO(
        Long id,
        String nome,
        String descricao,
        String endereco,
        String bairro,
        Double latitude,
        Double longitude,
        String imagemUrl,
        TipoPolo tipo,
        Integer capacidadeEstimada,
        Boolean temEntradaGratuita
) {}
