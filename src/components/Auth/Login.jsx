import { useState } from "react";
import "./Login.scss";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                <button>Login</button>
            </div>
        </div>
    )
}

export default Login