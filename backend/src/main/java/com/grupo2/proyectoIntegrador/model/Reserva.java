package com.grupo2.proyectoIntegrador.model;


import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor 
@AllArgsConstructor
@Entity
@Table(name="reservas")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Date fecha_inicio;
    private Date fecha_fin;
    private Time hora;
    @ManyToOne
    @JoinColumn(name="productos_id")
    private Producto producto;
    @ManyToOne
    @JoinColumn(name="usuarios_id")
    private Usuario usuario;
}