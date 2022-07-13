import UserName from "../../Login/UserName";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { User } from "../TemplateResponsive";
import { useContext } from "react";
import { useRoutes } from "react-router-dom";

const Buttons = () => {
    const [user,] = useContext(User);
    let routes = useRoutes(user ? [
        {
            path: "/*",
            element: <>
            <Link to="/mis-reservas"><button>Mis Reservas</button></Link>
            {user.rol.id === 1 && <Link to="/administracion"><button>Administración</button></Link>}
            </>
        },
        
    ] : [

        {
            path: "/register",
            element: <><Link to="/"><button>Inicio</button></Link><Link to="/login"><button>Iniciar Sesion</button></Link></>
        },
        {
            path: "/login",
            element: <><Link to="/"><button>Inicio</button></Link><Link to="/register"><button>Registrarse</button></Link></>
        },
        {
            path: "/*",
            element: <><Link to="/register"><button>Registrarse</button></Link><Link to="/login"><button>Iniciar Sesion</button></Link></>
        }
    ]);
    return routes;
}

const Nav = ({ showNav }) => {

    return <NavScreen className={showNav || "isEnter"}>
        <Buttons />
        <UserName className={"nav"} />

    </NavScreen>
}
const NavScreen = styled.div`
    @media only screen and (max-width: 600px) {
        span {
            display: none;
        }
        z-index: 1;
    &.isEnter {
        transform: translateX(100vw);
    }

    background: #FFF;
    position: absolute;
    top: 100px; right: 0;
    width: 80%; height: 87.5vh;
    padding: 2rem 1rem;
    display: flex;
    box-shadow: 0px 10px 10px -10px rgba(0,0,0,0.1) inset, -10px 0px 10px -10px rgba(0,0,0,0.1);
    transition: all 100ms ease-in-out;
        flex-direction: column;
        align-items: stretch;
        text-align: end;
        gap: 1rem;
        a {
            padding: 0 1rem;
            border-bottom: 1px solid #777;
            height: 2rem;
            text-decoration: none;
            button {
            list-style: none;
            color: #000;
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 300;
            font-size: 20px;
            line-height: 23px;
            border: none;
            background: none;
        }
            
        }
    }
    @media only screen and (min-width: 600px) {
        span {
            display: none;
        }
        button {
            
    @media only screen and (min-width: 600px) {
        width: 164px;
    }
    @media only screen and (min-width: 768px) {
        width: 206px;
    }
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    padding: 10px;
    gap: 10px;

    background: #FFFFFF;
    border: 1px solid #1DBEB4;
    border-radius: 5px;

    font-style: normal;
    font-size: 16px;
    line-height: 19px;

    color: #1DBEB4;
        }
        display: flex;
    align-items: end;
    gap: 2vw;
    a {
        text-decoration: none;
    }
    span {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 300;
        font-size: 20px;
        line-height: 23px;
    }
    img {
        height: 75px;
    }
    }
    @media only screen and (min-width: 768px) {
        span {
            display: inline;
        }
    }
    
}
`;



export default Nav;