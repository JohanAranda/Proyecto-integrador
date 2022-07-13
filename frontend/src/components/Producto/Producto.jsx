import React, { useEffect, useState } from "react"
import ProductoHeader from "./ProductoComponents/ProductoHeader"
import ProductoUbicacion from "./ProductoComponents/ProductoUbicacion"
import ProductoDescripcion from "./ProductoComponents/ProductoDescripcion"
import ProductoCaracteristicas from "./ProductoComponents/ProductoCaracteristicas"
import ProductoPoliticas from "./ProductoComponents/ProductoPoliticas"
import ProductoImagenes from "./ProductoComponents/ProductoImagenes"
import ProductoReserva from "./ProductoComponents/ProductoReserva"
import ProductoMapa from "./ProductoComponents/ProductoMapa"
import { useParams } from "react-router"
import { useSearchParams } from "react-router-dom"
import Api from "../../services/api"

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

const Producto = ({idProp, producto_}) => {
    const { id } = useParams();
    const [ searchParams ] = useSearchParams();
    const [producto, setProducto] = useState({ ...productoDefault, id: id ?? idProp });
    document.title = producto.nombre;
    useEffect(() => {
        const api = new Api();
        api.getProducto(producto.id).then(productoBackend => {
            setProducto({...productoBackend});
        });
        scrollToTop();
    }, [producto.id]);
    return (
            <>
                <ProductoHeader {...producto}/>
                <ProductoUbicacion {...producto} />
                <ProductoImagenes {...producto}/>
                <ProductoDescripcion {...producto}/>
                <ProductoCaracteristicas {...producto}/>
                <ProductoReserva {...producto} productoId={producto.id} fechaInicio={searchParams.get("fecha_inicio")} fechaFin={searchParams.get("fecha_fin")}/> 
                <ProductoMapa {...producto}/>
                <ProductoPoliticas {...producto}/>
            </>
    );
};

export default Producto
