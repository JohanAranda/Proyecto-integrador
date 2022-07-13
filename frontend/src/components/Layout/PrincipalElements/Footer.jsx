import styledComponents from "styled-components";
import {AiFillInstagram, AiFillFacebook, AiFillTwitterCircle, AiFillLinkedin} from "react-icons/ai";

const Footer = () => { 
    return <FooterDiv>
        <span>©2021 Digital Booking</span>
        <Socials>
            <a href=""><AiFillFacebook/></a><a href=""><AiFillLinkedin/></a><a href=""><AiFillTwitterCircle/></a><a href=""><AiFillInstagram/></a>
        </Socials>
    </FooterDiv>
}


const FooterDiv = styledComponents.div`
    background: var(--color-primary);
    
    padding: 0 1rem;
    bottom: 0;
    width: 100%; height: 58px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    transition: all 300ms ease-in-out;

    @media only screen and (max-width: 600px) {
        div {
            display: none;
        }
    }`

const Socials = styledComponents.div`
    display: flex;
    gap: 1rem;
    a {
        text-decoration: none;
        color: #FFF;
        svg {
            font-size: 24px;
        }
    }
    `


export default Footer;