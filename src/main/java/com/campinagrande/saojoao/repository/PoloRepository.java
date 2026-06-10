package com.campinagrande.saojoao.repository;

import com.campinagrande.saojoao.entity.Polo;
import com.campinagrande.saojoao.entity.Polo.TipoPolo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PoloRepository extends JpaRepository<Polo, Long> {

    List<Polo> findByTipo(TipoPolo tipo);

    List<Polo> findByNomeContainingIgnoreCase(String nome);

    List<Polo> findByTemEntradaGratuita(Boolean gratuito);
}
