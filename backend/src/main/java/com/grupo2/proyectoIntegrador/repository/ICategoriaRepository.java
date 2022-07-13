package com.grupo2.proyectoIntegrador.repository;

import com.grupo2.proyectoIntegrador.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

/**
 * Interfaz Categoria repository.
 */
@Repository
public interface ICategoriaRepository extends JpaRepository<Categoria, Integer>{
}
