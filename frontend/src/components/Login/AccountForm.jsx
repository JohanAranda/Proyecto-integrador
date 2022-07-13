import styledComponents from "styled-components";
import { useEffect, useState } from "react";

const AccountForm = ({textBellow, children, handleSubmit}) => {
    const [showForm, setShowForm] = useState(false);
    
    const toggleClass = (condition, secondCondition, classList) => {
        if (condition) {
            if (secondCondition) {
                classList.add("is-invalid");
            } else {
                classList.remove("is-invalid");
            }
        }
    };
    const handleBlur = (e) => {
        const { id, value, classList } = e.target;

        toggleClass(id === "nombre" || id === "apellido", value.length < 3, classList);
        toggleClass(id === "contrasena", value.length < 6, classList);
        toggleClass(id === "correoElectronico", !validateEmail(value), classList);
        toggleClass(id === "confirmarContrasena", value !== document.getElementById("contrasena").value, classList);
    }

    useEffect(() => {

            setShowForm(true)
    }, []);



    return (
        <Parent style={{"background":"rgba(196, 196, 196, .2)", }} className={showForm?"":"enter"}>
            <Form action="#" onChange={handleBlur} onSubmit={(e) => handleSubmit(e)}>
                {children}
            </Form>
            <Switch>
                {textBellow}
            </Switch>
            <style>
                {`
                    .enter {
                        transform: translateY(-100%);
                    }
                    `}
            </style>
        </Parent>
        
    );
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };




const Form = styledComponents.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    `


const Switch = styledComponents.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    a {
        text-decoration: none;
    }
    `

const Parent = styledComponents.div`
    width: auto;
    min-height: calc(100vh - 140px);
    position: relative;
    height: 100%;
    @media only screen and (max-width: 600px) {
        padding: 60px 13% 0;
    }
    @media only screen and (min-width: 600px) {
        padding: 60px 27% 0;
    }
    @media only screen and (min-width: 768px) {
        padding: 60px 33% 0;
    }
    padding-top: 20px;

    `

export default AccountForm;