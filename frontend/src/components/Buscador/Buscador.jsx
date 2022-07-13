import React from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";

function Searchbar({ provincias }) {
  const inputDate = useRef(null);
  const [ fechas, setFechas ] = useState([null, null])
  const navigate = useNavigate();
  const [ calendarioDoble, setCalendarioDoble ] = useState(window.innerWidth > 450);
  const [ showCalendar, setShowCalendar ] = useState(false);

  
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 450){
          setCalendarioDoble(false);
      }else{
          setCalendarioDoble(true);
      }
  }
      window.addEventListener('resize', handleResize)
  }, []);
  return (
      <Container>
        <Title>Busca Casas, Hoteles y mucho más en la ciudad de tus sueños</Title>
        <Form onSubmit={(e) => {
          e.preventDefault();
          if (e.target.children[0].value === "Ciudades") return

          navigate("/productos/ciudad/" + e.target.children[0].value + "?fecha_inicio=" + fechas[0] + "&fecha_fin=" + fechas[1]);
        }}>
          <select name="ciudades" id="select">
            <option key={"citys"} selected disabled hidden>Ciudades</option>
            {provincias.map((city) => {
              return (
                <option value={city.id} key={city.id + "i"}>
                  {city.nombre}
                </option>
              );
            })}
          </select>
          <div>
            <div style={{"position":"relative"}}
            
            >
              <input type="text" 
              value={fechas[0]?`${fechas[0]} - ${fechas[1]}`:""} 
              placeholder="Seleccione fechas para reservar"
              readOnly
              onClick={
                (e) => {
                  e.preventDefault();
                  setShowCalendar(!showCalendar);
                }
              }/>
              <CalendarContainer className={`${showCalendar ? "show" : ""}`} 
              ref={inputDate}
                >
                        <Calendar   className={`react-calendar`}
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
                                defaultValue={fechas.map(f => new Date(f+"T00:00:00")) && [new Date(), new Date()]}
                                onChange={(e) => {
                                    setFechas(e.map(f => (new Date(f.setHours(0))).toISOString().split("T")[0]));
                                    setShowCalendar(false);
                                }}
                        />
                    </CalendarContainer>
            </div>
          </div>
          <Button type="submit">Buscar</Button>
        </Form>
      </Container>
    );
};



const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.20);
  min-height: 180px;
  align-items: center;
  justify-content: space-around;
  background-color: var(--contrast--dark);
  background: linear-gradient(
          rgba(0, 0, 0, 0.4), 
          rgba(0, 0, 0, 0.1)
        ), url("https://images.unsplash.com/photo-1520455470442-5d140eacec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80");
  background-size: cover;
  background-position-y: center;
  background-repeat: no-repeat;
  @media only screen and (min-width: 768px) {
    display: Flex;
    flex-direction: column;
    justify-content: center;
  }
  @media only screen and (min-width: 1366px) {
  }
`;
const Title = styled.h1`
  font-size: 25px;
  text-align: center;
  padding-bottom: 16px;
  color: var(--contrast--light);
`;
const Form = styled.form`
    width: 85vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    > div {
    margin: 10px 0;
    height: 39px;
    width: 100%;
      .e-input-group {
          background-color: var(--contrast--light);
          width: 100%;
          height: 100%;
          border-radius: 5px;
          font-size: 16px;
          padding-left: 10px;
      }
    }
    select, input {
    width: 100%;
    border-radius: 5px;
    padding: 10px;
    border: none;
    height: 40px;
    background-color: var(--contrast--light);}

    > option {
    background-color: var(--contrast--light);
        color: var(--contrast--black);
    }
    @media only screen and (min-width: 768px) {
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      > div {
        width: 35%;
      }
      select {
        width: 35%;
      }
    }
`;
const Button = styled.button`
height:40px;
width:164px;
margin-right:10px;
background-color:var(--color-primary);
border:none;
color:var(--contrast--light);
border-radius:5px;
font-size:16px;
cursor:pointer;
`;


const CalendarContainer = styled.div`
z-index:1;
display: none;
&.show {
  display: flex;
}
position: absolute;
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
@media only screen and (max-width: 750px){
    transform: translateX(0);
}
@media only screen and (max-width: 425px){
    transform: translateX(0);
    .react-calendar__month-view:first-child {
        border-right: none;
    }
}`;
export default Searchbar;