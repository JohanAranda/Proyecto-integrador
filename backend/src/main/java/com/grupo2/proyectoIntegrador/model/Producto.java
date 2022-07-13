package com.grupo2.proyectoIntegrador.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "productos")
@Getter @Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class    Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "name")
    private String nombre;
    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;
    @Column(name = "puntuacion", columnDefinition = "DECIMAL")
    private Float puntuacion;
    @ManyToOne(optional = false)
    @JoinColumn(name = "ciudades_id", nullable = false)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Ciudad ciudad;
    @ManyToOne(optional = false)
    @JoinColumn(name = "categorias_id", nullable = false)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Categoria categoria;

    @OneToMany(mappedBy = "producto")
    private Set<Imagen> imagenes;
    @OneToMany(mappedBy="producto")
    @JsonIgnoreProperties("producto")
    private Set<Reserva> reservas;

    @ManyToMany
    @JoinTable(name = "caracteristicas_productos",
            joinColumns = @JoinColumn(name = "productos_id"),
            inverseJoinColumns = @JoinColumn(name = "caracteristicas_id"))
    private Set<Caracteristica> caracteristicas;
    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(name = "politicas_productos",
            joinColumns = @JoinColumn(name = "productos_id"),
            inverseJoinColumns = @JoinColumn(name = "politicas_id"))
    private Set<Politicas> politicas;
}
