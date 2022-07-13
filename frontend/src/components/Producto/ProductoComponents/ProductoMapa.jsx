import styledComponents from "styled-components";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from "react";

const ProductoMapa = ({ nombre, categoria, ciudad }) => {

    const [position, setPosition] = useState(null);

    function ChangeView({ center, zoom }) {
        const map = useMap();
        center = {
            lat: center[0],
            lng: center[1]
        }
        map.setView(center, zoom);
        return null;
      }

    useEffect(() => {
        ciudad?.lat&&setPosition([ciudad.lat, ciudad.lgn]);
    }, [ciudad]);

    return (
        position ? <Container id="map">
            <Titulo>
                <h3>¿Dónde vas a estar?</h3>
            </Titulo>
            <Ubicacion>
                <p>{ciudad.nombre}</p>
            </Ubicacion>
            <MapContainer center={position} zoom={6} scrollWheelZoom={false} style={{"zIndex":"0"}}>
                <ChangeView center={position} zoom={6} /> 
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        {nombre} <br /> {categoria.titulo} con barba.
                    </Popup>
                </Marker>
            </MapContainer>
        </Container> : <div></div> 
    )
}

export default ProductoMapa;

const Container = styledComponents.div`
padding-top: 1rem;
width: 100%;
text-align: left;
background-color: var(--colorQuinto);
z-index: -10;
.leaflet-container {
    width: 96%;
    margin: 0 auto;
    height: 600px;
    border-radius: 12px;
}
@media only screen and (max-width: 425px){
    .leaflet-container {
        height: 300px;
    }
}
`

const Titulo = styledComponents.div`
padding-bottom: 1rem;
font-size: 1.5rem;
color: var(--colorPrincipal);
border-bottom: 2px solid var(--colorSecundario);
h3 {
    padding-left: 2rem;
}
`

const Ubicacion = styledComponents.div`
padding: 1rem 2rem;
color: var(--colorSexto);
font-weight: 500;
font-size: 1rem;
`