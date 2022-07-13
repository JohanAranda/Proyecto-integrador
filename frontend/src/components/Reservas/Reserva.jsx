import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Api from "../../services/api";
import ReservaHeader from "./ReservaComponents/ReservaHeader";
import ReservaForm from "./ReservaComponents/ReservaForm";
import ProductoPoliticas from "../Producto/ProductoComponents/ProductoPoliticas";
import ProductoMapa from "../Producto/ProductoComponents/ProductoMapa";
import { useSearchParams } from "react-router-dom";

const productoDefault = {
    nombre: "",
    descripcion: "",
    puntuacion: 0,
    ciudad: { nombre: "" },
    categoria: { titulo: ""},
    imagenes: []
};

const scrollToTop = () => {
    window.scrollTo(0, 0);
}


const Reserva = ({idProp}) => {
    const [ searchParams ] = useSearchParams();

    const { id } = useParams();
    const [producto, setProducto] = useState({ ...productoDefault, id: id ?? idProp });
    document.title = producto.nombre + "- Reservar";
    useEffect(() => {
        const api = new Api();
        api.getProducto(producto.id).then(productoBackend => {
            setProducto({...productoBackend});
        });
        scrollToTop();
    }, [producto.id]);

    return (
        <>
            <ReservaHeader {...producto}/>
            {searchParams.has("fecha_inicio") 
                ? <ReservaForm {...producto} fecha_inicio={searchParams.get("fecha_inicio")} fecha_fin={searchParams.get("fecha_fin")}/>
                : <ReservaForm {...producto}/>
            }
            <ProductoMapa {...producto}/>
            <ProductoPoliticas/>
        </>
    )

}


export default Reserva