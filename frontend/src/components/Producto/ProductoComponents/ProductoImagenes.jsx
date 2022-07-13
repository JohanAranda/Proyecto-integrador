import styledComponents from "styled-components";
import { useState, useEffect } from "react";
import { AiOutlineShareAlt, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';

// const imagenes = [
//     "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     "https://images.unsplash.com/photo-1531088009183-5ff5b7c95f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//     "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1421&q=80",
//     "https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
// ]

// const items = imagenes.map((imagen, index) => {
//     return <img src={imagen} className={"imagen-" + (index + 1) + " img-galeria"} alt="Foto linda de hotel lindo" role="presentation" key={index + 1}/>
// })

const responsive = {
    0: {
        items: 1
    },
    1024: {
        items: 5
    }
}

const ProductoImagenes = ({ nombre, imagenes }) => {
    const [favorito, setFavorito] = useState(false);
    const [loaded, setLoaded] = useState([false, false, false, false, false]);
    const [tablet, setTablet] = useState(window.innerWidth < 780);
    const agregarFavorito = () => {
        setFavorito(!favorito);
    }
    imagenes = imagenes?.sort((a, b) => a.id - b.id);
    const ratios = imagenes?.map((imagen, index) => {
        let image = new Image();
        image.src = imagen.url;
        let heightImage = image.height;
        let widthImage = image.width;
        let ratio = heightImage / widthImage;
        image.onerror = () => {
            imagenes[index] = {
                url: "https://bitsofco.de/content/images/2018/12/broken-1.png",
                titulo: "Imagen no disponible"
            };
            setLoaded([...loaded.slice(0, index), true, ...loaded.slice(index + 1)]);
        }
        if (index === imagenes.length - 1) image.onload = () => {
            setLoaded([...loaded.slice(0, index), true, ...loaded.slice(index + 1)]);
        }
        return ratio;
    })

    useEffect(() => {
        function handleResize() {

            if (window.innerWidth > 780) {
                setTablet(false);
            } else {
                setTablet(true);
            }
        }

        window.addEventListener('resize', handleResize)
    }, [])

    return (
        <Container>
            <Iconos>
                <AiOutlineShareAlt className="icono" />
                {favorito && <AiFillHeart className="icono favorito" onClick={agregarFavorito} />}
                {!favorito && <AiOutlineHeart className="icono" onClick={agregarFavorito} />}
            </Iconos>
            {tablet ?
                <AliceCarousel items={imagenes?.map((imagen, index) => {
        return <img src={imagen.url} className={"imagen-" + (index + 1) + " img-galeria"} alt={imagen.titulo} role="presentation" key={index + 1} />
    })}
                    autoPlay={true}
                    autoPlayInterval={3000}
                    autoPlayControls={false}
                    controlsStrategy="responsive"
                    infinite={true}
                    innerWidth={780}
                    responsive={responsive}
                    disableButtonsControls={true}
                    mouseTracking={true}
                /> :
                <Gallery id="my-gallery">
                    <ImagenContainer>
                        {imagenes.map((imagen, index) => {
                            let height = window.innerHeight - 50;
                            let width = height / ratios[index];
                            if (width > window.innerWidth - 50) {
                                width = window.innerWidth - 50;
                                height = width * ratios[index];
                            }
                            if (height > window.innerHeight - 50) {
                                height = window.innerHeight - 50;
                            }
                            if (imagen.url === "https://bitsofco.de/content/images/2018/12/broken-1.png") {
                                height = window.innerHeight - 50;
                                width = height / ratios[index];
                            }
                            return (
                                <Item original={imagen.url}
                                    thumbnail={imagen.url}
                                    width={width}
                                    height={height}
                                    key={"id-" + index}
                                    id={"id-" + index}
                                >
                                    {({ ref, open }) => (<img key={index + 1} className={"imagen-" + (index + 1)} id={"imagen-" + (index + 1)} onClick={open} ref={ref} src={imagen.url} alt={imagen.titulo} />)}
                                </Item>
                            )
                        })}
                    </ImagenContainer>
                </Gallery>}
                {loaded.reduce((acc, v) => acc && v, true) && <Modal></Modal>}
        </Container>
    )
}

export default ProductoImagenes

const Modal = styledComponents.div`
    position: absolute;
    top:0; bottom:0;
    left:0; right:0;
`

const ImagenContainer = styledComponents.div`
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-template-rows: repeat(2, 1fr);
grid-column-gap: 0.5rem;
grid-row-gap: 0.5rem;
img {
    object-fit: cover;
    object-position: bottom;
    width: 100%;
    height: 300px;
    border-radius: 8px;
}
.imagen-1 {
    grid-area: 1 / 1 / 3 / 3;
    height: 610px;
}
.imagen-2 {
    grid-area: 1 / 3 / 2 / 4;
}
.imagen-3 {
    grid-area: 1 / 4 / 2 / 5;
}
.imagen-4 {
    grid-area: 2 / 3 / 3 / 4;
}
.imagen-5 {
    grid-area: 2 / 4 / 3 / 5;
}
padding: 1rem 2rem 1rem;
`

const Iconos = styledComponents.div`
padding: 1rem 2rem 0;
text-align: left;
font-size: 1.5rem;
color: var(--colorTerciario);
.favorito {
    color: red;
}
.icono{
    margin-right: 1rem;
    cursor: pointer;
}
`

const Container = styledComponents.div`
background-color: var(--colorQuinto);
position:relative;
.img-galeria {
    object-fit: cover;
    object-position: bottom;
    width: 100%;
    height: 400px;
}
.ver-mas {
    position: relative;
    bottom: 50px;
    left: 44%;
    color: var(--colorQuinto);
    font-weight: 900;
    background-color: var(--color-primary);
    padding: 0.5rem 1rem;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
    border-radius: 8px;
}
`