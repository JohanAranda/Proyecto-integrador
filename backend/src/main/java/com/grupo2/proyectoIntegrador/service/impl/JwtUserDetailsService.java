package com.grupo2.proyectoIntegrador.service.impl;

import com.grupo2.proyectoIntegrador.model.Usuario;
import com.grupo2.proyectoIntegrador.repository.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private IUsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Usar si no hay usuarios en la base de datos
        if (username.equals("DH_ADMIN")) {
            Collection<SimpleGrantedAuthority> roles = Arrays.asList(new SimpleGrantedAuthority("ADMIN"), new SimpleGrantedAuthority("USER"));
            return new User("DH_ADMIN", "$2a$10$ylD7dJJuonRh9G74VwYvW.qgUW.szK/JUZbtzv6an8OVyVbw1M/.G", roles);
        }

        final Usuario usuario = usuarioRepository.findByEmail(username);

        if (usuario == null) {
            throw new UsernameNotFoundException("Usuario con el email " + username + " no encontrado");
        }

        return usuario.toUserDetails();
    }
}
