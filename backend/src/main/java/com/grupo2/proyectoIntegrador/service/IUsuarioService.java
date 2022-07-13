package com.grupo2.proyectoIntegrador.service;

import com.grupo2.proyectoIntegrador.model.Usuario;

import java.util.UUID;

public interface IUsuarioService {
    Usuario getMe();
    Usuario crearUsuario(Usuario usuario);
    Usuario buscarUsuario(Integer id);
    Boolean eliminarUsuario(Integer id);
    Usuario modificarUsuario(Usuario usuario);
    Usuario buscarPorEmail(String email);
    boolean verificar(UUID codigo);
}
