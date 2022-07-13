package com.grupo2.proyectoIntegrador.controller;

import com.grupo2.proyectoIntegrador.model.Rol;
import com.grupo2.proyectoIntegrador.model.Usuario;
import com.grupo2.proyectoIntegrador.service.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private IUsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/me")
    public ResponseEntity<?> buscarUsuarioAutenticado() {
        Usuario me = usuarioService.getMe();
        if (me == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(me);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarUsuario(@PathVariable Integer id) {
        Usuario result = usuarioService.buscarUsuario(id);

        if (result == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        if (usuarioService.buscarPorEmail(usuario.getEmail()) != null) {
            return ResponseEntity.badRequest().build();
        }

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        Rol rol = new Rol();
        rol.setId(2);
        usuario.setRol(rol);
        Usuario resultado = usuarioService.crearUsuario(usuario);

        ServletUriComponentsBuilder builder = ServletUriComponentsBuilder.fromCurrentRequestUri();
        builder.path("/" + resultado.getId());
        URI uri = builder.build().toUri();
        return ResponseEntity.created(uri).body(resultado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> modificarUsuario(@PathVariable Integer id, @RequestBody Usuario usuario) {
        Usuario viejo = usuarioService.buscarUsuario(id);

        if (viejo == null) {
            return ResponseEntity.notFound().build();
        }

        usuario.setId(id);
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return ResponseEntity.ok(usuarioService.modificarUsuario(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity eliminarUsuario(@PathVariable Integer id) {
        Usuario usuario = usuarioService.buscarUsuario(id);

        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        if (!usuarioService.eliminarUsuario(id)) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/verificar/{codigo}")
    public ResponseEntity<?> verificarUsuario(@PathVariable UUID codigo) {
        Boolean attempt = usuarioService.verificar(codigo);
        if (attempt) {
            return ResponseEntity.ok().build();
        }
        else return ResponseEntity.notFound().build();
    }
}
