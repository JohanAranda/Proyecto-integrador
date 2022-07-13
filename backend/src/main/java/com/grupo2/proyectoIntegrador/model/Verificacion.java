package com.grupo2.proyectoIntegrador.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="verificaciones")
@Getter
@Setter
public class Verificacion {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        private Integer id;
        @Column(columnDefinition = "VARCHAR(36)")
        private String codigo;
        private Date vencimiento;
        @ManyToOne
        @JoinColumn(name = "usuarios_id")
        private Usuario usuario;
}
