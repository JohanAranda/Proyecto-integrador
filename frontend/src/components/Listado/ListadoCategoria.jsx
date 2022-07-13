import React, { useState } from "react";
import ListadoCard from "../Listado/ListadoCard";
import styledComponents from "styled-components";
import Api from "../../services/api";
import { useParams } from "react-router";
import { useEffect, useRef } from "react";


const ListadoCategoria = () => {
    const container = useRef(null);
    const { idCategoria } = useParams();
    const [productos, setProductos] = useState([]);
    const [categoria, setCategoria] = useState({});

    useEffect(() => {
        document.title = categoria.titulo - " - Productos";
        const api = new Api();
        api.getProductosPorCategoria(idCategoria)
        .then(productosBackend => {
            setProductos(productosBackend);
        });
        api.getCategoria(idCategoria)
        .then(categoriaBackend => {
            setCategoria(categoriaBackend)
            document.title = categoria.titulo - " - Productos";
        })
        setTimeout(() => {
            var headerOffset = 80;
            var elementPosition = container.current.getBoundingClientRect().top;
            var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }, 500);
    }, [idCategoria, categoria.titulo]);

    return (
        <>
                <h2 ref={container}>Recomendaciones en {categoria.titulo}</h2>
                <Listas>
                    {
                        productos.map((producto) => {
                            return <ListadoCard key={producto.id} {...producto}/>
                        })
                    }
                </Listas>
            </>
    )
}

const Listas = styledComponents.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0 auto;
    padding: 0 43px 60px;
    gap: 20px;
    @media only screen and (max-width: 768px) {
        gap: 14px;
        padding: 0 14px 60px;
    }
`;

export default ListadoCategoria;
