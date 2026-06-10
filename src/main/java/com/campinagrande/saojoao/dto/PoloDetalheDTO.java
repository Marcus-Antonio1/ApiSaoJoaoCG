package com.campinagrande.saojoao.dto;

import com.campinagrande.saojoao.entity.Polo.TipoPolo;

import java.util.List;

public record PoloDetalheDTO(
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
        Boolean temEntradaGratuita,
        List<ShowResponseDTO> shows,
        List<AtracaoCulturalDTO> atracoesCulturais
) {}
