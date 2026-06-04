package com.campinagrande.saojoao.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "polos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Polo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = false)
    private String endereco;

    @Column(nullable = false)
    private String bairro;

    private Double latitude;
    private Double longitude;

    @Column(name = "imagem_url")
    private String imagemUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoPolo tipo;

    @Column(name = "capacidade_estimada")
    private Integer capacidadeEstimada;

    @Column(name = "tem_entrada_gratuita")
    private Boolean temEntradaGratuita;

    @OneToMany(mappedBy = "polo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Show> shows;

    @OneToMany(mappedBy = "polo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AtracaoCultural> atracoesculturais;

    public enum TipoPolo {
        PUBLICO, PRIVADO
    }
}
