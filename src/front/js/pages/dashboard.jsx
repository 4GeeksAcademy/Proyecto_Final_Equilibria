import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
            <div className="navigation-buttons">
                <button
                    className="btn btn-primary"
                    onClick={() => handleNavigate("/registrar-entrada")}
                >
                    Registrar Nueva Entrada
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => handleNavigate("/frases-motivacionales")}
                >
                    Ver Frases Motivacionales
                </button>
                <button
                    className="btn btn-success"
                    onClick={() => handleNavigate("/recomendaciones")}
                >
                    Ver Recomendaciones
                </button>
                <button
                    className="btn btn-warning"
                    onClick={() => handleNavigate("/favoritos")}
                >
                    Ver Favoritos
                </button>
                <button
                    className="btn btn-info"
                    onClick={() => handleNavigate("/editar-informacion")}
                >
                    Editar Información Personal
                </button>
            </div>
        </div>
    );
};

export default Dashboard;