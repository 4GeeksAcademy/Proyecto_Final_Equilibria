import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Dashboard = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        actions.logout();
        navigate("/");
    };

    useEffect(() => {
        actions.verificarToken();
        actions.fraseMotivacional();
    }, []);

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
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

            {/* Logout button */}
            <div className="w-100 d-flex justify-content-end p-3">
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Welcome message */}
            <div className="text-center mb-4">
                {store.info ? (
                    <h2 className="text-primary">¡Bienvenido, {store.info.name}!</h2>
                ) : (
                    <h2 className="text-danger">No hay datos de usuario</h2>
                )}
                <h1 className="mt-3">Dashboard</h1>
            </div>

            {/* Navigation buttons */}
            <div className="navigation-buttons row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                <div className="col">
                    <div className="card shadow-sm border-0">
                        <div className="card-body text-center">
                            <h5 className="card-title">Registrar Nueva Entrada</h5>
                            <button
                                className="btn btn-primary w-100"
                                onClick={() => handleNavigate("/diario")}
                            >
                                Ir
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-sm border-0">
                        <div className="card-body text-center">
                            <h5 className="card-title">Ver Frases Motivacionales</h5>
                            <button
                                className="btn btn-secondary w-100"
                                onClick={() => handleNavigate("/frases-motivacionales")}
                            >
                                Ir
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-sm border-0">
                        <div className="card-body text-center">
                            <h5 className="card-title">Ver Recomendaciones</h5>
                            <button
                                className="btn btn-success w-100"
                                onClick={() => handleNavigate("/recomendaciones")}
                            >
                                Ir
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-sm border-0">
                        <div className="card-body text-center">
                            <h5 className="card-title">Ver Favoritos</h5>
                            <button
                                className="btn btn-warning w-100"
                                onClick={() => handleNavigate("/favoritos")}
                            >
                                Ir
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-sm border-0">
                        <div className="card-body text-center">
                            <h5 className="card-title">Editar Información Personal</h5>
                            <button
                                className="btn btn-info w-100"
                                onClick={() => handleNavigate("/editar-informacion")}
                            >
                                Ir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;