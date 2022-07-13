package com.grupo2.proyectoIntegrador.repository;

import com.grupo2.proyectoIntegrador.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IUsuarioRepository extends JpaRepository<Usuario, Integer> {
    @Query
    Usuario findByEmail(String email);
}
