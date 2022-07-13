package com.grupo2.proyectoIntegrador.model.security;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class AuthRequest {
    private String username;
    private String password;

    public Authentication toUsernamePasswordAuthenticationToken() {
        System.out.println(username);
        System.out.println(password);
        return new UsernamePasswordAuthenticationToken(username, password);
    }
}
