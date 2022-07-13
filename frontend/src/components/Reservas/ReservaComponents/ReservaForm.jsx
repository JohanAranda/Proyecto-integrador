import styledComponents from "styled-components";
import Calendar from 'react-calendar';
import { BsCheckCircle } from "react-icons/bs";
import { AiFillEnvironment, AiFillStar } from "react-icons/ai"
import { useState, useEffect } from "react";
import { useContext } from "react";
import { User } from "../../Layout/TemplateResponsive";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../../../services/api";
const AM = [10, 11, 12, 13, 14, 15, 16, 17, 18]
const ReservaForm = ({ nombre, ciudad, puntuacion, categoria, imagenes, fecha_inicio, fecha_fin, reservas }) => {
    const [user, ] = useContext(User);
    const navigate = useNavigate();
    const { id } = useParams();
    const [fecha, setFecha] = useState([fecha_inicio, fecha_fin]);
    const [hora, setHora] = useState(AM[0]);

    const [calendarioDoble, setCalendarioDoble] = useState(window.innerWidth > 450);

    useEffect(() => {
        user||navigate("/login?reserva=1");
        function handleResize() {
            
            if (window.innerWidth < 450) {
                setCalendarioDoble(false);
            } else {
                setCalendarioDoble(true);
            }
        }
        window.addEventListener('resize', handleResize)
    }, [navigate, user])


    return (
        <Container>
            <Titulo>
                <h3>Completá tus datos</h3>
            </Titulo>
            <Form onSubmit={(e) => {
                e.preventDefault();
                const data = {
                    "fecha_inicio": fecha[0],
                    "fecha_fin": fecha[1],
                    "hora": e.target.children[2].querySelector("select").value.split("-")[0],
                    "producto": {
                        "id": id
                    }
                }
                const api = new Api();
                api.reservate(data).then(result => {
                    navigate("/reservaExitosa")
                })
            }}>
                <Datos>
                    <Input className="nombre">
                        <label for="nombre">Nombre</label>
                        <input id="nombre" type="text" name="nombre" defaultValue={user?.nombre} placeholder="Nombre" />
                    </Input>

                    <Input className="apellido">
                        <label for="apellido">Apellido</label>
                        <input id="apellido" type="text" name="apellido" defaultValue={user?.apellido} placeholder="Apellido" />
                    </Input>

                    <Input className="email">
                        <label for="email">Correo Electrónico</label>
                        <input id="email" type="email" name="email" defaultValue={user?.email} placeholder="Correo Electrónico" />
                    </Input>

                    <Input className="ciudad">
                        <label for="ciudad">Ciudad</label>
                        <input id="ciudad" type="text" name="ciudad" disabled defaultValue={ciudad.nombre} placeholder="Ciudad" />
                    </Input>
                </Datos>
                <Fecha>
                    <Titulo>
                        <h3>Seleccioná tu fecha de reserva</h3>
                    </Titulo>
                    <CalendarContainer>
                        <Calendar className="react-calendar"
                            showDoubleView={calendarioDoble}
                            defaultView="month"
                            minDate={new Date()}
                            minDetail="month"
                            showNavigation={true}
                            selectRange={true}
                            nextLabel={">"}
                            prevLabel={"<"}
                            prev2Label={null}
                            next2Label={null}
                            tileDisabled={({ date }) => {
                                if (reservas) {
                                    return reservas.some(reserva => {
                                        return new Date(reserva.fecha_inicio) <= date && new Date(reserva.fecha_fin) >= date;
                                    }
                                    )
                                } return true;   
                                }}
                            defaultValue={fecha[0]?fecha.map(f => new Date(f+"T00:00:00")):null}
                            onChange={(e) => {
                                setFecha(e.map(f => (new Date(f.setHours(0))).toISOString().split("T")[0]));
                            }}
                        />
                    </CalendarContainer>
                </Fecha>

                <Llegada>
                    <Titulo>
                        <h3>Tu horario de llegada</h3>
                    </Titulo>
                    <LlegadaCard>
                        <Check>
                            <BsCheckCircle className="check" />
                            <p>Tu habitación va a estar lista para el check-in entre las 10:00AM y las 11:00PM</p>
                        </Check>
                        <label for="hora-llegada" className="label-llegada">Indicá tu horario estimado de llegada</label>
                        <Select id="hora-llegada" name="hora-llegada" className="hora-llegada" onChange={(e) => {
                            setHora(e.target.value.split("-")[0])
                        }}>
                            {AM.map((hora) => {
                                return (
                                    <option value={hora + ":00:00"}>{hora}:00</option>
                                )
                            })}
                        </Select>
                    </LlegadaCard>
                </Llegada>

                <Detalles>
                    <Titulo className="titulo-detalle">
                        <h3>Detalle de la reserva</h3>
                    </Titulo>
                    <Imagen src={imagenes[0]?.url} alt="Una imagen de un hotel lindo" />
                    <Descripcion>
                        <p className="categoria">{categoria.titulo.toUpperCase()}</p>
                        <h2>{nombre}</h2>
                        {Array(Math.round(puntuacion)).fill(<AiFillStar className="conseguida" />)}
                        <Ubicacion>
                            <AiFillEnvironment />
                            <p>Av. UwU 90210, {ciudad.nombre}, {ciudad.pais}</p>
                        </Ubicacion>
                    </Descripcion>
                    <Horario className="check-in">
                        <p>Check In</p>
                        <div>
                            <span className="check-fecha">{fecha[0]}</span> a las <span className="check-hora">{hora}</span>
                        </div>
                    </Horario>
                    <Horario className="check-out">
                        <p>Check Out</p>
                        <p className="check-fecha">{fecha[1]}</p>
                    </Horario>
                    <div className="link">
                        <Boton> Confirmar Reserva </Boton>
                    </div>
                </Detalles>
            </Form>
        </Container>
    )
}

