package com.grupo2.proyectoIntegrador.controller;

import com.grupo2.proyectoIntegrador.model.Caracteristica;
import com.grupo2.proyectoIntegrador.service.ICaracteristicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/caracteristicas")
public class CaracteristicaController {

    @Autowired
    private ICaracteristicaService caracteristicaService;

    @GetMapping
    public ResponseEntity<Collection<Caracteristica>> listarCaracteristicas() {
        return ResponseEntity.ok(caracteristicaService.listarCaracteristicas());
    }

}
