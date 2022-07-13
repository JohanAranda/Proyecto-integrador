package com.grupo2.proyectoIntegrador.repository;

import com.grupo2.proyectoIntegrador.model.Caracteristica;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICaracteristicaRepository extends JpaRepository<Caracteristica, Integer> {
}
