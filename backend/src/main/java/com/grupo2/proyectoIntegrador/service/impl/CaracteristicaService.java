package com.grupo2.proyectoIntegrador.service.impl;

import com.grupo2.proyectoIntegrador.model.Caracteristica;
import com.grupo2.proyectoIntegrador.repository.ICaracteristicaRepository;
import com.grupo2.proyectoIntegrador.service.ICaracteristicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class CaracteristicaService implements ICaracteristicaService {

    @Autowired
    private ICaracteristicaRepository repository;

    @Override
    public Collection<Caracteristica> listarCaracteristicas() {
        return repository.findAll();
    }
}
