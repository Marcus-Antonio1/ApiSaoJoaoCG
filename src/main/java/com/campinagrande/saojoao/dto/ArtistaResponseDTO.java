package com.campinagrande.saojoao.dto;

import java.util.List;

public record ArtistaResponseDTO(
        Long id,
        String nome,
        String generoMusical,
        String bio,
        String imagemUrl,
        String instagram,
        List<ShowResponseDTO> shows
) {}
