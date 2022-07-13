package com.grupo2.proyectoIntegrador.repository;

import com.grupo2.proyectoIntegrador.model.Verificacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IVerificacionRepository extends JpaRepository<Verificacion, Integer> {
    Verificacion findByCodigo(String toString);
}
