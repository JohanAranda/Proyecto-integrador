import React from "react";
import { render } from "@testing-library/react";
import ProductoUbicacion from "../components/Producto/ProductoComponents/ProductoUbicacion";
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

let view = null;

test("Renderizado Ciudad Producto", () => {
    view = render(
        <BrowserRouter>
            <ProductoUbicacion {...producto}/>
        </BrowserRouter>
    );

    expect(view.container).toHaveTextContent(producto.ciudad.nombre);
});

test("Renderizado País Producto", () => {
    view = render(
        <BrowserRouter>
            <ProductoUbicacion {...producto}/>
        </BrowserRouter>
    );

    expect(view.container).toHaveTextContent(producto.ciudad.pais);
});

test("Renderizado 'A metros del centro'", () => {
    view = render(
        <BrowserRouter>
            <ProductoUbicacion {...producto}/>
        </BrowserRouter>
    );

    expect(view.container).toHaveTextContent("A metros del centro");
});

test("Renderizado Puntuación", () => {
    view = render(
        <BrowserRouter>
            <ProductoUbicacion {...producto}/>
        </BrowserRouter>
    );
    
    expect(view.container).toHaveTextContent("8");
});

test("Renderizado Texto Puntuación", () => {
    view = render(
        <BrowserRouter>
            <ProductoUbicacion {...producto}/>
        </BrowserRouter>
    );
    
    expect(view.container).toHaveTextContent("Ta lindo");
});

test("Renderizado Estrellitas Conseguidas", () => {
    view = render(
        <BrowserRouter>
            <ProductoUbicacion {...producto}/>
        </BrowserRouter>
    );
    
    expect(view.container).toContainHTML('<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="conseguida" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>');
});

test("Renderizado Estrellitas No Conseguidas", () => {
    view = render(
        <BrowserRouter>
            <ProductoUbicacion {...producto}/>
        </BrowserRouter>
    );
    
    expect(view.container).toContainHTML('<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="no-conseguida" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>');
});

test("Renderizado Icono Ubicacion", () => {
    view = render(
        <BrowserRouter>
            <ProductoUbicacion {...producto}/>
        </BrowserRouter>
    );
    
    expect(view.container).toContainHTML('<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 327c-29.9 0-58 11.6-79.2 32.8A111.6 111.6 0 0 0 400 439c0 29.9 11.7 58 32.8 79.2A111.6 111.6 0 0 0 512 551c29.9 0 58-11.7 79.2-32.8C612.4 497 624 468.9 624 439c0-29.9-11.6-58-32.8-79.2S541.9 327 512 327zm342.6-37.9a362.49 362.49 0 0 0-79.9-115.7 370.83 370.83 0 0 0-118.2-77.8C610.7 76.6 562.1 67 512 67c-50.1 0-98.7 9.6-144.5 28.5-44.3 18.3-84 44.5-118.2 77.8A363.6 363.6 0 0 0 169.4 289c-19.5 45-29.4 92.8-29.4 142 0 70.6 16.9 140.9 50.1 208.7 26.7 54.5 64 107.6 111 158.1 80.3 86.2 164.5 138.9 188.4 153a43.9 43.9 0 0 0 22.4 6.1c7.8 0 15.5-2 22.4-6.1 23.9-14.1 108.1-66.8 188.4-153 47-50.4 84.3-103.6 111-158.1C867.1 572 884 501.8 884 431.1c0-49.2-9.9-97-29.4-142zM512 615c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z"></path></svg>');
});
