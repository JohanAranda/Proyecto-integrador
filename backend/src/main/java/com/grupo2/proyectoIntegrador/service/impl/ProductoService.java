package com.grupo2.proyectoIntegrador.service.impl;

import com.grupo2.proyectoIntegrador.model.Categoria;
import com.grupo2.proyectoIntegrador.model.Imagen;
import com.grupo2.proyectoIntegrador.model.Producto;
import com.grupo2.proyectoIntegrador.repository.IImagenRepository;
import com.grupo2.proyectoIntegrador.repository.IProductoRepository;
import com.grupo2.proyectoIntegrador.service.ICategoriaService;
import com.grupo2.proyectoIntegrador.service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Collection;

@Service
public class ProductoService implements IProductoService {
    @Autowired
    private IProductoRepository repository;
    @Autowired
    private ICategoriaService categoriaService;
    @Autowired
    private IImagenRepository imagenRepository;

    @Override
    public Producto crearProducto(Producto producto) {
        Categoria categoria = categoriaService.buscarCategoria(producto.getCategoria().getId());
        categoria.setCantidad(categoria.getCantidad() + 1);
        categoriaService.modificarCategoria(categoria);
        Producto productoSaved = repository.saveAndFlush(producto);
        for (Imagen imagen : producto.getImagenes()) {
            imagen.setProducto(productoSaved);
        }
        imagenRepository.saveAll(producto.getImagenes());
        return productoSaved;
    }

    @Override
    public Producto buscarProducto(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Collection<Producto> listarProductos() {
        return repository.findAll();
    }

    @Override
    public Boolean eliminarProducto(Integer id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception ignored) { }
        return false;
    }

    @Override
    public Producto modificarProducto(Producto producto) {
        return repository.save(producto);
    }

    @Override
    public Collection<Producto> listarAleatoreos() {
        return repository.findAllRandomlyOrdered();
    }

    @Override
    public Collection<Producto> listarPorCiudad(Integer id) {
        return repository.findAllByCiudad_id(id);
    }

    @Override
    public Collection<Producto> listarPorCiudadYFecha(Integer ciudad_id, Date fecha_inicio, Date fecha_fin) {
        return repository.findByDate(fecha_inicio, fecha_fin, ciudad_id);
    }

    @Override
    public Collection<Producto> listarPorCategoria(Integer categoria_id) {
        return repository.findAllByCategoria_id(categoria_id);
    }
}

