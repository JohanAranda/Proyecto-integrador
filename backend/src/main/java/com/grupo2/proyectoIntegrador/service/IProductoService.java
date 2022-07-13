package com.grupo2.proyectoIntegrador.service;

import com.grupo2.proyectoIntegrador.model.Producto;

import java.sql.Date;
import java.util.Collection;

public interface IProductoService {
    Producto crearProducto(Producto producto);
    Producto buscarProducto(Integer id);
    Collection<Producto> listarProductos();
    Boolean eliminarProducto(Integer id);
    Producto modificarProducto(Producto producto);
    Collection<Producto> listarAleatoreos();
    Collection<Producto> listarPorCiudad(Integer id);
    Collection<Producto> listarPorCiudadYFecha(Integer ciudad_id,Date fecha_inicio, Date fecha_fin);
    Collection<Producto> listarPorCategoria(Integer categoria_id);

}
