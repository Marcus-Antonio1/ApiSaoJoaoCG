package com.campinagrande.saojoao.service;

import com.campinagrande.saojoao.dto.ArtistaResponseDTO;
import com.campinagrande.saojoao.dto.ShowResponseDTO;
import com.campinagrande.saojoao.entity.Artista;
import com.campinagrande.saojoao.entity.Show;
import com.campinagrande.saojoao.exception.ResourceNotFoundException;
import com.campinagrande.saojoao.repository.ArtistaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArtistaService {

    private final ArtistaRepository artistaRepository;

    @Transactional(readOnly = true)
    public List<ArtistaResponseDTO> listarTodos() {
        return artistaRepository.findAll()
                .stream()
                .map(a -> toDTO(a, List.of()))
                .toList();
    }

    @Transactional(readOnly = true)
    public ArtistaResponseDTO buscarPorId(Long id) {
        Artista artista = artistaRepository.findByIdComShows(id)
                .orElseThrow(() -> new ResourceNotFoundException("Artista não encontrado com id: " + id));
        return toDTOComShows(artista);
    }

    @Transactional(readOnly = true)
    public List<ArtistaResponseDTO> buscarPorNome(String nome) {
        return artistaRepository.buscarComShowsPorNome(nome)
                .stream()
                .map(this::toDTOComShows)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ArtistaResponseDTO> buscarPorGenero(String genero) {
        return artistaRepository.findByGeneroMusicalIgnoreCase(genero)
                .stream()
                .map(a -> toDTO(a, List.of()))
                .toList();
    }

    private ArtistaResponseDTO toDTOComShows(Artista artista) {
        List<ShowResponseDTO> shows = artista.getShows() != null
                ? artista.getShows().stream().map(this::toShowDTO).toList()
                : List.of();
        return toDTO(artista, shows);
    }

    private ArtistaResponseDTO toDTO(Artista artista, List<ShowResponseDTO> shows) {
        return new ArtistaResponseDTO(
                artista.getId(),
                artista.getNome(),
                artista.getGeneroMusical(),
                artista.getBio(),
                artista.getImagemUrl(),
                artista.getInstagram(),
                shows
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
}
