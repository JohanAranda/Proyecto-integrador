package com.grupo2.proyectoIntegrador.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="imagenes")
@Getter @Setter
public class Imagen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;
    private String url;
    private String titulo;

    @ManyToOne
    @JoinColumn(name = "productos_id")
    @JsonIgnore
    private Producto producto;
}
