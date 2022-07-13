package com.grupo2.proyectoIntegrador.repository;

import com.grupo2.proyectoIntegrador.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface IProductoRepository extends JpaRepository<Producto, Integer> {
    @Procedure("PRODUCTOSALEATOREOS")
    List<Producto> findAllRandomlyOrdered();
    @Procedure("PRODUCTOSENFECHAYCIUDAD")
    List<Producto> findByDate(Date fecha_inicio, Date fecha_fin, Integer ciudades_id);
    @Query
    List<Producto> findAllByCiudad_id(Integer Ciudad_id);
    @Query
    List<Producto> findAllByCategoria_id(Integer Categoria_id);
}
