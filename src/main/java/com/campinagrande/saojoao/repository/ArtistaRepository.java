package com.campinagrande.saojoao.repository;

import com.campinagrande.saojoao.entity.Artista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArtistaRepository extends JpaRepository<Artista, Long> {

    List<Artista> findByNomeContainingIgnoreCase(String nome);

    List<Artista> findByGeneroMusicalIgnoreCase(String generoMusical);

    @Query("SELECT a FROM Artista a LEFT JOIN FETCH a.shows s LEFT JOIN FETCH s.polo WHERE LOWER(a.nome) LIKE LOWER(CONCAT('%', :nome, '%'))")
    List<Artista> buscarComShowsPorNome(@Param("nome") String nome);

    @Query("SELECT a FROM Artista a LEFT JOIN FETCH a.shows s LEFT JOIN FETCH s.polo WHERE a.id = :id")
    Optional<Artista> findByIdComShows(@Param("id") Long id);
}
