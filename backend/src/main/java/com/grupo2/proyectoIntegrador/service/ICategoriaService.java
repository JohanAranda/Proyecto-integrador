package com.grupo2.proyectoIntegrador.service;

import com.grupo2.proyectoIntegrador.model.Categoria;

import java.util.Set;

/**
 * Interfaz de Categoria Service.
 */
public interface ICategoriaService {

    /**
     * Crear categoria // Nueva categoria.
     *
     * @param categoria categoria a crear
     * @return nueva categoria creada
     */
    Categoria crearCategoria(Categoria categoria);

    /**
     * Buscar categoria // categoria.
     *
     * @param id el ID de la categoria
     * @return la categoria encontrada
     */
    Categoria buscarCategoria(Integer id);

    /**
     * Listar categorias // Listado tipo Set<>
     *
     * @return listado de todas las categorias
     */
    Set<Categoria> listarCategorias();

    /**
     * Eliminar categoria.
     *
     * @param id el ID de la categoria
     */
    void eliminarCategoria(Integer id);

    /**
     * Modificar categoria // categoria modificada.
     *
     * @param categoria la categoria a editar
     * @return categoria modificada
     */
    Categoria modificarCategoria(Categoria categoria);

}
