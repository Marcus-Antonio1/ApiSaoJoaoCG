package com.campinagrande.saojoao.dto;

import java.time.LocalDateTime;

public record ShowResponseDTO(
        Long id,
        LocalDateTime dataHora,
        Integer duracaoMinutos,
        String observacoes,
        String poloNome,
        Long poloId,
        String artistaNome,
        Long artistaId,
        String artistaGeneroMusical,
        String artistaImagemUrl
) {}
