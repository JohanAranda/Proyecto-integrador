import styledComponents from "styled-components";
import * as Icons from "react-icons/fa";

const ProductoCaracteristicas = ({ caracteristicas }) => {

    return (
        <Container>
            <Titulo>
                <h3>¿Qué ofrece este lugar?</h3>
            </Titulo>
            <CaracteristicaContainer>
                {caracteristicas?.map((caracteristica, index) => {
                    let Icono = Icons[caracteristica.icono];
                    if (!Icono) {
                        Icono = Icons.FaQuestionCircle;
                    }
                    return (
                        <Caracteristica key={index}>
                            <p><span><Icono /></span>{caracteristica.name}</p>
                        </Caracteristica>
                    )
                })}
            </CaracteristicaContainer>
        </Container>
    )
}

export default ProductoCaracteristicas

const Container = styledComponents.div`
padding-top: 1rem;
width: 100%;
text-align: left;
background-color: var(--colorQuinto);
`

const Titulo = styledComponents.div`
padding-bottom: 1rem;
font-size: 1.5rem;
color: var(--colorPrincipal);
border-bottom: 2px solid var(--colorSecundario);
h3 {
    padding-left: 2rem;
}
`

const Caracteristica = styledComponents.div`
color: var(--colorSexto);
font-weight: 500;
font-size: 1rem;
span {
    color: var(--colorSecundario);
    margin-right: 0.5rem;
}
@media only screen and (max-width: 380px){
    font-size: 0.875rem;
}
@media only screen and (max-width: 350px){
    font-size: 0.75rem;
}
`

const CaracteristicaContainer = styledComponents.div`
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-auto-rows: 26px;
grid-column-gap: 0px;
grid-row-gap: 1.5rem;
align-items: center;
padding: 2rem 3rem;

@media only screen and (max-width: 768px){
    grid-template-columns: repeat(2, 1fr);
}
@media only screen and (max-width: 380px){
    padding: 0.5rem 3rem;

}
`