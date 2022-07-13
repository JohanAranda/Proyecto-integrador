import React, { useState, useEffect, useRef } from "react";
import Api from "../../services/api";
import { AiOutlineLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import wallpaper from "../../components/Producto/plane-wallpaper.png";

import styledComponents from "styled-components";
import Producto from "../Producto/Producto";
import ListadoCard from "../Listado/ListadoCard";

const Administracion = (props) => {
  const [categorias, setCategorias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const navigate = useNavigate();
  const form = useRef(null);

  useEffect(() => {
    const api = new Api();
    api.getCategorias().then((result) => {
      setCategorias(result);
    });
  }, []);

  useEffect(() => {
    const api = new Api();
    api.getCiudades().then((result) => {
      setCiudades(result);
    });
  }, []);

  useEffect(() => {
    const api = new Api();
    api.getCaracteristicas().then((result) => {
      setCaracteristicas(result);
    });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    const api = new Api();

    const caracts = Array.from(form.current.querySelectorAll('input[type="checkbox"]:checked'));

    const data = {
      "nombre": form.current.querySelector("#nombre-propiedad").value,
      "descripcion": form.current.querySelector("#descripcion").value,
      "puntuacion": 3,
      "ciudad": {
        "id": form.current.querySelector("#ciudades-select").value
      },
      "categoria": {
        "id": form.current.querySelector("#categorias-select").value
      },
      "imagenes": [
        {
          "url": form.current.querySelector("#imagen-1").value,
          "titulo": "Imagen"
        },
        {
          "url": form.current.querySelector("#imagen-2").value,
          "titulo": "Imagen"
        },
        {
          "url": form.current.querySelector("#imagen-3").value,
          "titulo": "Imagen"
        },
        {
          "url": form.current.querySelector("#imagen-4").value,
          "titulo": "Imagen"
        },
        {
          "url": form.current.querySelector("#imagen-5").value,
          "titulo": "Imagen"
        }
      ],
      "reservas": [],
      "caracteristicas": caracts.map((caract) => {
        return {
          "id": caract.getAttribute("id")
        }
      }),
      "politicas": [
        {
          "name": form.current.querySelector("#normas").value,
          "tipo": {
              "id": 1
          },
        },
        {
          "name": form.current.querySelector("#salud-seguridad").value,
          "tipo": {
              "id": 2
          },
        },
        {
          "name": form.current.querySelector("#cancelacion").value,
          "tipo": {
              "id": 3
          },
        }
      ]
    };
    
    api.createProducto(data).then((response) => {
      if (response.status === 200) {
        navigate("/nuevo-producto/creado");
      }
    })


    return;
  };

  return (
      <>
        <Header>
            <div>
                <p>PROPIEDADES</p>
                <h2>Administración</h2>
            </div>
            <BackLink>
                <Link to={"/"}> <AiOutlineLeft/> </Link>    
            </BackLink>
        </Header>

        <Container>
          <Titulo><h2>Crear Propiedad</h2></Titulo>
          <FormGroup ref={form} onSubmit={submitHandler} className="form-control">
            <Grupo>
              <Columna>
                <Label htmlFor="nombre-propiedad">Nombre de la propiedad</Label>
                <Input
                  type="text"
                  name="nombre-propiedad"
                  id="nombre-propiedad"
                  className="form-control"
                  placeholder="Nombre"
                  required
                />
              </Columna>

              <Columna>
                <Label htmlFor="categorias">Categoría</Label>
                <Select name="categorias" id="categorias-select" required>
                  <option value="#" disabled selected>
                    Seleccione una categoría
                  </option>
                  {categorias.map((cat) => {
                    return (
                      <option key={`categoria-${cat.id}`} value={`${cat.id}`}>
                        {cat.titulo}
                      </option>
                    );
                  })}
                </Select>
             </Columna>
            </Grupo>

            <Grupo>
              <Columna>
                <Label htmlFor="direccion">Dirección</Label>
                <Input type="text" name="direccion" id="direccion" placeholder="Dirección" required />
              </Columna>
              <Columna>
                <Label htmlFor="ciudades">Ciudades</Label>
                <Select name="ciudades" id="ciudades-select" >
                  <option value="#" disabled selected>
                    Seleccione una ciudad
                  </option>
                  {ciudades.map((c) => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </Select>
              </Columna>
            </Grupo>           

            <Grupo>
              <Columna>
                <Label htmlFor="latitud">Latitud</Label>
                <Input type="text" name="latitud" id="latitud" placeholder="Latitud" required/>
              </Columna>

              <Columna>
                <Label htmlFor="longitud">Longitud</Label>
                <Input type="text" name="longitud" id="longitud" placeholder="Longitud" required/>
              </Columna>
            </Grupo>

            <Columna>
              <Label htmlFor="descripcion">Descripción</Label>
              <textarea
                name="descripcion"
                id="descripcion"
                cols="30"
                rows="10"
                placeholder="..."
                required
                maxLength={500}
              ></textarea>
            </Columna>

            <Titulo><h3>Características</h3></Titulo>

            <CheckboxGroup>
              {caracteristicas.map((caract) => {
                  return (
                    <Check>
                      <Label htmlFor={caract.name}>{caract.name}</Label>
                      <Input type="checkbox" id={caract.id} value={caract.name}/>
                    </Check>
                  )
              })}
            </CheckboxGroup>

            {/* <Grupo>
              <Columna>
                <Label htmlFor="nombre-caracteristica">Nombre</Label>
                <Input type="text" name="nombre-caracteristica" id="nombre-caracteristica" placeholder="Nombre" required/>
              </Columna>

            <Columna>
              <Label htmlFor="icono-caracteristica">Icono</Label>
              <Select name="iconos" id="icono-caracteristica" >
                <option value="#" disabled selected>
                  Seleccione un ícono
                </option>
              </Select>
            </Columna>
              <Button className="btn-agregar"> Agregar </Button>
            </Grupo> */}
            
            <Titulo><h3>Políticas de la propiedad</h3></Titulo>
            
            <Grupo className="grupo-politicas">
              <Columna>
                <h4>Normas de la casa</h4>
                <Label htmlFor="normas">Descripción</Label>
                <textarea
                name="normas"
                id="normas"
                cols="40"
                rows="10"
                placeholder="..."
                required
                maxLength={200}
                ></textarea>
              </Columna>

              <Columna>
                <h4>Salud y seguridad</h4>
                <Label htmlFor="normas">Descripción</Label>
                <textarea
                name="salud-seguridad"
                id="salud-seguridad"
                cols="40"
                rows="10"
                placeholder="..."
                required
                maxLength={200}
                ></textarea>
              </Columna>

              <Columna>
                <h4>Política de cancelación</h4>
                <Label htmlFor="normas">Descripción</Label>
                <textarea
                name="cancelacion"
                id="cancelacion"
                cols="40"
                rows="10"
                placeholder="..."
                required
                maxLength={200}
                ></textarea>
              </Columna>

            </Grupo>

            <Titulo><h3>Cargar imágenes</h3></Titulo>

            <Grupo>
              <Columna>
                {Array.from(Array(5).keys()).map((key) => {
                  return <Input className="input-imagen" type="text" key={key} name={"imagen-" + (key + 1)} id={"imagen-" + (key + 1)}  placeholder="Inserte URL de la imagen" required/>
                })}
              </Columna>
            </Grupo>

            <Button type="submit">Crear</Button>

          </FormGroup>
        </Container>
      </>  
  );
};

const Input = styledComponents.input`
    background-color: #fff;
    border-radius: 5px;
    border: none;
    box-shadow: var(--input-shadow);
    height: 40px;
    padding-left: 18px;
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 1rem;
    color: var(--colorPrincipal);
    &[type="checkbox"] {
      font: inherit;
      color: currentColor;
      width: 1.15em;
      height: 1.15em;
      border: 0.15em solid currentColor;
      border-radius: 0.15em;
      transform: translateY(-0.075em);
    }
    &.input-imagen {
      margin-bottom: 1rem;
    }
    `;

const Select = styledComponents.select`    
    background-color: #fff;
    border-radius: 5px;
    border: none;
    box-shadow: var(--input-shadow);
    height: 40px;
    padding-left: 18px;
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 1rem;
    color: var(--colorPrincipal);
    & option {
      font-weight: 500;
      color: var(--colorPrincipal);
      padding: 0.5rem;
    }
    `;

const FormGroup = styledComponents.form`
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem;
    background-color: #fafafa;
    border-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    h4 {
      font-size: 1.25rem;
      font-weight: 500;
      color: var(--colorPrincipal);
      padding-bottom: 1rem;
    }
    h3 {
      padding-left: 1rem;
    }
    `;

const Label = styledComponents.label`
    text-align: left;
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 1rem;
    color: var(--colorPrincipal);
    `;

    const Button = styledComponents.button`
    height:40px;
    width:164px;
    margin-right:10px;
    margin-left: 1rem;
    background-color:var(--color-primary);
    border:none;
    color:var(--contrast--light);
    border-radius:5px;
    font-size:16px;
    font-weight:bold;
    cursor:pointer;
    `;

const Grupo = styledComponents.div`
display: flex;
justify-content: space-between;
padding-bottom: 2rem;
@media only screen and (max-width: 768px) {
  flex-direction: column;
}
`

const Container = styledComponents.div`
padding: 2rem;
background-color: #EEEFF2;
textarea {
  resize: none;
  background-color: #fff;
  border-radius: 5px;
  border: none;
  box-shadow: var(--input-shadow);
  padding-top: 18px;
  padding-left: 18px;
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 1rem;
  color: var(--colorPrincipal);
  width: 100%;
}
.btn-agregar {
  align-self: end;
  margin-bottom: 5px;
}
`

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

const Titulo = styledComponents.div`
font-size: 1.25rem;
color: var(--colorPrincipal);
text-align: left;
padding: 1rem 0;
`

const Columna = styledComponents.div`
display: flex;
flex-direction: column;
width: 100%;
padding: 0 1rem;
`

const Check = styledComponents.div`
width: 30%;
display: flex;
justify-content: space-between;
padding-bottom: 0.75rem;
`

const CheckboxGroup = styledComponents.div`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
padding: 0 1rem 1rem 1rem;
`

export default Administracion;
