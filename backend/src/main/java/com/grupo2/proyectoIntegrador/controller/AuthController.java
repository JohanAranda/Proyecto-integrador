package com.grupo2.proyectoIntegrador.controller;

import com.grupo2.proyectoIntegrador.configuration.authentication.JwtTokenUtil;
import com.grupo2.proyectoIntegrador.model.Usuario;
import com.grupo2.proyectoIntegrador.model.security.AuthRequest;
import com.grupo2.proyectoIntegrador.model.security.AuthResponse;
import com.grupo2.proyectoIntegrador.service.impl.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest request) {
        try {
            authenticationManager.authenticate(request.toUsernamePasswordAuthenticationToken());
        } catch (DisabledException e) {
            return ResponseEntity.internalServerError().build();
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body("Bad credentials");
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());

        Usuario usuario = usuarioService.buscarPorEmail(request.getUsername());
        if (!usuario.getActive()) {
            return ResponseEntity.badRequest().body("Not verified");
        }


        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(token));
    }
}
