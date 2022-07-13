package com.grupo2.proyectoIntegrador.service.impl;

import com.grupo2.proyectoIntegrador.model.Reserva;
import com.grupo2.proyectoIntegrador.model.Usuario;
import com.grupo2.proyectoIntegrador.repository.IReservaRepository;
import com.grupo2.proyectoIntegrador.service.IReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaService implements IReservaService {
    @Autowired
    private IReservaRepository repository;

    @Override
    public Reserva crearReserva(Reserva reserva) {
        return repository.save(reserva);
    }

    @Override
    public Reserva buscarReserva(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Boolean eliminarReserva(Integer id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception ignored) { }
        return false;
    }

    @Override
    public Reserva modificarReserva(Reserva reserva) {
        return repository.save(reserva);
    }

    @Override
    public List<Reserva> listarReservas() {
        return repository.findAll();
    }

    @Override
    public List<Reserva> getMias(Usuario usuario) {
        return repository.findAllByUsuarioId(usuario.getId());
    }
}
