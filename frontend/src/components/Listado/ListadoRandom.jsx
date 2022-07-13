import React, { useState } from "react";
import ListadoCard from "../Listado/ListadoCard";
import styledComponents from "styled-components";
import Api from "../../services/api";
import { useParams } from "react-router";
import { useEffect } from "react";


const ListadoRandom = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const api = new Api();
        api.getProductosRandom().then(productosBackend => {
            setProductos(productosBackend);
        });
    }, []);

    return (
        <>
                <h2>Nuestras recomendaciones</h2>
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

export default ListadoRandom;