export default ReservaForm

const Form = styledComponents.form`
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(4, 1fr);
grid-column-gap: 2rem;
grid-row-gap: 0;
align-items: center;
input {
    line-height: 2.5rem;
    background-color: #EEEFF2;
    border: none;
    border-radius: 8px;
    margin-top: 0.5rem;
}
.link {
    text-decoration: none;
}
@media only screen and (max-width: 768px){
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
`

const Titulo = styledComponents.div`
padding-bottom: 1rem;
font-size: 1.5rem;
color: var(--colorPrincipal);
`

const Container = styledComponents.div`
background-color: #EEEFF2;
padding: 2rem;
`

const Datos = styledComponents.div`
grid-area: 1 / 1 / 2 / 3;
background-color: var(--colorQuinto);
border-radius: 8px;
padding: 1.5rem;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-template-rows: repeat(2, 1fr);
grid-column-gap: 1rem;
grid-row-gap: 2rem;
.nombre {
    grid-area: 1 / 1 / 2 / 2;
}
.apellido {
    grid-area: 1 / 2 / 2 / 3; 
}
.email {
    grid-area: 2 / 1 / 3 / 2;
}
.ciudad {
    grid-area: 2 / 2 / 3 / 3;
}
@media only screen and (max-width: 768px){
    padding-top: 2rem;
    padding-bottom: 2rem;
}
@media only screen and (max-width: 425px) {
    display: flex;
    flex-direction column;
}
`

const Detalles = styledComponents.div`
background-color: var(--colorQuinto);
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
border-radius: 8px;
grid-area: 1 / 3 / 5 / 4;
align-self: start;
.titulo-detalle{
    padding: 1rem;
}
.check-in {
    border-top: 1px solid var(--colorSexto);
    border-bottom: 1px solid var(--colorSexto);
}
.check-out {
    border-top: none;
    border-bottom: 1px solid var(--colorSexto);
}
@media only screen and (max-width: 768px){
    width: 100%;
}
`

const Fecha = styledComponents.div`
grid-area: 2 / 1 / 4 / 3;
@media only screen and (max-width: 768px){
    padding-top: 2rem;
    padding-bottom: 2rem;
}
`

const Llegada = styledComponents.div`
grid-area: 4 / 1 / 5 / 3;
font-weight: 500;
font-size: 1rem;
color: var(--colorPrincipal);
.check {
    font-size: 1.5rem;
    margin-right: 0.5rem;
}
.hora-llegada {
    width: 50%;
    display: block;
}
.label-llegada {
    display: block;
    font-size: 0.8rem;
    padding: 1rem 0 0.5rem;
}
@media only screen and (max-width: 768px){
    padding-bottom: 2rem;
}
`

const LlegadaCard = styledComponents.div`
padding: 1rem;
background-color: var(--colorQuinto);
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
border-radius: 8px;
`

const Input = styledComponents.div`
display: flex;
flex-direction: column;
label {
    color: var(--colorPrincipal);
    font-weight: 500;
    font-size: 0.8rem;
}
input {
    padding-left: 0.5rem;
    color: var(--colorPrincipal);
    font-weight: 500;
}
#ciudad {
    background-color: inherit;
}
`

const Check = styledComponents.div`
display: flex;
align-items: center;
`

const Select = styledComponents.select`

`

const Imagen = styledComponents.img`
object-fit: cover;
object-position: bottom;
width: 100%;
height: 300px;
@media only screen and (max-width: 768px){
    height: 400px;
}
`

const Boton = styledComponents.button`
text-align: center;
background-color: var(--colorSecundario);
border-radius: 8px;
width: 90%;
height: 3rem;
border: none;
color: var(--colorQuinto);
font-size: 1rem;
font-weight: 500;
margin: 2rem auto 1rem;
display: block;
`

const Descripcion = styledComponents.div`
color: var(--colorPrincipal);
font-weight: 600;
padding: 1rem;
.conseguida {
    color: var(--colorSecundario);
}
.categoria {
    font-size: 0.875rem;
    color: var(--colorTerciario);
}
`

const Ubicacion = styledComponents.div`
display: flex;
align-items: center;
padding: 1rem 0 2rem;
`

const Horario = styledComponents.div`
width: 90%;
margin: 0 auto;
padding: 2rem 1rem;
display: flex;
justify-content: space-between;
align-items: center;
font-weight: 500;
color: var(--colorSexto);
`

const CalendarContainer = styledComponents.div`
grid-area: 1 / 1 / 2 / 3;
.react-calendar {
    width: 100%;
    border-radius: 8px;
    border: none;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.react-calendar__month-view__weekdays__weekday{
    color: var(--colorPrincipal);
    font-weight: 900;
}
.react-calendar__month-view__weekdays__weekday > abbr{
    text-decoration: none;
}
.react-calendar__month-view__days__day--weekend{
    color: inherit;
}
.react-calendar__navigation__arrow {
    color: var(--colorPrimario);
    font-size: 1.5rem;
}
.react-calendar__navigation button:disabled,
.react-calendar__navigation button:focus{
    background-color: inherit;
}
.react-calendar__month-view:first-child {
    border-right: 2px solid var(--colorSexto);
}
.react-calendar__navigation__label__labelText {
    text-transform: capitalize;
    color: black;
    font-weight: bold;
}
@media only screen and (max-width: 425px){
    .react-calendar__month-view:first-child {
        border-right: none;
    }
}
`












