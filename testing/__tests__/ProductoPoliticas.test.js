import React from "react";
import { render } from "@testing-library/react";
import ProductoPoliticas from "../components/Producto/ProductoComponents/ProductoPoliticas";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';


let view = null;

test("Renderizado Titulo Políticas", () => {
    view = render(
        <BrowserRouter>
            <ProductoPoliticas/>
        </BrowserRouter>
    );

    expect(view.container).toHaveTextContent("¿Qué tenés que saber?");
});

test("Renderizado Texto Normas de la Casa", () => {
    view = render(
        <BrowserRouter>
            <ProductoPoliticas/>
        </BrowserRouter>
    );

    expect(view.container).toHaveTextContent("Normas de la casa");
    expect(view.container).toHaveTextContent("Check-out: 10:00am");
    expect(view.container).toHaveTextContent("No se permiten fiestas");
    expect(view.container).toHaveTextContent("No fumar");
});

test("Renderizado Texto Salud y Seguridad", () => {
    view = render(
        <BrowserRouter>
            <ProductoPoliticas/>
        </BrowserRouter>
    );

    expect(view.container).toHaveTextContent("Salud y seguridad");
    expect(view.container).toHaveTextContent("Check-out: 10:00am");
    expect(view.container).toHaveTextContent("No se permiten fiestas");
    expect(view.container).toHaveTextContent("No fumar");
});

test("Renderizado Texto Política de cancelación", () => {
    view = render(
        <BrowserRouter>
            <ProductoPoliticas/>
        </BrowserRouter>
    );

    expect(view.container).toHaveTextContent("Política de cancelación");
    expect(view.container).toHaveTextContent("Agregá las fechas de tu viaje para obtener los detalles de la cancelación de esta estadía.");
});
