package com.grupo2.proyectoIntegrador.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "usuarios")
@Getter @Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "first_name")
    private String nombre;
    @Column(name = "last_name")
    private String apellido;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private Boolean active;
    /*@ManyToOne(optional = false, cascade = {CascadeType.REFRESH})
    @JoinColumn(name = "ciudades_id", nullable = false)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Ciudad ciudad;*/
    @ManyToOne(optional = false, cascade = {CascadeType.REFRESH})
    @JoinColumn(name = "roles_id", nullable = false)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Rol rol;

    public UserDetails toUserDetails() {
        return new User(email, password, List.of(rol.toGrantedAuthority()));
    }
}
