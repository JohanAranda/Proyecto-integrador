package com.grupo2.proyectoIntegrador.controller;

import com.grupo2.proyectoIntegrador.model.Categoria;
import com.grupo2.proyectoIntegrador.service.impl.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

/**
 * Tipo Categoria controller.
 */
@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    private CategoriaService categoriaService;

    /**
     * Seteamos el service.
     *
     * @param categoriaService el service de Categoría (CategoriaService)
     */
    @Autowired
    public void setService(CategoriaService categoriaService) { this.categoriaService = categoriaService; }

    /**
     * Crear categoria // Response entity.
     *
     * @param categoria la categoria
     * @return el response entity
     */
    @PostMapping
    public ResponseEntity<Categoria> crearCategoria(@RequestBody Categoria categoria) {
        return ResponseEntity.ok(categoriaService.crearCategoria(categoria));
    }

    /**
     * Listar categorias // Response entity.
     *
     * @return el response entity
     */
    @GetMapping
    public ResponseEntity<Set<Categoria>> listarCategorias() {
        return ResponseEntity.ok(categoriaService.listarCategorias());
    }

    /**
     * Buscar categoria // Response entity.
     *
     * @param id el ID
     * @return el response entity
     */
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscarCategoria(@PathVariable Integer id){
        Categoria categoriaABuscar = categoriaService.buscarCategoria(id);

        if(categoriaABuscar == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(categoriaService.buscarCategoria(id));
    }

    /**
     * Eliminar categoria // Response entity.
     *
     * @param id el ID
     * @return el response entity
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCategoria(@PathVariable Integer id) {
        Categoria categoriaAEliminar = categoriaService.buscarCategoria(id);

        if(categoriaAEliminar == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        categoriaService.eliminarCategoria(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * Modificar categoria // Response entity.
     *
     * @param categoria la categoria
     * @return el response entity
     */
    @PutMapping
    public ResponseEntity<?> modificarCategoria(@RequestBody Categoria categoria) {
        Categoria categoriaAModificar = categoriaService.buscarCategoria(categoria.getId());

        if (categoriaAModificar == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        categoriaService.modificarCategoria(categoria);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
