import styledComponents from "styled-components";
import {AiOutlineLeft} from "react-icons/ai";
import { Link } from "react-router-dom";
import wallpaper from "../../Producto/plane-wallpaper.png";

const ProductoHeader = ({id, categoria, nombre }) => {
    return (
        <Header>
            <div>
                <p>{categoria.titulo.toUpperCase()}</p>
                <h2>{nombre}</h2>
            </div>
            <BackLink>
                <Link to={"/producto/" + id}> <AiOutlineLeft/> </Link>    
            </BackLink>
        </Header>
    )
}

export default ProductoHeader

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

const BackLink = styledComponents.div`
a {
    font-size: 48px;
    color: var(--colorCuarto)
    text-decoration: none;
}
`