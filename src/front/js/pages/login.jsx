import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const login = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {

            setValidated(true);
            return;
        }

        const usuarioCorrecto = await actions.loginUsuario({ email, password });
        if (usuarioCorrecto) {
            alert("Usuario logueado correctamente");
            navigate("/dashboard");
        }
        else {
            alert("Error al loguear el usuario");
        }

    };
    return (
        <div className="container">
            <form 
            className={`row g-3 needs-validation ${validated ? "was-validated" : ""}`}
                noValidate
                onSubmit={handleSubmit}>
                <div className="col-md-4">
                    <label htmlFor="validationCustom01" className="form-label">Email</label>
                    <input type="email" className="form-control" id="validationCustom01" required
                        placeholder="" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom02" className="form-label">Password</label>
                    <input type="password" className="form-control" id="validationCustom02" required
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit">Log in</button>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" onClick={() => navigate("/signup")}>
                        sign up
                    </button>
                </div>

            </form>
        </div>


    );
}
export default login;