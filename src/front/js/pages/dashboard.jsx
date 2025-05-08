import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";
const Dashboard = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [password, setPassword] = useState("");


    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        actions.logout();
        navigate("/");
    };

    const handleChangePassword = async () => {
        if (password.trim() === "") {
            alert("Por favor, ingresa una nueva contraseña.");
            return;
        }
        if (await actions.cambiarDatos({ "new_password": password})) {
            alert("Contraseña cambiada con éxito.");
            setPassword("");
            actions.verificarToken();
            navigate("/");
        }
        else {
            alert("Error al cambiar la contraseña. Por favor, intenta nuevamente.");
        }

    };


    useEffect(() => {
        actions.fraseMotivacional();
    }, []);

    return (
        <div>
            {store.info?.force_password_change ? (
                <div className="alert alert-warning text-center">
                    <h4 className="alert-heading">¡Atención!</h4>
                    <p>Debes cambiar tu contraseña para continuar.</p>
                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Nueva contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={() => handleChangePassword()}>
                        Cambiar Contraseña
                    </button>
                </div>
            ) : (
                <div>
                    {/* Logout button */}
                    <div className="w-100 d-flex justify-content-between p-3">
                        <h1 className="page-title">Equilibra</h1>
                        <div className="d-flex justify-content-end p-3 gap-3">
                            {store.info?.is_admin && (
                                <button className="btn btn-secondary" onClick={() => handleNavigate("/admin-dashboard")}>
                                    Ir al Dashboard Admin
                                </button>
                            )}
                            <button className="btn btn-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>

                    </div>
                    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
                        {/* Welcome message */}
                        <div className="text-center mb-4">
                            {store.info ? (
                                <h1 className="text-primary">¡Bienvenido, {store.info.name}!</h1>
                            ) : (
                                <h1 className="text-danger">No hay datos de usuario</h1>
                            )}
                        </div>
                        <div className="text-center mb-4">
                            {/* Frase motivacional */}
                            {store.loadingFraseMotivacionalIA ? (
                                <div className="alert alert-info text-center w-100">
                                    <p>Cargando frase motivacional...</p>
                                </div>
                            ) : store.fraseMotivacional ? (
                                <div className="alert alert-success text-center w-100 shadow-sm">
                                    <h2 className="mb-2">{store.fraseMotivacional.quote}</h2>
                                    <p className="mb-0 text-muted">- {store.fraseMotivacional.author}</p>
                                </div>
                            ) : null}
                        </div>
                        {/* Navigation buttons */}
                        <div className="navigation-buttons row row-cols-1 g-4">
                            <div className="col jumbotron">
                                <div className="card shadow-sm border-0">
                                    <div className="card-body text-center">
                                        <h3 className="card-title">Escribí lo que sentís, entendé lo que vivís.</h3>
                                        <div className="card-body text-center mb-4 d-flex flex-column justify-content-center">
                                            <div className="d-flex justify-content-center">
                                                <img src="https://www.betterteam.com/images/Batterteam-c%C3%B3mo-hacer-una-carta-de-recomendaci%C3%B3n-5924x4566-20230522.jpeg?crop=1:1,smart&width=1200&dpr=2&format=pjpg&auto=webp&quality=85"
                                                    className="card-img-top"
                                                    alt="..."
                                                    style={{ maxWidth: "300px", height: "auto" }}></img>
                                            </div>
                                            <div>
                                                <h5 className="card-title">¿Por qué es importante llevar un diario?</h5>
                                                <p className="card-text">Es una herramienta poderosa para la auto-reflexión y el crecimiento personal.</p>
                                                <p className="card-text">Te ayuda a procesar tus emociones y experiencias.</p>
                                                <p className="card-text">Ayuda a establecer metas y reflexionar sobre el progreso.</p>
                                                <p className="card-text">Fomenta la gratitud y la apreciación de lo positivo.</p>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <button
                                                className="btn btn-primary w-100"
                                                onClick={() => handleNavigate("/diario")}
                                            >
                                                Ir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col jumbotron">
                                <div className="card shadow-sm border-0">
                                    <div className="card-body text-center">
                                        <h3 className="card-title">Una frase puede ser el impulso que hoy necesitás.</h3>
                                        <div className="card-body text-center mb-4 d-flex flex-column justify-content-center">
                                            <div className="d-flex justify-content-center">
                                                <img src="https://www.betterteam.com/images/Batterteam-c%C3%B3mo-hacer-una-carta-de-recomendaci%C3%B3n-5924x4566-20230522.jpeg?crop=1:1,smart&width=1200&dpr=2&format=pjpg&auto=webp&quality=85"
                                                    className="card-img-top"
                                                    alt="..."
                                                    style={{ maxWidth: "300px", height: "auto" }}></img>
                                            </div>
                                            <div>
                                                <h5 className="card-title">¿Por qué leer frases motivacionales?</h5>
                                                <p className="card-text">Te inspiran a seguir adelante y superar desafíos.</p>
                                                <p className="card-text">Pueden cambiar tu perspectiva en momentos difíciles.</p>
                                                <p className="card-text">Son una fuente de energía positiva y motivación diaria.</p>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <button
                                                className="btn btn-secondary w-100"
                                                onClick={() => handleNavigate("/frases-motivacionales")}
                                            >
                                                Ir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col jumbotron">
                                <div className="card shadow-sm border-0">
                                    <div className="card-body text-center">
                                        <h3 className="card-title">Pequeños pasos, grandes cambios. Empezá hoy.</h3>
                                        <div className="card-body text-center mb-4 d-flex flex-column justify-content-center">
                                            <div className="d-flex justify-content-center">
                                                <img src="https://www.betterteam.com/images/Batterteam-c%C3%B3mo-hacer-una-carta-de-recomendaci%C3%B3n-5924x4566-20230522.jpeg?crop=1:1,smart&width=1200&dpr=2&format=pjpg&auto=webp&quality=85"
                                                    className="card-img-top"
                                                    alt="..."
                                                    style={{ maxWidth: "300px", height: "auto" }}></img>
                                            </div>
                                            <div>
                                                <h5 className="card-title">¿Por qué seguir recomendaciones?</h5>
                                                <p className="card-text">Te ayudan a mejorar tu bienestar físico y emocional.</p>
                                                <p className="card-text">Son pasos prácticos para alcanzar tus metas.</p>
                                                <p className="card-text">Te guían hacia un estilo de vida más equilibrado.</p>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <button
                                                className="btn btn-success w-100"
                                                onClick={() => handleNavigate("/recomendaciones")}
                                            >
                                                Ir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col jumbotron">
                                <div className="card shadow-sm border-0">
                                    <div className="card-body text-center">
                                        <h3 className="card-title">Guardá lo que te inspira, volvé cuando lo necesités.</h3>
                                        <div className="card-body text-center mb-4 d-flex flex-column justify-content-center">
                                            <div className="d-flex justify-content-center">
                                                <img src="https://www.betterteam.com/images/Batterteam-c%C3%B3mo-hacer-una-carta-de-recomendaci%C3%B3n-5924x4566-20230522.jpeg?crop=1:1,smart&width=1200&dpr=2&format=pjpg&auto=webp&quality=85"
                                                    className="card-img-top"
                                                    alt="..."
                                                    style={{ maxWidth: "300px", height: "auto" }}></img>
                                            </div>
                                            <div>
                                                <h5 className="card-title">¿Por qué guardar tus favoritos?</h5>
                                                <p className="card-text">Te permite acceder rápidamente a lo que más te inspira.</p>
                                                <p className="card-text">Es una forma de organizar tus recursos motivacionales.</p>
                                                <p className="card-text">Facilita el seguimiento de tus intereses y metas.</p>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <button
                                                className="btn btn-warning w-100"
                                                onClick={() => handleNavigate("/favoritos")}
                                            >
                                                Ir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col jumbotron">
                                <div className="card shadow-sm border-0">
                                    <div className="card-body text-center">
                                        <h3 className="card-title">Tu espacio, tu reflejo. Mantenelo auténtico.</h3>
                                        <div className="card-body text-center mb-4 d-flex flex-column justify-content-center">
                                            <div className="d-flex justify-content-center">
                                                <img src="https://www.betterteam.com/images/Batterteam-c%C3%B3mo-hacer-una-carta-de-recomendaci%C3%B3n-5924x4566-20230522.jpeg?crop=1:1,smart&width=1200&dpr=2&format=pjpg&auto=webp&quality=85"
                                                    className="card-img-top"
                                                    alt="..."
                                                    style={{ maxWidth: "300px", height: "auto" }}></img>
                                            </div>
                                            <div>
                                                <h5 className="card-title">¿Por qué editar tu información?</h5>
                                                <p className="card-text">Te permite mantener tu perfil actualizado.</p>
                                                <p className="card-text">Es una forma de reflejar tus cambios y crecimiento personal.</p>
                                                <p className="card-text">Te ayuda a personalizar tu experiencia en la plataforma.</p>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <button
                                                className="btn btn-info w-100"
                                                onClick={() => handleNavigate("/cambiar-info")}
                                            >
                                                Ir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;