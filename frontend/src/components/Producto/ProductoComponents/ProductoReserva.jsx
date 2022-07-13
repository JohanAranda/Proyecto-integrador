import styledComponents from "styled-components";
import Calendar from 'react-calendar';
import { useState, useEffect, useContext } from "react";
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router";
import { User } from "../../Layout/TemplateResponsive";

const ProductoReserva  = ({productoId, fechaInicio, fechaFin, reservas}) => {
    const [ calendarioDoble, setCalendarioDoble ] = useState(window.innerWidth > 450);
    const [fecha, setFecha] = useState([fechaInicio, fechaFin]);
    const [ user ] = useContext(User);
    const navigate = useNavigate();
    console.log(reservas)

    useEffect(() => {
        function handleResize() {
        if (window.innerWidth < 450){
            setCalendarioDoble(false);
        }else{
            setCalendarioDoble(true);
        }
    }
        window.addEventListener('resize', handleResize)
    })

    const NotLoggedIn = () => {
        if (!user){
            return navigate("/login?reserva=1");
        } else if (!fecha[0] || !fecha[1]){
            return navigate("/producto/" + productoId + "/reserva");
        }
        else {
            return navigate(`/producto/${productoId}/reserva?fecha_inicio=${fecha[0]}&fecha_fin=${fecha[1]}`);
        }
    }

    return (
        <Container>
            <Titulo>
                <h3>Fechas Disponibles</h3>
            </Titulo>
            <ReservaContainer>
                <CalendarContainer>
                    <Calendar   className="react-calendar"
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
                            defaultValue={(fechaInicio && fechaFin) ? fecha?.map(f => new Date(f+"T00:00:00")) : [new Date(), new Date()]}
                            onChange={(e) => {
                                setFecha(e.map(f => (new Date(f.setHours(0))).toISOString().split("T")[0]));
                            }}
                    />
                </CalendarContainer>
                <IniciarReserva>
                    <p>Agregá tus fechas de viaje para obtener precios exactos</p>
                    <button className="btn-reserva" onClick={NotLoggedIn}>Iniciar Reserva</button>
                </IniciarReserva>
            </ReservaContainer>
        </Container>    
    )
}

export default ProductoReserva;

const Container = styledComponents.div`
background-color: #EEEFF2;
padding-bottom: 1rem;
`

const IniciarReserva = styledComponents.div`
height: 150px;
grid-area: 1 / 3 / 2 / 4;
background-color: var(--colorQuinto);
border-radius: 8px;
width: 100%;
text-align: left;
font-size: 1.125rem;
font-weight: 600;
color: var(--colorSexto);
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
.btn-reserva{
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
.btn-reserva:hover{
    filter: brightness(85%)
}
p{
    width: 90%;
    margin: 0 auto;
    padding: 1.25rem 0;
}
@media only screen and (max-width: 768px) {
    background-color: inherit;
    height: auto;
    padding-top: 2rem;
    display: flex;
    align-items: center;
    font-size: 1rem;
    box-shadow: none;
}
@media only screen and (max-width: 425px) {
    display: block;
    padding-top: 0;
    p{
        width: 100%;
    }
    .btn-reserva {
        width: 100%;
    }
}
`

const Titulo = styledComponents.div`
font-size: 1.5rem;
color: var(--colorPrincipal);
text-align: left;
padding: 1rem 2rem;
`

const ReservaContainer = styledComponents.div`
display: grid;
align-items: center;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: 1fr;
grid-column-gap: 2rem;
grid-row-gap: 0px;
padding: 0 2rem 2rem;
@media only screen and (max-width: 768px) {
    display: block;
}
@media only screen and (max-width: 425px) {
    padding: 0 1rem 1rem;
}
`

const CalendarContainer = styledComponents.form`
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