package com.campinagrande.saojoao.controller;

import com.campinagrande.saojoao.dto.PoloDetalheDTO;
import com.campinagrande.saojoao.dto.PoloResponseDTO;
import com.campinagrande.saojoao.entity.Polo.TipoPolo;
import com.campinagrande.saojoao.service.PoloService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/polos")
@RequiredArgsConstructor
@Tag(name = "Polos Culturais", description = "Endpoints para os polos de atração do São João de Campina Grande")
public class PoloController {

    private final PoloService poloService;

    @GetMapping
    @Operation(summary = "Lista todos os polos culturais",
            description = "Retorna todos os polos de atração do São João, com opção de filtrar por tipo ou gratuidade")
    public ResponseEntity<List<PoloResponseDTO>> listarTodos(
            @Parameter(description = "Filtrar por tipo: PUBLICO ou PRIVADO")
            @RequestParam(required = false) TipoPolo tipo,
            @Parameter(description = "Filtrar apenas polos com entrada gratuita")
            @RequestParam(required = false) Boolean gratuito) {

        if (tipo != null) {
            return ResponseEntity.ok(poloService.buscarPorTipo(tipo));
        }
        if (Boolean.TRUE.equals(gratuito)) {
            return ResponseEntity.ok(poloService.buscarGratuitos());
        }
        return ResponseEntity.ok(poloService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca polo por ID com programação completa",
            description = "Retorna os detalhes do polo incluindo todos os shows e atrações culturais do mês")
    public ResponseEntity<PoloDetalheDTO> buscarPorId(
            @Parameter(description = "ID do polo") @PathVariable Long id) {
        return ResponseEntity.ok(poloService.buscarPorId(id));
    }
}
