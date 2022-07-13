package com.grupo2.proyectoIntegrador.repository;

import com.grupo2.proyectoIntegrador.model.Ciudad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICiudadRepository extends JpaRepository<Ciudad, Integer>{
}
