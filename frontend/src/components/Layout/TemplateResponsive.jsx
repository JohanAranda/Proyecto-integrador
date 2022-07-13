import Header from "./PrincipalElements/Header";
import Footer from "./PrincipalElements/Footer";
import Body from "./PrincipalElements/Body";
import Login from "../Login/Login";
import Register from "../Login/Register";
import Logout from "../Redireccionadores/Logout";
import Producto from "../Producto/Producto";
import Reserva from "../Reservas/Reserva"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "../Errors/404";
import GetLoggedAccount from "../Login/GetLoggedAccount";
import { createContext } from "react";
import { useState } from "react";
import ReservaExitosa from "../Reservas/ReservaExitosa";
import Administracion from "../Administracion/Administracion";
import ProductoCreado from "../Producto/ProductoCreado";
import MisReservas from "../Reservas/MisReservas";
import VerificarMail from "../Login/VerificarMail";
import Verificar from "../Redireccionadores/Verificar";


const User = createContext(null);

const TemplateResponsive = () => { 
    const [user, setUser] = useState(null);

    return <div style={{"paddingTop":"80px"}}>
        <User.Provider value={[user, setUser]}>          
            <GetLoggedAccount />
            <BrowserRouter>
                <Header  />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/producto/:id" >
                        <Route index element={<Producto />} />
                        <Route path="reserva" element={<Reserva />} />
                    </Route>
                    <Route path="/reservaExitosa" element={<ReservaExitosa />} />
                    <Route path="/administracion" element={user?.rol?.id===1?<Administracion/>: <Error/>} />
                    <Route path="/nuevo-producto/creado" element={<ProductoCreado />} />
                    <Route path="/mis-reservas" element={<MisReservas />} />
                    <Route path="/usuarios" >
                        <Route path="confirmar/:codigo" element={<Verificar />}/>
                    </Route>
                    <Route path="/error" element={<Error />} />
                    <Route path="/verify" element={<VerificarMail />} />
                    <Route path="/*" element={<Body />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </User.Provider>
    </div>
} //AGREGAR las rutas de reserva.



export default TemplateResponsive;
export { User };