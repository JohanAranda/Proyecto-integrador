import styledComponents from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { User } from "../Layout/TemplateResponsive";

const UserName = ({className}) => { 
    const Navigate = useNavigate();
    const [user, ] = useContext(User);
    if (!user) return null;

    
    return <Div className={className}>
    <div>
        <Icono>
            {user&&[user?.nombre, user?.apellido].reduce((acc, e)=>acc+e[0], "")}
        </Icono>
    </div>
        <Button onClick={() => {Navigate("/logout?redirect=" + window.location.pathname);}}>Cerrar Sesión</Button></Div> ; 
 }

 const Div = styledComponents.div`
        @media only screen and (max-width: 600px) {
            display:flex;
            justify-content: flex-end;
            align-items: flex-end;
            gap: 3vw;
            padding: 0 1rem 2rem;
            background: var(--color-primary);
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            height: 8rem;
            p {
                background: white;
            }
        }
        @media only screen and (min-width: 600px) {
            display:flex;
            gap: 1rem;
            align-items: center;
            > :nth-child(1) {
                margin-right: 2rem;
            }
    }`;

 const Icono = styledComponents.p`
    background: var(--color-primary);
    border-radius: 50%;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2) inset;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 300;
    font-size: 20px;
    line-height: 23px;
    `
    
    const Button = styledComponents.button`
    order: -1;
    
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
    
`

export default UserName;