import React, { useEffect, useState } from "react";  
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Recomendaciones = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [busqueda, setBusqueda] = useState("");

    const handleNavigate = (path) => {
        navigate(path);
    };
    const handleLogout = () => {
        actions.logout();
        navigate("/");
    };

    const handleGuardarFavorito = (obj) => {
        console.log(obj);
        const favoritoCompleto = {
            "type": obj.type,             
            "quote_text": "N/A",  
            "author": "N/A",  
            "description": obj.description, 
            "url": obj.url,
            "title": obj.title,
        }
        actions.guardarFavorito(favoritoCompleto);
    }

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
            <h1 className="text-center">Recomendaciones</h1>
            <p className="text-center">Aquí puedes ver tus recomendaciones.</p>
            <div>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Buscar..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <button
                    className="btn btn-primary"
                    onClick={() => actions.cargarRecomendaciones(busqueda)}
                >
                    Buscar
                </button>
            </div>
            {store.recomendaciones && store.recomendaciones.length > 0 ? (
                store.recomendaciones.map((recomendacion, index) => (
                    <div key={index} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{recomendacion.title}</h5>
                            <p className="card-text">{recomendacion.description}</p>
                        </div>
                        <div className="card-footer">
                            <button
                                className="btn btn-primary"
                                onClick={() => handleGuardarFavorito(recomendacion)}
                            >
                                Guardar como Favorito
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <h2 className="text-danger text-center mt-4">No tienes recomendaciones.</h2>
            )}
            
        </div>
    );
}
    

export default Recomendaciones;