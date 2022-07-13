package com.grupo2.proyectoIntegrador.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "ciudades")
@Getter @Setter
public class Ciudad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;
    String nombre;
    String pais;
    String lat;
    String lgn;
    String imagen_url;
}
