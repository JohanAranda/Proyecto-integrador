package com.grupo2.proyectoIntegrador.service.impl;

import com.grupo2.proyectoIntegrador.model.Ciudad;
import com.grupo2.proyectoIntegrador.repository.ICiudadRepository;
import com.grupo2.proyectoIntegrador.service.ICiudadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class CiudadService implements ICiudadService {
    @Autowired
    private ICiudadRepository ciudadRepository;

    @Override
    public Ciudad crearCiudad(Ciudad ciudad) {
        return ciudadRepository.save(ciudad);
    }

    @Override
    public Ciudad buscarCiudad(Integer id) {
        Optional<Ciudad> ciudad = ciudadRepository.findById(id);
        return ciudad.orElse(null);
    }

    @Override
    public Collection<Ciudad> listarCiudades() {
        return ciudadRepository.findAll();
    }

    @Override
    public Boolean eliminarCiudad(Integer id) {
        try {
            ciudadRepository.deleteById(id);
            return true;
        } catch (Exception ignored) { }
        return false;
    }

    @Override
    public Ciudad modificarCiudad(Ciudad ciudad) {
        return ciudadRepository.save(ciudad);
    }
}
