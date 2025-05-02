import React, { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const VistaFavoritos = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        actions.logout();
        navigate("/");
    };

    useEffect(() => {
        const url = "/api/favorite-quotes";
        const seccion = "favoritos";
        actions.listaFetch(url, seccion);
    }, [store.favoritos]);

    return (
        <div className="container">
            <div className="w-100 d-flex justify-content-between p-3">
                <button className="btn btn-secondary" onClick={() => handleNavigate("/dashboard")}>
                    Regresar al Dashboard
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <h1 className="text-center mt-5">Vista de Favoritos</h1>
            <p className="text-center">Aquí puedes ver tus frases favoritas.</p>
            {store.favoritos && store.favoritos.length > 0 ? (
                store.favoritos.map((favorito, index) => (
                    <div key={index} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{favorito.quote_text}</h5>
                            <p className="card-text">{favorito.author}</p>
                            <button
                                className="btn btn-danger"
                                onClick={() => actions.eliminarFavorito(favorito.id)}
                            >
                                Eliminar de Favoritos
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <h2 className="text-danger text-center mt-4">No tienes frases favoritas.</h2>
            )}
        </div>
    );
};

export default VistaFavoritos;