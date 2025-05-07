import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const FrasesMotivacionales = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [favoritos, setFavoritos] = useState([]);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        actions.logout();
        navigate("/");
    };

    const handleGuardarFavorito = (frase) => {
        const favoritoCompleto = {
            "type": "quote",             
            "quote_text": frase.quote,  
            "author": frase.author,  
            "description": "N/A", 
            "url": "N/A",
            "title": "N/A",
        }
        
        actions.guardarFavorito(favoritoCompleto);
        setFavoritos((prevFavoritos) => [...prevFavoritos, frase.quote]); // Marca la frase como favorita
    };

    useEffect(() => {
        actions.verificarToken();
        actions.frasesMotivacionales();
    }, []);

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
            <h1 className="text-center mb-4 text-primary">Frases Motivacionales</h1>

            {/* Loading or Content */}
            {store.loadingFrasesMotivacionalesIA ? (
                <p className="text-center text-muted">Cargando frases motivacionales...</p>
            ) : store.frasesMotivacionales && store.frasesMotivacionales.length > 0 ? (
                <div className="row g-4">
                    {store.frasesMotivacionales.map((frase, index) => (
                        <div
                            key={index}
                            className="col-md-4"
                        >
                            <div
                                className={`card p-3 shadow-sm ${favoritos.includes(frase.quote) ? "bg-light border-success" : "border-0"
                                    }`}
                            >
                                <h5 className="card-title text-dark">{frase.quote}</h5>
                                <p className="card-text text-muted">- {frase.author}</p>
                                <button
                                    className={`btn ${favoritos.includes(frase.quote)
                                        ? "btn-success"
                                        : "btn-outline-primary"
                                        } w-100`}
                                    onClick={() => handleGuardarFavorito(frase)}
                                    disabled={favoritos.includes(frase.quote)} // Deshabilita si ya es favorito
                                >
                                    {favoritos.includes(frase.quote)
                                        ? "Añadido a Favoritos"
                                        : "Guardar como Favorita"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted">No hay frases disponibles en este momento.</p>
            )}

            {/* Button to Load More */}
            <div className="text-center mt-4">
                <button
                    className="btn btn-primary shadow-sm"
                    onClick={() => actions.frasesMotivacionales()}
                >
                    Más Frases
                </button>
            </div>
        </div>
    );
};

export default FrasesMotivacionales;