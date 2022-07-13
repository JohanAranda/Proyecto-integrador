import styledComponents from "styled-components";
import InputLogin from "./minicomponents/InputLogin";
import AccountForm from "./AccountForm";
import PasswordInput from "./minicomponents/PasswordInput";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Api from "../../services/api";

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    document.title = "Crear cuenta";

    const handleSubmit = (e) => {
        e.preventDefault();
        for(let i = 0; i < e.target.elements.length - 1; i++) {
            if(e.target.elements[i].classList.contains("is-invalid") || e.target.elements[i].value.length === 0) {
                console.log(e.target.elements[i]);
                return;
            }
        }

        const user = {
            nombre: e.target.elements[0].value,
            apellido: e.target.elements[1].value,
            email: e.target.elements[2].value,
            password: e.target.elements[3].value,
        }

        const api = new Api();
        api.register(user).then(r => {
            navigate("/verify");
        }).catch(e => {
            if (e?.response?.status === 400) {
                setError(true)
            }
        })
        
    }

    return (
        <AccountForm handleSubmit={handleSubmit} textBellow={<p>¿Ya tienes una cuenta? <Link to="/login"><A>Iniciar sesión</A></Link></p>}>
            <Title>Crear cuenta</Title>
            <NombreApellido>
                <InputLogin id="nombre" type="text" label="Nombre" errorMessage="Debe tener mas de 3 caracteres."></InputLogin>
                <InputLogin id="apellido" type="text" label="Apellido" errorMessage="Debe tener mas de 3 caracteres."></InputLogin>
            </NombreApellido>

            <InputLogin id="correoElectronico" type="email" label="Correo electrónico" errorMessage="Ingrese un correo electronico valido."></InputLogin>
            <PasswordInput/>
            <InputLogin id="confirmarContrasena" type="password" label="Confirmar contraseña" errorMessage="Las contraseñas no coinciden."></InputLogin>
            {error&&<Error>El correo ya se encuentra registrado</Error>}
            <Button type="submit" className="btn btn-primary">Crear cuenta</Button>
        </AccountForm>
        
    );
}

const Error = styledComponents.small`
    color: red;
`;

const Title = styledComponents.legend`
    font-family: Roboto;
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: center;
    color: var(--color-primary);
    margin-bottom: 30px;
    `

const Button = styledComponents.button`
    background: var(--color-primary);
    box-shadow: var(--button-shadow);
    margin-top: 26px;
    border-radius: 5px;
    border: none;
    height: 40px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    text-align: center;

    color: #FFFFFF;
`

const NombreApellido = styledComponents.div`
    display: flex;
    flex-direction: column;
    @media only screen and (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        > * {
            width: 48%;
        }
    }
    
    `

const A = styledComponents.button`
    color: #4285f4;
    border: none;
    display: inline-block;
    background: none;
    `


export default Register;