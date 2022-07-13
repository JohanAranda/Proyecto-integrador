import { Link } from "react-router-dom";
import styled from "styled-components";
import styledComponents from "styled-components";
import { useNavigate } from "react-router-dom";

const SinReservas = () => {
    let navigate = useNavigate();

    const volverAHome = () => {
        let path = '/';
        navigate(path);
    }

    return (
        <Parent>
            <Title> <h1> No hay reservas </h1> </Title>
            <TextoContainer>
                <Texto>
                    <p> <span> <strong>
                        No has realizado ninguna reserva todavía.
                    </strong> </span> </p>
                </Texto>
                <Texto>
                    <p> <span> <strong>
                        Volvé al inicio para encontrar tu próxima estadía
                    </strong> </span> </p>
                </Texto>
            </TextoContainer>
            <VolverAInicio>
                <Link to = "/" className="no-underline">
                <button className="btn-inicio" onClick={volverAHome}>Volver a Inicio</button>
                </Link>
            </VolverAInicio>
        </Parent>
    )

}

export default SinReservas;

const Parent = styled.div`
width: auto;
min-height: calc(100vh - 300px);
position: relative;
transform: translateY(-0%);
transition: all 300ms ease-in-out;
height: 100%;
@media only screen and (max-width: 600px) {
    padding: 60px 13% 0;
}
@media only screen and (min-width: 600px) {
    padding: 60px 27% 0;
}
@media only screen and (min-width: 768px) {
    padding: 60px 33% 0;
}
padding-top: 40px;

`
const Title = styledComponents.legend`
    font-family: Roboto;
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: center;
    color: var(--color-primary);
    margin-bottom: 30px;
    `

    const TextoContainer = styledComponents.div`
    font-family: Roboto;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    text-align: center;
    margin-bottom: 30px;
`

const Texto = styledComponents.div`
    padding top: 15px;
    margin-top: 15px;
span {
    font-size: 1.25rem;
    color: var(--colorPrincipal);
    padding-bottom: 2rem;
}
p {
    color: var(--colorSexto);
    font-weight: 500;
    padding-bottom: 1.5rem;
}
`

const VolverAInicio = styledComponents.div`
.no-underline {
    text-decoration: none;
}
.btn-inicio{
    text-align: center;
    background-color: var(--colorSecundario);
    border-radius: 8px;
    width: 90%;
    height: 3rem;
    border: none;
    color: var(--colorQuinto);
    font-size: 1rem;
    font-weight: 500;
    margin: 0 auto;
    display: block;
}
`
