import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setValidated(true);
            return;
        }

        const usuarioCorrecto = await actions.loginUsuario({ email, password });
        if (usuarioCorrecto) {
            if (await actions.isAdmin()) {
                navigate("/admin-dashboard");
            } else {
                navigate("/dashboard");
            }
        } else {
            alert("Error al loguear el usuario");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                <form
                    className={`needs-validation ${validated ? "was-validated" : ""}`}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <div className="mb-3">
                        <label htmlFor="validationCustom01" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="validationCustom01"
                            required
                            placeholder="Ingresa tu email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="invalid-feedback">Por favor, ingresa un email válido.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="validationCustom02" className="form-label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="validationCustom02"
                            required
                            placeholder="Ingresa tu contraseña"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="invalid-feedback">Por favor, ingresa tu contraseña.</div>
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" type="submit">
                            Iniciar Sesión
                        </button>
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() => navigate("/signup")}
                        >
                            Crear Cuenta
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;