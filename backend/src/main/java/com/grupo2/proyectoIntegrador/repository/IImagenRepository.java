package com.grupo2.proyectoIntegrador.repository;

import com.grupo2.proyectoIntegrador.model.Imagen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IImagenRepository extends JpaRepository<Imagen, Integer> {
}
