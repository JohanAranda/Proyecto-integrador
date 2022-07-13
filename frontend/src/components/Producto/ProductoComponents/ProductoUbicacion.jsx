import styledComponents from "styled-components";
import { AiFillEnvironment, AiFillStar } from "react-icons/ai"


const ProductoUbicacion = ({puntuacion, ciudad}) => {
    const estrellasTotales = 5
    const estrellasConseguidas = Math.ceil(puntuacion)
    const estrellasNoConseguidas = estrellasTotales - estrellasConseguidas

    const ratings = {
        1: "Áspero",
        2: "Medio Pelo",
        3: "Pasable",
        4: "Ta lindo",
        5: "Un lujo"
    }

    return (
        <Container>
            <Ubicacion>
                <Icono><AiFillEnvironment /></Icono>
                <div>
                    <p>{ciudad.nombre}, {ciudad.pais}</p>
                    <p className="distancia">A metros del centro</p>
                </div>
            </Ubicacion>
            <Rating>
                <div>
                    <p>{ratings[Math.round(puntuacion)] ?? "Muy Bueno"}</p>
                    <Estrellas>
                        {Array(estrellasConseguidas).fill(<AiFillStar className="conseguida"/>)}
                        {Array(estrellasNoConseguidas).fill(<AiFillStar className="no-conseguida"/>)}
                    </Estrellas>
                </div>
                <Puntaje>
                    <p>{puntuacion}</p>
                </Puntaje>
            </Rating>
        </Container>
    )
}

export default ProductoUbicacion

const Container = styledComponents.div`
color: var(--colorPrincipal);
background-color: #EEEFF2;
font-weight: 600;
text-align: left;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 2rem;

@media only screen and (max-width: 425px){
    padding: 0;
}
`

const Ubicacion = styledComponents.div`
display: flex;
@media only screen and (max-width: 425px){
    padding: 0.25rem;
    flex-basis: 100%;
    .distancia {
        display: none;
    }
}
`

const Rating = styledComponents.div`
display: flex;
align-items: center;
@media only screen and (max-width: 425px){
    flex-basis: 100%;
    justify-content: center;
}
`

const Icono = styledComponents.div`
margin-right: 0.5rem;
`

const Estrellas = styledComponents.div`
.conseguida{
    color: var(--colorSecundario)
}
.no-conseguida{
    color: gray;
}
`

const Puntaje = styledComponents.div`
background-color: var(--colorTerciario);
color: var(--colorCuarto);
text-align: center;
border-radius: 10px;
padding: 1rem;
margin: 0.5rem 0.5rem 0.5rem 1rem;
font-size 1.5rem;
`