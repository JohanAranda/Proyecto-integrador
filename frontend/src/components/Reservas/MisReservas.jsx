import styledComponents from "styled-components";
import {AiOutlineLeft} from "react-icons/ai";
import * as Icons from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiFillEnvironment, AiFillStar } from "react-icons/ai";
import wallpaper from "../../components/Producto/plane-wallpaper.png";
import SinReservas from "./SinReservas";
import Api from "../../services/api";

const MisReservas = () => {
    const [reservas, setReservas] = useState([]);

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    }

    const handleClick = (event, idReserva) => {
        const api = new Api();
        api.deleteReservaUsuario(idReserva).then(res => console.log("Borrado"))
    }

    useEffect(() => {
        const api = new Api();
        api.getReservasUsuario().then(reservas => {
            console.log(reservas)
            setReservas([...reservas]);
        });
        scrollToTop();
    }, []);

    return (
        <Container>
          <Header>
            <div>
                <p>{"Reservas".toUpperCase()}</p>
                <h2>{"Mis Reservas"}</h2>
            </div>
            <BackLink>
                <Link to={"/"}> <AiOutlineLeft/> </Link>    
            </BackLink>
          </Header>
          {reservas.length === 0 && <SinReservas/>}      
          <Reservas>
                {reservas.length !== 0 && reservas.map((reserva) => {
                    return (
                        <DatosReserva key={reserva.id}>
                            <Descripcion>
                                <div>
                                    <p className="categoria">{reserva.producto.categoria.titulo.toUpperCase()}</p>
                                    <h2>{reserva.producto.nombre}</h2>
                                    {Array(Math.round(reserva.producto.puntuacion)).fill(<AiFillStar className="conseguida" />)}
                                </div>
                                <Ubicacion>
                                        <AiFillEnvironment />
                                        <p>Calle Falsa 1234, {reserva.producto.ciudad.nombre}, {reserva.producto.ciudad.pais}</p>
                                </Ubicacion>
                            </Descripcion>
                            <Imagen src={reserva.producto.imagenes[0]?.url} alt="Una imagen de un hotel lindo" />
                            <Caracteristicas>
                                {reserva.producto.caracteristicas?.map((caracteristica, index) => {
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
                            </Caracteristicas>
                            <Fechas>
                                <Fecha>
                                    <p>Fecha de llegada</p>
                                    <p>{new Date(reserva.fecha_inicio).toISOString().split("T")[0]}</p>
                                </Fecha>
                                <Fecha>
                                    <p>Fecha de salida</p>
                                    <p>{new Date(reserva.fecha_fin).toISOString().split("T")[0]}</p>
                                </Fecha>
                                <Fecha>
                                    <p>Horario de llegada</p>
                                    <p>{reserva.hora}hs</p>
                                </Fecha>
                                <Link to={"/producto/" + reserva.producto.id} className="btn-link">
                                    <Boton className="boton-vermas">
                                        Ver detalles del lugar
                                    </Boton>
                                </Link>
                                <Boton className="boton-eliminar" onClick={(e) => {handleClick(e, reserva.id)}}>
                                        Eliminar Reserva
                                </Boton> 
                            </Fechas>
                        </DatosReserva>
                    )
                })}
          </Reservas>
        </Container>
    )
}

export default MisReservas


const Header = styledComponents.div`
background-color: var(--colorTerciario);
background-image: url(${wallpaper});
background-size: cover;
background-position: center;
box-shadow: inset 0px 4px 4px 0px #00000040;
color: var(--colorCuarto);
text-align: left;
display: flex;
justify-content: space-between;
padding: 1rem 2rem 0;
@media only screen and (max-width: 425px) {
    background-size: initial;
}
h2 {
    font-size: 1.5rem;
}
p {
    font-size: 0.875rem;
}
`

const Container = styledComponents.div`
min-height: calc(100vh - 160px);
.btn-link {
    text-decoration: none;
}
`

const BackLink = styledComponents.div`
a {
    font-size: 48px;
    color: var(--colorCuarto)
    text-decoration: none;
}
`

const Reservas = styledComponents.div`
width: 100%;
padding: 2rem;
`

const DatosReserva = styledComponents.div`
display: grid;
padding-left: 0.375rem;
margin-bottom: 2rem;
grid-template-columns: repeat(4, 1fr);
grid-template-rows: repeat(5, 1fr);
grid-column-gap: 0.375rem;
grid-row-gap: 0px;
border-radius: 8px;
align-items: center;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
@media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding-right: 0.375rem;
}
`

const Boton = styledComponents.button`
text-align: center;
border-radius: 8px;
width: 100%;
height: 3rem;
border: none;
color: var(--colorQuinto);
font-size: 1rem;
font-weight: 500;
margin: 1rem auto 1rem;
display: block;
`

const Descripcion = styledComponents.div`
grid-area: 1 / 1 / 2 / 3;
padding: 0.375rem;
display: flex;
justify-content: space-between;
align-items: center;
color: var(--colorPrincipal);
font-weight: 600;
.conseguida {
    color: var(--colorSecundario);
}
.categoria {
    font-size: 0.875rem;
    color: var(--colorTerciario);
}
border-bottom: solid 2px;
`

const Ubicacion = styledComponents.div`
display: flex;
p {
    margin-left: 1rem;
}
`

const Caracteristicas = styledComponents.div`
grid-area: 2 / 1 / 3 / 3;
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-auto-rows: 26px;
grid-column-gap: 0px;
grid-row-gap: 1.5rem;
align-items: center;
padding: 0.5rem 2rem;
@media only screen and (max-width: 768px){
    grid-template-columns: repeat(2, 1fr);
}
@media only screen and (max-width: 380px){
    padding: 0.5rem 3rem;

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

const Imagen = styledComponents.img`
grid-area: 1 / 3 / 6 / 5;
border-radius: 8px;
object-fit: cover;
width: 100%;
height: 450px;
`

const Fechas = styledComponents.div`
grid-area: 3 / 1 / 6 / 3;
.boton-vermas {
    background-color: var(--colorSecundario);
}
.boton-eliminar {
    background-color: #dc3545;
}
`

const Fecha = styledComponents.div`
display: flex;
justify-content: space-between;
padding: 0.375rem;
font-weight: 500;
color: var(--colorSexto);
    &:first-child {
        padding-top: 0.625rem;
        border-top: solid 1px;
    }
    &:nth-child(3) {
        border-bottom: solid 1px;
        padding-bottom: 0.625rem;
    }
`