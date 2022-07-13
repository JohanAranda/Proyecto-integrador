package com.grupo2.proyectoIntegrador.service.impl;

import com.grupo2.proyectoIntegrador.model.Categoria;
import com.grupo2.proyectoIntegrador.repository.ICategoriaRepository;
import com.grupo2.proyectoIntegrador.service.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Service de la clase Categoria.
 */
@Service
public class CategoriaService implements ICategoriaService {
    /**
     * Repositorio de Categoria (ICategoriaRepository).
     */
    @Autowired
    ICategoriaRepository categoriaRepository;

    @Override
    public Categoria crearCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Override
    public Categoria buscarCategoria(Integer id) {

        Optional<Categoria> categoria = categoriaRepository.findById(id);

        if (categoria.isPresent()){
            Categoria categoriaBuscada = new Categoria();
            categoriaBuscada.setId(categoria.get().getId());
            categoriaBuscada.setTitulo(categoria.get().getTitulo());
            categoriaBuscada.setUrlImagen(categoria.get().getUrlImagen());
            categoriaBuscada.setCantidad(categoria.get().getCantidad());

            return categoriaBuscada;
        }

        return null;
    }

    @Override
    public Set<Categoria> listarCategorias() {

        List<Categoria> categoriasList = categoriaRepository.findAll();

        Set<Categoria> categorias = new HashSet<>();

        for (Categoria categoria : categoriasList){
            categorias.add(categoria);
        }
        return categorias;
    }

    @Override
    public void eliminarCategoria(Integer id) {

        categoriaRepository.deleteById(id);

    }

    @Override
    public Categoria modificarCategoria(Categoria categoria) {

        categoriaRepository.save(categoria);

        return categoria;
    }
}
