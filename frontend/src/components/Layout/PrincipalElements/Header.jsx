import Logo from "../minicomponents/Logo";
import UserName from "../../Login/UserName";
import Nav from "../minicomponents/Nav";
import { useState } from "react";
import {GiHamburgerMenu} from "react-icons/gi";
import {IoIosArrowBack} from "react-icons/io";
import {Routes, Route, Link} from "react-router-dom";
import styled from "styled-components";
import { User } from "../TemplateResponsive";
import { useContext } from "react";
const Header = () => {
    const [showNav, setShowNav] = useState(false);

    return <HeaderDiv>

        <LogoSlogan><Link to="/"><Logo/></Link></LogoSlogan>
        <LogoSlogan>
        
        
        
        <div className="burger">
            <NavIcon onClick={() => {setShowNav(!showNav)}}>{showNav?<IoIosArrowBack style={{"transform": "rotate(180deg)"}}/>:<GiHamburgerMenu/>}</NavIcon>
            <Nav showNav={showNav}/>
        </div>
        </LogoSlogan>
    </HeaderDiv>
}




const HeaderDiv = styled.div`
    z-index: 10;
    background: #FFF;
    background-image: linear-gradient(185deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 0 1rem;
    top: 0;
    width: 100%; height:80px;
    display: flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
    transition: all 300ms ease-in-out;
    .burger {
        &>:first-child {
            display:none;
        }
        @media only screen and (max-width: 600px) {
            &>:first-child {
                display:block;
            }

    `

const LogoSlogan = styled.div`
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
        height: 65px;
    }
    @media only screen and (max-width: 600px) {
        span {
            display: none;
        }
    }
    @media only screen and (min-width: 600px) {
        span {
            display: none;
        }
    }
    @media only screen and (min-width: 768px) {
        span {
            display: inline;
        }
    }



    `

const NavIcon = styled.button`
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    margin-right: 2rem;
    svg {
        font-size: 24px;
    }
    `



export default Header;