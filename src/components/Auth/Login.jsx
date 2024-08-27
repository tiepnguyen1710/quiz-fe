import { useState } from "react";
import "./Login.scss";
import { loginPost } from "../../services/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner10 } from "react-icons/im";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsloading] = useState(false);

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const handleBtnLogin = async () => {
        const isValidEmail = validateEmail(email);
        if(!isValidEmail){
            toast.error("Email invalid");
            return;
        }

        if(!password){
            toast.error("Password invalid");
            return;
        }

        setIsloading(true);

        const data = await loginPost(email, password);
        if(data && data.EC === 0){
            dispatch(doLogin(data));
            toast.success(data.EM);
            setIsloading(false);
            navigate("/");
        }

        if(data && data.EC !== 0){
            toast.error(data.EM);
            setIsloading(false);
        }
    }
    return(
        <div className="login-container">
            <div className="header">
                Don't have an account yet?
            </div>
            <div className="title col-4 mx-auto">
                Quizzlet
            </div>
            <div className="welcome col-4 mx-auto">
                Hello, who’s this?
            </div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                </div>
            </div>
            <div className="btn-login col-4 mx-auto">
                <button onClick={handleBtnLogin} disabled={isLoading}>
                    {isLoading && <ImSpinner10 className="loader-icon"/>}<span>Login</span>
                </button>
            </div>
        </div>
    )
}

export default Login