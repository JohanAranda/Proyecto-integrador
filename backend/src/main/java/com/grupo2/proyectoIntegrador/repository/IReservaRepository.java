package com.grupo2.proyectoIntegrador.repository;

import com.grupo2.proyectoIntegrador.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IReservaRepository extends JpaRepository<Reserva, Integer> {
    List<Reserva> findAllByUsuarioId(Integer usuario_id);
}
