import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { store } = useContext(Context);
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
            if (!await actions.verificarToken()) return;
            if (!store.info?.is_active) {
                alert("El usuario no está activo");
                return;
            }
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
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="row shadow rounded overflow-hidden" style={{ maxWidth: "900px", width: "100%", height: "600px" }}>
                
                {/* Columna de imagen */}
                <div className="col-md-6 d-none d-md-block p-0">
                    <div
                        className="h-100 w-100"
                        style={{
                            backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/002/303/590/non_2x/mental-health-due-to-psychology-depression-loneliness-illness-brain-development-or-hopelessness-psychotherapy-and-mentality-healthcare-illustration-vector.jpg')",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundColor: "#e0f7fa",
                        }}
                    ></div>
                </div>

                {/* Columna de formulario */}
                <div className="col-md-6 bg-white p-5 d-flex flex-column justify-content-center">
                    <h2 className="mb-3 text-center fw-bold text-dark">Bienvenido de nuevo</h2>
                    <p className="text-muted text-center mb-4">Inicia sesión con tu cuenta</p>

                    <form onSubmit={handleSubmit} noValidate className={`needs-validation ${validated ? "was-validated" : ""}`}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                required
                                placeholder="ejemplo@correo.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="invalid-feedback">Por favor ingresa un correo válido.</div>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                required
                                placeholder="Tu contraseña"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="invalid-feedback">Por favor ingresa tu contraseña.</div>
                        </div>

                        <div className="mb-3 text-end">
                            <a href="/reestablecer-contrasena" className="text-decoration-none text-primary small">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <div className="d-grid gap-2">
                            {/* Botón con color morado */}
                            <button className="btn btn-purple" type="submit">Iniciar Sesión</button>
                            <button
                                type="button"
                                className="btn btn-outline-purple"
                                onClick={() => navigate("/signup")}
                            >
                                Crear Cuenta
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style>
                {`
                    /* Botones morados */
                    .btn-purple {
                        background-color: #6f42c1;
                        color: white;
                    }

                    .btn-purple:hover {
                        background-color: #5a2e9f;
                        color: white;
                    }

                    .btn-outline-purple {
                        border-color: #6f42c1;
                        color: #6f42c1;
                    }

                    .btn-outline-purple:hover {
                        background-color: #6f42c1;
                        color: white;
                    }

                    /* Enlace morado */
                    .text-purple {
                        color: #6f42c1 !important;
                    }

                    .text-purple:hover {
                        color: #5a2e9f !important;
                    }
                `}
            </style>
        </div>
    );
};

export default Login;
