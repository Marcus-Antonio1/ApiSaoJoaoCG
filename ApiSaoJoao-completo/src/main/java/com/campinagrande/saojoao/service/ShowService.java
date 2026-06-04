package com.campinagrande.saojoao.service;

import com.campinagrande.saojoao.dto.ShowResponseDTO;
import com.campinagrande.saojoao.entity.Show;
import com.campinagrande.saojoao.exception.ResourceNotFoundException;
import com.campinagrande.saojoao.repository.ShowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShowService {

    private final ShowRepository showRepository;

    @Transactional(readOnly = true)
    public List<ShowResponseDTO> listarTodos() {
        return showRepository.findAllComDetalhes()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ShowResponseDTO> buscarPorPolo(Long poloId) {
        return showRepository.findByPoloId(poloId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ShowResponseDTO> buscarPorArtista(Long artistaId) {
        return showRepository.findByArtistaId(artistaId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ShowResponseDTO> buscarPorData(LocalDate data) {
        return showRepository.findByData(data)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ShowResponseDTO> buscarPorMes(int mes, int ano) {
        return showRepository.findByMesEAno(mes, ano)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ShowResponseDTO> buscarPorNomeArtista(String nome) {
        return showRepository.findByNomeArtista(nome)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public ShowResponseDTO buscarPorId(Long id) {
        return showRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Show não encontrado com id: " + id));
    }

    private ShowResponseDTO toDTO(Show show) {
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
}
