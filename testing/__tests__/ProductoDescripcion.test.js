import React from "react";
import { render } from "@testing-library/react";
import ProductoDescripcion from "../components/Producto/ProductoComponents/ProductoDescripcion";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';

const producto = {
    id: 7,
    nombre: "Barba BnB",
    descripcion: "Soy un BnB con barba",
    puntuacion: 8,
    ciudad: { nombre: "Barbarie", pais: "Dinamarca" },
    categoria: { titulo: "Bed and Breakfast"},
    imagenes: []
};

const producto2 = {
    id: 7,
    nombre: "Hotel Barba",
    descripcion: "",
    puntuacion: 8,
    ciudad: { nombre: "Barbarie", pais: "Dinamarca" },
    categoria: { titulo: "Hoteles"},
    imagenes: []
};

let view = null;

test("Renderizado Titulo de la descripción", () => {
    view = render(
        <BrowserRouter>
            <ProductoDescripcion {...producto}/>
        </BrowserRouter>
    );

    expect(view.container).toHaveTextContent(`Alojate en el más mejor ${producto.categoria.titulo} de ${producto.ciudad.nombre}`);
});

test("Renderizado Descripción", () => {
    view = render(
        <BrowserRouter>
            <ProductoDescripcion {...producto}/>
        </BrowserRouter>
    );

    expect(view.container).toHaveTextContent(producto.descripcion);
});

test("Renderizado Titulo de la descripción para Hoteles", () => {
    view = render(
        <BrowserRouter>
            <ProductoDescripcion {...producto2}/>
        </BrowserRouter>
    );

    expect(view.container).toHaveTextContent(`Alojate en uno de los mejores ${producto2.categoria.titulo} de ${producto2.ciudad.nombre}`);
});

test("Renderizado Descripción no definida", () => {
    view = render(
        <BrowserRouter>
            <ProductoDescripcion {...producto2}/>
        </BrowserRouter>
    );

    expect(view.container).toHaveTextContent("La descripción de este producto no ha sido brindada todavía.");
});
