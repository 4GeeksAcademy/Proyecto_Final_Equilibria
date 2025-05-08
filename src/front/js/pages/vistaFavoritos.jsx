import React from "react";
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

    const handlerEliminirFavorito = async (id) => {
        await actions.eliminarFavorito(id, "quotes");
        actions.setStore("quotes", id)
    }

    return (
        <div className="container mt-5">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <button
                    className="btn btn-secondary shadow-sm"
                    onClick={() => handleNavigate("/favoritos")}
                >
                    Regresar a favoritos
                </button>
                <button
                    className="btn btn-danger shadow-sm"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            {/* Title */}
            <h1 className="text-center mb-4 text-primary">Tus Frases Favoritas</h1>
            <p className="text-center text-muted">Aquí puedes ver y gestionar tus frases favoritas.</p>

            {/* Favoritos */}
            {store.favoritos.quotes && store.favoritos.quotes.length > 0 ? (
                <div className="row g-4">
                    {store.favoritos?.quotes?.map((favorito, index) => (
                        <div key={index} className="col-md-6 col-lg-4">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-dark">{favorito.quote_text}</h5>
                                    <p className="card-text text-muted">- {favorito.author}</p>
                                    <button
                                        className="btn btn-danger w-100"
                                        onClick={() => {
                                            handlerEliminirFavorito(favorito.id);
                                        }}
                                    >
                                        Eliminar de Favoritos
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h2 className="text-danger text-center mt-4">No tienes frases favoritas.</h2>
            )}

        </div>
    );
};

export default VistaFavoritos;