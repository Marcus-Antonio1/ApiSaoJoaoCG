package com.campinagrande.saojoao.dto;

import com.campinagrande.saojoao.entity.AtracaoCultural.TipoAtracao;

public record AtracaoCulturalDTO(
        Long id,
        String nome,
        String descricao,
        TipoAtracao tipo,
        String horarioFuncionamento,
        String imagemUrl
) {}
