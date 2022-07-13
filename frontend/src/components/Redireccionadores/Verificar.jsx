import { useParams, useNavigate } from "react-router";
import Api from "../../services/api";
import { useEffect } from "react";

export default function Verificar() {
    const { codigo } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const api = new Api();
        api.verificarUsuario(codigo)
            .then(() => {
                navigate("/login");
            }).catch(() => {
                navigate("/error");
            }
            );
    });
    return <></>

}

