import styledComponents from "styled-components"


const InputLogin = ({id, label, type, placeholder="", errorMessage, children}) => {

    

    return <FormGroup>
                <Label htmlFor={id}>{label}</Label>
                <Input type={type} className="form-control" id={id} placeholder={placeholder} errorMessage={errorMessage}/>
                {children}
                <Message/>
            </FormGroup>
}


const Input = styledComponents.input`
    background-color: #fff;
    border-radius: 5px;
    border: none;
    box-shadow: var(--input-shadow);
    height: 40px;
    padding-left: 18px;
    &.is-invalid {
        border-color: red;
        background: #FFE1E1;
        border: 1px solid #FF0000;
        ~ div::after {
            content: "${props => props.errorMessage}";
        }
    }
    `

const FormGroup = styledComponents.div`
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    position : relative;
    `

const Label = styledComponents.label`
    text-align: left;
    margin-bottom: 8px;
    `

const Message = styledComponents.div`
    &::after {
        font-size: .8rem;
        display: inline-block;
        right: 0;
        top: 70px;
        position: absolute;
        cursor: pointer;
        height: 10px;
        color: red;
    }
    `


export default InputLogin;