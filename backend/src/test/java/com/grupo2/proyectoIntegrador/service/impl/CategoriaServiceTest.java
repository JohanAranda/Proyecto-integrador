package com.grupo2.proyectoIntegrador.service.impl;

import com.grupo2.proyectoIntegrador.model.Categoria;
import com.grupo2.proyectoIntegrador.repository.ICategoriaRepository;
import com.grupo2.proyectoIntegrador.service.ICategoriaService;
import org.junit.Before;
import org.junit.jupiter.api.*;
import org.junit.runner.RunWith;
import org.mockito.*;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.mockito.Mockito.when;


@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class CategoriaServiceTest {
    @MockBean
    ICategoriaRepository repository;

    @Autowired
    private CategoriaService categoriaService;


    @Test
    @Order(1)
    void crearCategoria(){
        Categoria categoria = new Categoria();
        categoria.setTitulo("All Inclusive 2");
        categoria.setUrlImagen("https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749");


        when(repository.findById(1))
                .thenReturn(Optional.of(categoria));
        when(repository.save(Mockito.any(Categoria.class)))
                .thenAnswer(i -> {
                            Categoria response = (Categoria) i.getArguments()[0];
                            response.setId(1);
                            return response;
                        }
                );
        Categoria allInclusive = categoriaService.crearCategoria(categoria);

        Assertions.assertEquals(categoria, allInclusive);
        Assertions.assertNotNull(categoriaService.buscarCategoria(1));
    }
/*
    @Test
    @Order(2)
    void modificarCategoria() {

        Categoria categoria = new Categoria();
        categoria.setTitulo("BnB");
        categoria.setDescripcion("Soy un Bed and Breakfast");
        categoria.setUrlImagen("https://images.unsplash.com/photo-1648737153811-69a6d8c528bf?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470");

        Categoria bedAndBreakfast = categoriaService.crearCategoria(categoria);

        bedAndBreakfast.setTitulo("Bed and Breakfast");
        categoriaService.modificarCategoria(bedAndBreakfast);

        Assertions.assertEquals("Bed and Breakfast", categoriaService.buscarCategoria(bedAndBreakfast.getId()).getTitulo());

    }*/

}