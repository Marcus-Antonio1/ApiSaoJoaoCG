package com.campinagrande.saojoao.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "atracoes_culturais")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AtracaoCultural {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoAtracao tipo;

    @Column(name = "horario_funcionamento")
    private String horarioFuncionamento;

    @Column(name = "imagem_url")
    private String imagemUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "polo_id", nullable = false)
    private Polo polo;

    public enum TipoAtracao {
        ARTESANATO,
        CULINARIA,
        DANCA,
        EXPOSICAO,
        PARQUE_DIVERSOES,
        CULTURAL
    }
}
