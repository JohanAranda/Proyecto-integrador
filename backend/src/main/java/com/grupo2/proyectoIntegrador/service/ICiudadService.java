package com.grupo2.proyectoIntegrador.service;

import com.grupo2.proyectoIntegrador.model.Ciudad;

import java.util.Collection;

public interface ICiudadService {
    Ciudad crearCiudad(Ciudad ciudad);
    Ciudad buscarCiudad(Integer id);
    Collection<Ciudad> listarCiudades();
    Boolean eliminarCiudad(Integer id);
    Ciudad modificarCiudad(Ciudad ciudad);
}
