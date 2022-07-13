import styledComponents from "styled-components";
import {AiFillStar} from "react-icons/ai";
import {MdLocationPin} from "react-icons/md";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import { useRef } from "react";
const defaultImage = "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870";


const ratings = {
    1: "Áspero",
    2: "Medio Pelo",
    3: "Pasable",
    4: "Ta lindo",
    5: "Un lujo"
}

const ListadoCard = ({ id, nombre, descripcion, puntuacion, ciudad, categoria, imagenes, caracteristicas, fechaInicio, fechaFin }) => {
    const ref = useRef();

    return <Parent className="listado-card" onClick={() => {
        ref.current.click();
    }}>
        <img src={imagenes[0]?.url ?? defaultImage} alt="" />

        <div className="descripcion-listado">
            <div className="d1">
                <div className="d2">
                    <div>
                        <h3>{categoria.titulo.toUpperCase()}
                        </h3> <div>{<><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></>}</div>
                    </div>
                    <h2>{nombre}</h2>
                </div>
                <div className="d3">
                    <div>{puntuacion}</div>
                    <h5>{ratings[Math.round(puntuacion)] ?? "Muy Bueno"}</h5>
                </div>
            </div>
            <h4><MdLocationPin/>     En {ciudad.nombre}<strong> MOSTRAR EN EL MAPA</strong></h4>
            <div className="icons">
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
            </div>
            <P>{descripcion}</P>
            <Link ref={ref} to={fechaInicio?"/producto/" + id + "?fecha_inicio=" + fechaInicio + "&fecha_fin=" + fechaFin:"/producto/" + id}>
                <div className="boton-vermas">
                    <button>Ver más</button>
                </div>
            </Link>

        </div>
    </Parent>
}

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

const P = styledComponents.p`
    height: 50px;
    overflow: hidden;
    text-align: justify;
    background: linear-gradient(black,white);
    -webkit-background-clip: text;
    color: transparent;  `;

const Parent = styledComponents.div`
    display: flex;
    transition: all 0.1s ease-in-out;
    width: calc(50% - 20px);
    box-shadow: 0px 4px 4px 0px #00000040;
    background-image: linear-gradient(120deg, #fdfbfb 0%, #fff 100%);
    border-radius: 10px;
    @media only screen and (max-width: 600px) {
        flex-direction: column;
    }
    @media only screen and (max-width: 1000px) {
        width: 100%;
        
    }
    img {
        width: 50%;
        border-radius: 8px 2px 2px 8px;
        box-shadow: 5px 0px 5px -3px #00000040;
        object-fit: cover;
        min-width: 40%;
        max-width: 40%;
        height: 250px;
        @media only screen and (max-width: 600px) {
            border-radius: 8px;
            box-shadow: 0px 5px 5px -3px #00000040;
            width: 100%;
            max-width: 100%;
        }

    }
    .descripcion-listado {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px;
        width: 100%;
    }
    .icons {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: 0 10px 10px;
    }
    h4 {
        text-align: left;
    }
    div {
        display: flex
    }
    .d1 {
        justify-content: space-between;
        align-items: center;

    }
    .d2, .d3 {
        flex-direction: column;
        width: 100%;
    }
    .d2 {
        align-items: flex-start;
        width: 200%;
        svg {
            color: #1DBEB4;
            
        }
    }
    .d3 {
        align-items: flex-end;
        div {
            padding: 5px 6px;
            left: 65px;
            top: 0px;
            border-radius: 10px;
            background: #383B58;
            font-family: Roboto;
            font-size: 20px;
            font-weight: 700;
            line-height: 23px;
            letter-spacing: 0em;
            text-align: center;
            color: #FFFFFF;
            display: flex;
            justify-content: center;


        }
    }
    h2 {
        font-size: 20px;
        font-weight: bold;
        margin: 0;
        text-align: left;
        padding-left: 0px; !important
    }
    h3 {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
        color: var(--contrast--dark);
        margin-right: 10px;
    }

    strong {
        margin-left: 10px;
        font-size: 12px;
        color: var(--contrast--dark);
    }
    button {
        width: 100%;
        height: 40px;
        background-color: var(--color-primary);
        border: none;
        border-radius: 5px;
        color: var(--contrast--light);
        font-size: 16px;
        text-decoration: none;
    }
    a {
        width: 100%;
        color: var(--contrast--light);
        font-size: 30px;
        text-decoration: none;
    }
    &:hover {
        box-shadow: 0px 4px 10px 0px #00000030;
    }
    .conseguida{
        color: var(--colorSecundario);
    }
    .no-conseguida{
        color: gray;
    }
    `;


export default ListadoCard;