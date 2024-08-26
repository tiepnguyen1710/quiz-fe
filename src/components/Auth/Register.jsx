import { useState } from 'react';
import './Register.scss'
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { registerPost } from '../../services/apiService';
const Register = () => {
    const navigate = useNavigate();
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const handleBtnRegister = async () => {
        const isValidEmail = validateEmail(email);
        if(!isValidEmail){
            toast.error("Email invalid");
            return;
        }

        if(!password){
            toast.error("Password invalid");
            return;
        }

        const data = await registerPost(email, username, password);
        if(data && data.EC === 0){
            toast.success(data.EM);
            navigate("/");
        }

        if(data && data.EC !== 0){
            toast.error(data.EM);
        }
    }
    return(
        <div className="container-register"> 
            <div className="header">
                Have account already
            </div>
            <div className="title col-4 mx-auto">
                Quizzet
            </div>
            <div className="welcome">
                Get better data with conversational forms, surveys, quizzes & more.
            </div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" 
                            className="form-control"
                            value={email}
                            onChange={(event) => {setEmail(event.target.value)}}></input>
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input className="form-control"
                            value={username}
                            onChange={(event) => {setUsername(event.target.value)}}></input>
                </div>
                <div className="form-group input-password">
                    <label>Password</label>
                    <input type={isPasswordShow ? "text" : "password" }
                            className="form-control"
                            value={password}
                            onChange={(event) => {setPassword(event.target.value)}}></input>

                    {isPasswordShow ? 
                        <span className='eye-password' onClick={() => setIsPasswordShow(false)}>
                        <FaRegEye />
                        </span>
                        :
                        <span className='eye-password' onClick={() => setIsPasswordShow(true)}>
                        <FaEyeSlash />
                        </span>
                    }
                
                </div>
            </div>
            <div className="btn-register col-4 mx-auto">
                    <button onClick={handleBtnRegister}>Sign up</button>
            </div>
        </div>
    )
}

export default Register