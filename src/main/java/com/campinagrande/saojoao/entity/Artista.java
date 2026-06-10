package com.campinagrande.saojoao.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "artistas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Artista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(name = "genero_musical")
    private String generoMusical;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "imagem_url")
    private String imagemUrl;

    private String instagram;

    @OneToMany(mappedBy = "artista", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Show> shows;
}
