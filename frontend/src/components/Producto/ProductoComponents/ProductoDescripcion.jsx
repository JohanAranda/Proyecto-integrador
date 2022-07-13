import styledComponents from "styled-components";

const ProductoDescripcion = ({descripcion, ciudad, categoria}) => {
    const arrayDescripcion = descripcion.split(".");
    const particion = Math.ceil(arrayDescripcion.length / 2)
    return (
        <Container>
            <Titulo>
                <h3>Alojate en {categoria.titulo === "Hoteles" ? "uno de los mejores" : "el más mejor"} {categoria.titulo} de {ciudad.nombre}</h3>
            </Titulo>
            <Descripcion>
                {descripcion && <p>{arrayDescripcion.slice(0, particion)}.</p>}
                {descripcion && <p>{arrayDescripcion.slice(particion, arrayDescripcion.length - 1)}.</p>}
                {!descripcion && <p>La descripción de este producto no ha sido brindada todavía.</p>}             
            </Descripcion>
        </Container>
    )
}

export default ProductoDescripcion

const Container = styledComponents.div`
text-align: left;
padding: 2rem 2rem 0;
background-color: var(--colorQuinto);
`

const Titulo = styledComponents.div`
padding-bottom: 1rem;
font-size: 1.5rem;
color: var(--colorPrincipal);
`

const Descripcion = styledComponents.div`
p{
    padding: 1rem 0 1rem;
    color: var(--colorSexto);
    font-weight: 500;
}
`
