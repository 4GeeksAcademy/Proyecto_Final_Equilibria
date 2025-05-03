import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Diario = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [url, setUrl] = useState("api/diario");

    useEffect(() => {
        const seccion = "listaEntradas";
        actions.listaFetch(url, seccion); // Fetch de las entradas
    }, []);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        actions.logout();
        navigate("/");
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between mb-4">
                <button
                    className="btn btn-secondary"
                    onClick={() => handleNavigate("/dashboard")}
                >
                    Regresar al Dashboard
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <h2 className="text-center mb-4">Mi Diario</h2>
            <div>
                {store.listaEntradas && store.listaEntradas.length > 0 ? (
                    store.listaEntradas.map((entrada) => (
                        <div
                            key={entrada.id}
                            className="card mb-3 shadow-sm border-0"
                        >
                            <div className="card-body">
                                <h5 className="card-title text-capitalize">
                                    Estado de ánimo: {entrada.mood_tag}
                                </h5>
                                <p className="card-text text-muted">
                                    {new Date(entrada.date).toLocaleDateString()} -{" "}
                                    {new Date(entrada.date).toLocaleTimeString()}
                                </p>
                                <p className="card-text">{entrada.entry_text}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <h4 className="text-center text-muted mt-4">
                        No hay entradas registradas.
                    </h4>
                )}
            </div>
            <div>
                <button onClick={() => handleNavigate("/registrar-entrada")}>Escribir Diario</button>
            </div>
        </div>
    );
};

export default Diario;