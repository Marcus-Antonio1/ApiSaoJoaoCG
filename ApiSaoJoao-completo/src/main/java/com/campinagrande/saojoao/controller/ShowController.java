package com.campinagrande.saojoao.controller;

import com.campinagrande.saojoao.dto.ShowResponseDTO;
import com.campinagrande.saojoao.service.ShowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/shows")
@RequiredArgsConstructor
@Tag(name = "Shows", description = "Endpoints para programação de shows e apresentações")
public class ShowController {

    private final ShowService showService;

    @GetMapping
    @Operation(summary = "Lista shows com filtros opcionais",
               description = "Retorna shows filtrados por polo, artista (ID), data ou mês/ano. Sem filtros retorna todos os shows do calendário.")
    public ResponseEntity<List<ShowResponseDTO>> listar(
            @Parameter(description = "ID do polo para filtrar") @RequestParam(required = false) Long poloId,
            @Parameter(description = "ID do artista para filtrar") @RequestParam(required = false) Long artistaId,
            @Parameter(description = "Data específica no formato yyyy-MM-dd") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data,
            @Parameter(description = "Mês (1-12)") @RequestParam(required = false) Integer mes,
            @Parameter(description = "Ano (ex: 2025)") @RequestParam(required = false) Integer ano) {

        if (poloId != null) return ResponseEntity.ok(showService.buscarPorPolo(poloId));
        if (artistaId != null) return ResponseEntity.ok(showService.buscarPorArtista(artistaId));
        if (data != null) return ResponseEntity.ok(showService.buscarPorData(data));
        if (mes != null && ano != null) return ResponseEntity.ok(showService.buscarPorMes(mes, ano));

        return ResponseEntity.ok(showService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca show por ID")
    public ResponseEntity<ShowResponseDTO> buscarPorId(
            @Parameter(description = "ID do show") @PathVariable Long id) {
        return ResponseEntity.ok(showService.buscarPorId(id));
    }
}
