package com.grupo2.proyectoIntegrador.service.impl;

import com.grupo2.proyectoIntegrador.model.Imagen;
import com.grupo2.proyectoIntegrador.model.Usuario;
import com.grupo2.proyectoIntegrador.model.Verificacion;
import com.grupo2.proyectoIntegrador.repository.IUsuarioRepository;
import com.grupo2.proyectoIntegrador.repository.IVerificacionRepository;
import com.grupo2.proyectoIntegrador.service.GmailService;
import com.grupo2.proyectoIntegrador.service.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class UsuarioService implements IUsuarioService {
    @Autowired
    private IUsuarioRepository repository;
    @Autowired
    private IVerificacionRepository verificacionRepository;

    @Override
    public Usuario getMe() {
        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String result;
            if (principal instanceof UserDetails) {
                result = ((UserDetails) principal).getUsername();
            } else {
                result = principal.toString();
            }
            if (result == null) {
                return null;
            }
            return repository.findByEmail(result);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Usuario crearUsuario(Usuario usuario) {
        Usuario saved = repository.save(usuario);
        UUID confirmationUUID = UUID.randomUUID();
        Verificacion verificacion = new Verificacion();
        verificacion.setUsuario(saved);
        verificacion.setCodigo(confirmationUUID.toString());
        Date now = new Date();
        now.setTime(now.getTime() + 604800000L);
        verificacion.setVencimiento(now);
        verificacionRepository.save(verificacion);
        GmailService.enviarConGMail(usuario, confirmationUUID);
        return usuario;

    }

    @Override
    public Usuario buscarUsuario(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Boolean eliminarUsuario(Integer id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception ignored) { }
        return false;
    }

    @Override
    public Usuario modificarUsuario(Usuario usuario) {
        return repository.save(usuario);
    }

    @Override
    public Usuario buscarPorEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public boolean verificar(UUID codigo) {
        Verificacion verificacion = verificacionRepository.findByCodigo(codigo.toString());
        if (verificacion == null) {
            return false;
        }
        verificacion.getUsuario().setActive(true);
        repository.save(verificacion.getUsuario());
        return true;
    }
}
