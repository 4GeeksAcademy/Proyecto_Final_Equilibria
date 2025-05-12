import React, { useState, useEffect } from "react";
import { useContext } from "react";
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
        setFavoritos((prevFavoritos) => [...prevFavoritos, frase.quote]);
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
                    className="btn shadow-sm"
                    onClick={() => handleNavigate("/dashboard")}
                    style={{
                        backgroundColor: '#8e44ad',
                        borderColor: '#8e44ad',
                        transition: 'background-color 0.3s ease-in-out',
                        color: '#fff'
                    }}
                >
                    Regresar al Dashboard
                </button>
                <button
                    className="btn shadow-sm"
                    onClick={handleLogout}
                    style={{
                        backgroundColor: '#9b59b6',
                        borderColor: '#9b59b6',
                        transition: 'background-color 0.3s ease-in-out',
                        color: '#fff'
                    }}
                >
                    Logout
                </button>
            </div>

            {/* Title */}
            <h1 className="text-center mb-4" style={{ color: '#8e44ad' }}>
                Frases Motivacionales
            </h1>

            {/* Loading or Content */}
            {store.loadingFrasesMotivacionales ? (
                <p className="text-center text-muted">Cargando frases motivacionales...</p>
            ) : store.frasesMotivacionales && store.frasesMotivacionales.length > 0 ? (
                <div className="row g-4">
                    {store.frasesMotivacionales.map((frase, index) => (
                        <div
                            key={index}
                            className="col-md-4"
                        >
                            <div
                                className={`card p-3 shadow-sm ${favoritos.includes(frase.quote) ? "bg-light border-success" : "border-0"}`}
                                style={{
                                    transition: 'transform 0.3s ease-in-out',
                                    transform: 'translateY(-5px)',
                                    cursor: 'pointer'
                                }}
                            >
                                <h5 className="card-title text-dark">{frase.quote}</h5>
                                <p className="card-text text-muted">- {frase.author}</p>
                                <button
                                    className={`btn ${favoritos.includes(frase.quote) ? "btn-success" : "btn-outline-primary"} w-100`}
                                    onClick={() => handleGuardarFavorito(frase)}
                                    disabled={favoritos.includes(frase.quote)} // Deshabilita si ya es favorito
                                    style={{
                                        transition: 'background-color 0.3s, color 0.3s',
                                        backgroundColor: favoritos.includes(frase.quote) ? '#8e44ad' : '#9b59b6',
                                        borderColor: favoritos.includes(frase.quote) ? '#8e44ad' : '#9b59b6',
                                        color: '#fff'
                                    }}
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
                    className="btn shadow-sm"
                    onClick={() => actions.frasesMotivacionales()}
                    style={{
                        backgroundColor: '#8e44ad',
                        borderColor: '#8e44ad',
                        transition: 'background-color 0.3s ease-in-out',
                        color: '#fff'
                    }}
                >
                    Más Frases
                </button>
            </div>
        </div>
    );
};

export default FrasesMotivacionales;
