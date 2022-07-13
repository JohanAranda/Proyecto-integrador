package com.grupo2.proyectoIntegrador.controller;

import com.grupo2.proyectoIntegrador.model.Ciudad;
import com.grupo2.proyectoIntegrador.service.impl.CiudadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/ciudades")
public class CiudadController {
    @Autowired
    private CiudadService ciudadService;

    @GetMapping
    public ResponseEntity<Collection<Ciudad>> listarCiudades() {
        return ResponseEntity.ok(ciudadService.listarCiudades());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ciudad> buscarCiudad(@PathVariable Integer id) {
        Ciudad result = ciudadService.buscarCiudad(id);

        if (result == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<Ciudad> crearCiudad(@RequestBody Ciudad ciudad) {
        return ResponseEntity.ok(ciudadService.crearCiudad(ciudad));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ciudad> modificarCiudad(@PathVariable Integer id, @RequestBody Ciudad ciudad) {
        Ciudad ciudadVieja = ciudadService.buscarCiudad(id);

        if (ciudadVieja == null) {
            return ResponseEntity.notFound().build();
        }

        ciudad.setId(id);
        return ResponseEntity.ok(ciudadService.modificarCiudad(ciudad));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity eliminarCiudad(@PathVariable Integer id) {
        Ciudad ciudad = ciudadService.buscarCiudad(id);

        if (ciudad == null) {
            return ResponseEntity.notFound().build();
        }

        if (!ciudadService.eliminarCiudad(id)) {
            return ResponseEntity.badRequest().build();
        }

        return  ResponseEntity.noContent().build();
    }
}
