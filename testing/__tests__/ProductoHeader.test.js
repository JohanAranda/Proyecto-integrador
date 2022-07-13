import React from "react";
import { render } from "@testing-library/react";
import ProductoHeader from "../components/Producto/ProductoComponents/ProductoHeader";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';


const producto = {
    id: 7,
    nombre: "Barba BnB",
    descripcion: "Soy un BnB con barba",
    puntuacion: 10,
    ciudad: { nombre: "Barbarie" },
    categoria: { titulo: "Bed and Breakfast"},
    imagenes: []
};

let view = null;

test("Renderizado Nombre Producto", () => {
    view = render(
        <BrowserRouter>
            <ProductoHeader {...producto}/>
        </BrowserRouter>
    );

    expect(view.container).toHaveTextContent(producto.nombre);
})

test("Renderizado Categoria Producto", () => {
    view = render(
        <BrowserRouter>
            <ProductoHeader {...producto}/>
        </BrowserRouter>
    );

    expect(view.container).toHaveTextContent(producto.categoria.titulo.toUpperCase());
})

test("Renderizado Botón Volver", () => {
    view = render(
        <BrowserRouter>
            <ProductoHeader {...producto}/>
        </BrowserRouter>
    );
    expect(view.container).toContainHTML('<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>');
});
