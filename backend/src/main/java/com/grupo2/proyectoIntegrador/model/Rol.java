package com.grupo2.proyectoIntegrador.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;

@Entity
@Table(name = "roles")
@Getter @Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "name")
    private String nombre;

    public GrantedAuthority toGrantedAuthority() {
        return new SimpleGrantedAuthority(nombre);
    }
}
