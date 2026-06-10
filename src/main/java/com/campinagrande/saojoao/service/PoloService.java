package com.campinagrande.saojoao.service;

import com.campinagrande.saojoao.dto.*;
import com.campinagrande.saojoao.dto.AtracaoCulturalDTO;
import com.campinagrande.saojoao.dto.PoloDetalheDTO;
import com.campinagrande.saojoao.dto.PoloResponseDTO;
import com.campinagrande.saojoao.dto.ShowResponseDTO;
import com.campinagrande.saojoao.entity.AtracaoCultural;
import com.campinagrande.saojoao.entity.Polo;
import com.campinagrande.saojoao.entity.Show;
import com.campinagrande.saojoao.exception.ResourceNotFoundException;
import com.campinagrande.saojoao.repository.PoloRepository;
import com.campinagrande.saojoao.repository.ShowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PoloService {

    private final PoloRepository poloRepository;
    private final ShowRepository showRepository;

    @Transactional(readOnly = true)
    public List<PoloResponseDTO> listarTodos() {
        return poloRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public PoloDetalheDTO buscarPorId(Long id) {
        Polo polo = poloRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Polo não encontrado com id: " + id));

        List<ShowResponseDTO> shows = showRepository.findByPoloId(id)
                .stream()
                .map(this::toShowDTO)
                .toList();

        List<AtracaoCulturalDTO> atracoes = polo.getAtracoesculturais() != null
                ? polo.getAtracoesculturais().stream().map(this::toAtracaoDTO).toList()
                : List.of();

        return new PoloDetalheDTO(
                polo.getId(),
                polo.getNome(),
                polo.getDescricao(),
                polo.getEndereco(),
                polo.getBairro(),
                polo.getLatitude(),
                polo.getLongitude(),
                polo.getImagemUrl(),
                polo.getTipo(),
                polo.getCapacidadeEstimada(),
                polo.getTemEntradaGratuita(),
                shows,
                atracoes
        );
    }

    @Transactional(readOnly = true)
    public List<PoloResponseDTO> buscarPorTipo(Polo.TipoPolo tipo) {
        return poloRepository.findByTipo(tipo)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<PoloResponseDTO> buscarGratuitos() {
        return poloRepository.findByTemEntradaGratuita(true)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    private PoloResponseDTO toResponseDTO(Polo polo) {
        return new PoloResponseDTO(
                polo.getId(),
                polo.getNome(),
                polo.getDescricao(),
                polo.getEndereco(),
                polo.getBairro(),
                polo.getLatitude(),
                polo.getLongitude(),
                polo.getImagemUrl(),
                polo.getTipo(),
                polo.getCapacidadeEstimada(),
                polo.getTemEntradaGratuita()
        );
    }

    private ShowResponseDTO toShowDTO(Show show) {
        return new ShowResponseDTO(
                show.getId(),
                show.getDataHora(),
                show.getDuracaoMinutos(),
                show.getObservacoes(),
                show.getPolo().getNome(),
                show.getPolo().getId(),
                show.getArtista().getNome(),
                show.getArtista().getId(),
                show.getArtista().getGeneroMusical(),
                show.getArtista().getImagemUrl()
        );
    }

    private AtracaoCulturalDTO toAtracaoDTO(AtracaoCultural a) {
        return new AtracaoCulturalDTO(
                a.getId(),
                a.getNome(),
                a.getDescricao(),
                a.getTipo(),
                a.getHorarioFuncionamento(),
                a.getImagemUrl()
        );
    }
}
