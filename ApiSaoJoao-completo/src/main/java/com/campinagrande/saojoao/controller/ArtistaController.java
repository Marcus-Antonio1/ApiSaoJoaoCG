package com.campinagrande.saojoao.controller;

import com.campinagrande.saojoao.dto.ArtistaResponseDTO;
import com.campinagrande.saojoao.dto.ShowResponseDTO;
import com.campinagrande.saojoao.service.ArtistaService;
import com.campinagrande.saojoao.service.ShowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/artistas")
@RequiredArgsConstructor
@Tag(name = "Artistas", description = "Endpoints para artistas e suas apresentações no São João")
public class ArtistaController {

    private final ArtistaService artistaService;
    private final ShowService showService;

    @GetMapping
    @Operation(summary = "Lista todos os artistas",
               description = "Retorna todos os artistas com opção de busca por nome ou gênero musical")
    public ResponseEntity<List<ArtistaResponseDTO>> listar(
            @Parameter(description = "Buscar artista pelo nome (parcial)") @RequestParam(required = false) String nome,
            @Parameter(description = "Filtrar por gênero musical") @RequestParam(required = false) String genero) {

        if (nome != null && !nome.isBlank()) {
            return ResponseEntity.ok(artistaService.buscarPorNome(nome));
        }
        if (genero != null && !genero.isBlank()) {
            return ResponseEntity.ok(artistaService.buscarPorGenero(genero));
        }
        return ResponseEntity.ok(artistaService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca artista por ID com todos os shows",
               description = "Retorna o artista com a lista completa de shows: polo, data e hora de cada apresentação")
    public ResponseEntity<ArtistaResponseDTO> buscarPorId(
            @Parameter(description = "ID do artista") @PathVariable Long id) {
        return ResponseEntity.ok(artistaService.buscarPorId(id));
    }

    @GetMapping("/{id}/shows")
    @Operation(summary = "Lista todos os shows de um artista específico",
               description = "Útil para saber onde e quando um artista se apresenta ao longo do mês junino")
    public ResponseEntity<List<ShowResponseDTO>> showsDoArtista(
            @Parameter(description = "ID do artista") @PathVariable Long id) {
        return ResponseEntity.ok(showService.buscarPorArtista(id));
    }

    @GetMapping("/busca")
    @Operation(summary = "Busca artista pelo nome com todos os seus shows",
               description = "Endpoint principal de busca: informe o nome e veja todos os locais, datas e horários das apresentações")
    public ResponseEntity<List<ShowResponseDTO>> buscarShowsPorNomeArtista(
            @Parameter(description = "Nome do artista (parcial, ex: 'Elba', 'João Gomes')", required = true)
            @RequestParam String nome) {
        return ResponseEntity.ok(showService.buscarPorNomeArtista(nome));
    }
}
