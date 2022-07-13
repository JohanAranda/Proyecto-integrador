import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useState } from "react";
import InputLogin from "./InputLogin";
import styledComponents from "styled-components";


const PasswordInput = () => {
    const [showPassword, setShowPassword] = useState(false);

    return <InputLogin id="contrasena" type={showPassword?"text":"password"} label="Contraseña" errorMessage="La contraseña debe tener mas de 6 caracteres."><ShowPassword onClick={() => {setShowPassword(!showPassword)}}>{ showPassword?<FaEyeSlash style={{"fontSize":"1.5rem"}} />:<FaEye style={{"fontSize":"1.5rem"}} /> }</ShowPassword></InputLogin>
}

const ShowPassword = styledComponents.span`
    position: absolute;
    right: 10px;
    top: 34px; //14 + 8 + 1 + 20 - 9
    cursor: pointer;
    color: #444;
    `


export default PasswordInput;