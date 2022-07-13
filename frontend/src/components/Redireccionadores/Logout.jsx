import {useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { User } from '../Layout/TemplateResponsive';

const Logout = () => { 
    const [, setUser] = useContext(User);
    const navigate = useNavigate();
    localStorage.removeItem('token');
    setUser(null);
    navigate(-1);
    return;
 }


export default Logout