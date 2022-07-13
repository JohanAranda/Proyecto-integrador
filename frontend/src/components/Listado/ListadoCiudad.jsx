import React, { useState } from "react";
import ListadoCard from "../Listado/ListadoCard";
import styled from "styled-components";
import Api from "../../services/api";
import { useParams } from "react-router";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

const toNormalizedText = (date) => {
    const dateArr = date.split("-");
    return `${dateArr[2]} de ${meses[parseInt(dateArr[1]) - 1]} del ${dateArr[0]}`;
}

const ListadoCiudad = () => {
    const { idCiudad } = useParams();
    const [searchParams] = useSearchParams();
    const [productos, setProductos] = useState([]);
    const [ciudad, setCiudad] = useState({});
    const container = useRef(null);

    useEffect(() => {
        document.title = ciudad.nombre + " - Productos";
        const api = new Api();
        searchParams.has("fecha_inicio")
            ? api.getProductosPorCiudadYFecha(idCiudad, searchParams.get("fecha_inicio").replace("-0", "-"), searchParams.get("fecha_fin").replace("-0", "-")).then(productosBackend => {
                setProductos(productosBackend);
            }) 
            : api.getProductosPorCiudad(idCiudad).then(productosBackend => {
                setProductos(productosBackend);
            });
        api.getCiudad(idCiudad).then(ciudadBackend => {
            setCiudad(ciudadBackend)
            document.title = ciudad.nombre + " - Productos";
        });
        setTimeout(() => {
            var headerOffset = 80;
            var elementPosition = container.current.getBoundingClientRect().top;
            var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }, 500);
    }, [idCiudad, searchParams]);

    return (
        <>
                <h2 ref={container}>Nuestras recomendaciones en {ciudad.nombre} {searchParams.has("fecha_inicio") ? `entre el ${toNormalizedText(searchParams.get("fecha_inicio"))} y el ${toNormalizedText(searchParams.get("fecha_fin"))}:`:":"}</h2>
                <Listas>
                    {
                        productos.map((producto) => {
                            if (searchParams.has("fecha_inicio")) {
                                return <ListadoCard key={producto.id} {...producto} fechaInicio={searchParams.get("fecha_inicio")} fechaFin={searchParams.get("fecha_fin")} />
                            } return <ListadoCard key={producto.id} {...producto} />
                                
                        })
                    }
                </Listas>
            </>
    )
}

const Listas = styled.div`
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

export default ListadoCiudad;
