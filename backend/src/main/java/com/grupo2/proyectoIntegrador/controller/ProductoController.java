package com.grupo2.proyectoIntegrador.controller;

import com.grupo2.proyectoIntegrador.model.Producto;
import com.grupo2.proyectoIntegrador.service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.Collection;

@RestController
@RequestMapping("/productos")
public class ProductoController {
    @Autowired
    private IProductoService productoService;

    @GetMapping
    public ResponseEntity<Collection<Producto>> listarProductos() {
        return ResponseEntity.ok(productoService.listarProductos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> buscarProducto(@PathVariable Integer id) {
        Producto result = productoService.buscarProducto(id);

        if (result == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<Producto> crearProducto(@RequestBody Producto producto) {
        return ResponseEntity.ok(productoService.crearProducto(producto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> modificarProducto(@PathVariable Integer id, @RequestBody Producto producto) {
        Producto productoViejo = productoService.buscarProducto(id);

        if (productoViejo == null) {
            return ResponseEntity.notFound().build();
        }

        producto.setId(id);
        return ResponseEntity.ok(productoService.modificarProducto(producto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity eliminarProducto(@PathVariable Integer id) {
        Producto producto = productoService.buscarProducto(id);

        if (producto == null) {
            return ResponseEntity.notFound().build();
        }

        if (!productoService.eliminarProducto(id)) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/random")
    @Transactional
    public ResponseEntity<Collection<Producto>> listadoAleatoreo() {
        return ResponseEntity.ok(productoService.listarAleatoreos());
    }
    @GetMapping("/ciudad/{id}")
    @Transactional
    public ResponseEntity<Collection<Producto>> listarPorCiudadyFecha(@PathVariable Integer id, @RequestParam(required = false) Date fecha_inicio, @RequestParam(required = false) Date fecha_fin) {
        if (fecha_inicio != null) {
        return ResponseEntity.ok(productoService.listarPorCiudadYFecha(id, fecha_inicio, fecha_fin));
        }
        return ResponseEntity.ok(productoService.listarPorCiudad(id));
    }

    @GetMapping("/categoria/{id}")
    public ResponseEntity<Collection<Producto>> listarPorCategoria(@PathVariable Integer id) {
        return ResponseEntity.ok(productoService.listarPorCategoria(id));
    }
}
