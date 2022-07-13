package com.grupo2.proyectoIntegrador.service;

import com.grupo2.proyectoIntegrador.model.Reserva;
import com.grupo2.proyectoIntegrador.model.Usuario;

import java.util.List;

public interface IReservaService {
    Reserva crearReserva(Reserva reserva);
    Reserva buscarReserva(Integer id);
    Boolean eliminarReserva(Integer id);
    Reserva modificarReserva(Reserva reserva);
    List<Reserva> listarReservas();
    List<Reserva> getMias(Usuario usuario);

}
