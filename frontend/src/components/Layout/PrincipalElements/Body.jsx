import React from "react";
import Buscador from "../../Buscador/Buscador";
import CategoryCard from "../../Redirects/CategoryCard";
import ProvinciasCard from "../../Redirects/ProvinciasCard";
import styledComponents from "styled-components";
import Api from "../../../services/api";
import { Routes,
    Route, Navigate } from "react-router-dom";
import ListadoRandom from "../../Listado/ListadoRandom";
import ListadoCiudad from "../../Listado/ListadoCiudad";
import ListadoCategoria from "../../Listado/ListadoCategoria";


class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categorias: [],
            productos: [],
            provincias: []
        };
        this.api = new Api();
    }
    componentDidMount() {
        document.title = "Barbudos y maga";
        this.api.getCategorias().then(result => {
            this.setState(prevState => ({...prevState, categorias: result}));
        });
        this.api.getProductosRandom().then(result => {
            this.setState(prevState => ({...prevState, productos: result}));
        });
        this.api.getCiudades().then(result => {
            this.setState(prevState => ({...prevState, provincias: result}));
    });
    }
    render() {
        return (
            <Parent>
                <Buscador provincias={this.state.provincias} />
                <Categories>
                <h2>Busca por tipo de alojamiento</h2>
                <Overflow>
                <Redirects >
                    {
                        this.state.categorias.map((categoria) => {
                            return <CategoryCard key={categoria.id} {...categoria} />
                        })
                    }
                </Redirects>
                </Overflow>
                <h2>Busca por ciudad</h2>
                <Overflow>
                <Redirects className="provincias" >
                    {
                        this.state.provincias.map((provincia) => {
                            return <ProvinciasCard key={provincia.id} {...provincia} />
                        })
                    }
                </Redirects>
                </Overflow>
                </Categories>
                <Routes>
                    <Route path="/productos/categoria/:idCategoria" element={<ListadoCategoria />} />
                    <Route path="/productos/ciudad/:idCiudad" element={<ListadoCiudad />} />
                    <Route path="/" element={<ListadoRandom />} />
                    <Route path="*" element={<Navigate to={"/error"}></Navigate>} />
                </Routes>
            </Parent>
        );
    }
}

const Overflow = styledComponents.div`
    overflow-y:auto;
    width: 100%;
    &:last-child {
        box-shadow: 0px -10px 10px -10px rgba(0, 0, 0, 0.1) inset;
    }
    
        
`
const Categories = styledComponents.div`
background: rgba(196, 196, 196, .2);
`;

const Parent = styledComponents.div`
    > * > h2, > h2 {
        text-align: left;
        font-family: Roboto;
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: 0em;
        text-align: left;
        padding: 20px 40px;
        color: #383B58;
    }

    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
    `

const Redirects = styledComponents.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 20px;
    flex-wrap: wrap;
    padding: 0 43px 20px;
    gap: 10px;
    @media only screen and (max-width: 375px) {
        flex-wrap:nowrap;
        overflow-y:auto;
        width: 400%;
    }
    &.provincias {
        flex-wrap:nowrap;
        float: left;
    }

    `

export default Body;
