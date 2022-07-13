package com.grupo2.proyectoIntegrador.controller;

import com.grupo2.proyectoIntegrador.model.Reserva;
import com.grupo2.proyectoIntegrador.service.GmailService;
import com.grupo2.proyectoIntegrador.service.impl.ProductoService;
import com.grupo2.proyectoIntegrador.service.impl.ReservaService;
import com.grupo2.proyectoIntegrador.service.impl.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/reservas")
public class ReservaController {
    @Autowired
    private ReservaService reservaService;
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private ProductoService productoService;

    @GetMapping
    public ResponseEntity<Collection<Reserva>> listarReservaes() {
        return ResponseEntity.ok(reservaService.listarReservas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reserva> buscarReserva(@PathVariable Integer id) {
        Reserva result = reservaService.buscarReserva(id);

        if (result == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }

    @GetMapping("/mis-reservas")
    public ResponseEntity<Collection<Reserva>> getMias() {
        return ResponseEntity.ok(reservaService.getMias(usuarioService.getMe()));
    }

    @PostMapping
    public ResponseEntity<Reserva> crearReserva(@RequestBody Reserva reserva) {
        reserva.setUsuario(usuarioService.getMe());
        GmailService.confirmarReserva(usuarioService.getMe(), productoService.buscarProducto(reserva.getProducto().getId()), reserva);
        return ResponseEntity.ok(reservaService.crearReserva(reserva));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reserva> modificarReserva(@PathVariable Integer id, @RequestBody Reserva reserva) {
        Reserva reservaVieja = reservaService.buscarReserva(id);

        if (reservaVieja == null) {
            return ResponseEntity.notFound().build();
        }

        reserva.setId(id);
        return ResponseEntity.ok(reservaService.modificarReserva(reserva));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity eliminarReserva(@PathVariable Integer id) {
        Reserva reserva = reservaService.buscarReserva(id);

        if (reserva == null) {
            return ResponseEntity.notFound().build();
        }

        if (!reservaService.eliminarReserva(id)) {
            return ResponseEntity.badRequest().build();
        }

        return  ResponseEntity.noContent().build();
    }
}
