import axios from "axios";

export default class Api {
    constructor() {
        this.api_token = process.env.REACT_APP_API_TOKEN;
        this.client = null;
        this.api_url = process.env.REACT_APP_API_ENDPOINT || "http://localhost:8080";
    }
    init = () => {
        const headers = {
            Accept: "application/json",
        };
        this.client = axios.create({baseURL: this.api_url, timeout: 31000, headers: headers});
        return this.client;
    };
    getCiudades = () => {
        return this.init().get("/ciudades").then(r => r.data);
    }
    getCiudad = (idCiudad) => {
        return this.init().get("/ciudades/" + idCiudad).then(r => r.data);
    }
    getCategorias = () => {
        return this.init().get("/categorias").then(r => r.data);
    }
    getCategoria = (idCategoria) => {
        return this.init().get("/categorias/" + idCategoria).then(r => r.data);
    }
    getProductos = () => {
        return this.init().get("/productos").then(r => r.data);
    }
    getProducto = (id) => {
        return this.init().get("/productos/" + id).then(r => r.data);
    }
    getProductosPorCategoria = (categoriaId) => {
        return this.init().get("/productos/categoria/" + categoriaId).then(r => r.data);
    }
    getProductosPorCiudad = (ciudadId) => {
        return this.init().get("/productos/ciudad/" + ciudadId).then(r => r.data);
    }
    getProductosPorCiudadYFecha = (ciudadId, fecha_inicio, fecha_fin) => {
        return this.init().get("/productos/ciudad/" + ciudadId + "?fecha_inicio=" + fecha_inicio + "&fecha_fin=" + fecha_fin).then(r => r.data);
    }
    getProductosRandom = () => {
        return this.init().get("/productos/random").then(r => r.data);
    }
    register = (data) => {
        return this.init().post("/usuarios", data)
    }
    login = (data) => {
        return this.init().post("/authenticate", data).then(r => r.data);
    }
    getUser = () => {
        return this.init().get("/usuarios/me", {headers:{
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json"
        }}).then(r => r.data);
    }
    reservate = (data) => {
        return this.init().post("/reservas", data, {headers:{
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json"
        }})
    }
    getReservasUsuario = () => {
        return this.init().get("/reservas/mis-reservas", {headers:{
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json"
        }}).then(r => r.data)
    }
    deleteReservaUsuario = (idReserva) => {
        return this.init().delete("/reservas/" + idReserva, {headers:{
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json"
        }}).then(r => r.data)
    }
    createProducto = (data) => {
        return this.init().post("/productos", data, {headers:{
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json"
        }})
    }
    getCaracteristicas = () => {
        return this.init().get("/caracteristicas").then(r => r.data);
    }
    verificarUsuario = (codigo) => {
        return this.init().get("/usuarios/verificar/" + codigo).then(r => r.data);
    }
    
}
