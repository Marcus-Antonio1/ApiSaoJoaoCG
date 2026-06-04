package com.campinagrande.saojoao.repository;

import com.campinagrande.saojoao.entity.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ShowRepository extends JpaRepository<Show, Long> {

    @Query("SELECT s FROM Show s JOIN FETCH s.artista JOIN FETCH s.polo WHERE s.polo.id = :poloId ORDER BY s.dataHora")
    List<Show> findByPoloId(@Param("poloId") Long poloId);

    @Query("SELECT s FROM Show s JOIN FETCH s.artista JOIN FETCH s.polo WHERE s.artista.id = :artistaId ORDER BY s.dataHora")
    List<Show> findByArtistaId(@Param("artistaId") Long artistaId);

    @Query("SELECT s FROM Show s JOIN FETCH s.artista JOIN FETCH s.polo WHERE CAST(s.dataHora AS date) = :data ORDER BY s.dataHora")
    List<Show> findByData(@Param("data") LocalDate data);

    @Query("SELECT s FROM Show s JOIN FETCH s.artista JOIN FETCH s.polo WHERE MONTH(s.dataHora) = :mes AND YEAR(s.dataHora) = :ano ORDER BY s.dataHora")
    List<Show> findByMesEAno(@Param("mes") int mes, @Param("ano") int ano);

    @Query("SELECT s FROM Show s JOIN FETCH s.artista JOIN FETCH s.polo ORDER BY s.dataHora")
    List<Show> findAllComDetalhes();

    @Query("SELECT s FROM Show s JOIN FETCH s.artista JOIN FETCH s.polo WHERE LOWER(s.artista.nome) LIKE LOWER(CONCAT('%', :nomeArtista, '%')) ORDER BY s.dataHora")
    List<Show> findByNomeArtista(@Param("nomeArtista") String nomeArtista);
}
