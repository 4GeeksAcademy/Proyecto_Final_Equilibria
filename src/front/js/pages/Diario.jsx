import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


const Diario = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [url, setUrl] = useState("api/diario");

    useEffect(() => {
        const fetchData = async () => {
            const seccion = "listaEntradas";
            await actions.listaFetch(url, seccion);
            await actions.mensajePorMood();
        };

        fetchData();
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
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <button
                    className="btn btn-secondary shadow-sm"
                    onClick={() => handleNavigate("/dashboard")}
                >
                    Regresar al Dashboard
                </button>
                <button className="btn btn-danger shadow-sm" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Title */}
            <h2 className="text-center mb-4 text-dark">Mi Diario</h2>

            {/* Mensaje generado por IA */}
            <div className="mb-4">
                {store.loadingMensajeIA ? (
                    <p className="text-center text-muted">Cargando mensaje...</p>
                ) : store.mensajeIA && store.info ? (
                    <div className="alert alert-info p-4 rounded shadow-lg border border-primary">
                        <h4 className="text-primary mb-2">Hola, {store.info.name}!</h4>
                        <p className="mb-0">{store.mensajeIA}</p>
                    </div>
                ) : null}
            </div>

            {/* Lista de entradas */}
            <div>
                {store.listaEntradas && store.listaEntradas.length > 0 ? (
                    store.listaEntradas.map((entrada) => (
                        <div
                            key={entrada.id}
                            className="card mb-3 shadow-lg border border-secondary"
                        >
                            <div className="card-body">
                                <h5 className="card-title text-capitalize text-dark">
                                    Estado de ánimo: {entrada.mood_tag}
                                </h5>
                                <p className="card-text text-muted">
                                    {new Date(entrada.date).toLocaleDateString()} -{" "}
                                    {new Date(entrada.date).toLocaleTimeString()}
                                </p>
                                <p className="card-text text-dark">{entrada.entry_text}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <h4 className="text-center text-muted mt-4">
                        No hay entradas registradas.
                    </h4>
                )}
            </div>

            {/* Botón fijo para escribir en el diario */}
            <div className="position-fixed bottom-0 end-0 m-4">
                <button
                    className="btn btn-primary btn-lg rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                    style={{ width: "60px", height: "60px" }}
                    onClick={() => handleNavigate("/registrar-entrada")}
                >
                    <i>
                        +
                    </i>
                </button>
            </div>
        </div>
    );
};

export default Diario;