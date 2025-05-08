import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Favoritos = () => {
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
        const url = "api/favorite-quotes";
        actions.fetchFavoritos(url);
    }
        , []);
    return (
        <div className="container mt-5">
            {/* Botones superiores */}
            <div className="w-100 d-flex justify-content-between p-3">
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
            <h1 className="text-center mb-4 text-primary">Tus Favoritos</h1>
            <p className="text-center text-muted">Aquí puedes ver y gestionar tus frases favoritas.</p>

            <div className="row">
                {/* Sección de Quotes */}
                {store.favoritos?.quotes?.length > 0 && (
                    <div className="col-md-6 mb-4">
                        <button className="btn btn-primary" onClick={() => handleNavigate("/favoritos-quotes")}>
                            <span className="ms-2">Frases</span>
                        </button>
                    </div>
                )}

                {/* Sección de Películas */}
                {store.favoritos?.movies?.length > 0 && (
                    <div className="col-md-6 mb-4">
                        <button className="btn btn-primary" onClick={() => handleNavigate("/favoritos-movies")}>
                            <span className="ms-2">Películas</span>
                        </button>
                    </div>
                )}

                {/* Sección de Series */}
                {store.favoritos?.series?.length > 0 && (
                    <div className="col-md-6 mb-4">
                        <button className="btn btn-primary" onClick={() => handleNavigate("/favoritos-series")}>
                            <span className="ms-2">Series</span>
                        </button>
                    </div>
                )}

                {/* Sección de Podcasts */}
                {store.favoritos?.podcasts?.length > 0 && (
                    <div className="col-md-6 mb-4">
                        <button className="btn btn-primary" onClick={() => handleNavigate("/favoritos-podcasts")}>
                            <span className="ms-2">Podcasts</span>
                        </button>
                    </div>
                )}

                {/* Sección de Libros */}
                {store.favoritos?.books?.length > 0 && (
                    <div className="col-md-6 mb-4">
                        <button className="btn btn-primary" onClick={() => handleNavigate("/favoritos-books")}>
                            <span className="ms-2">Libros</span>
                        </button>
                    </div>
                )}

                {/* Sección de Ejercicios */}
                {store.favoritos?.exercises?.length > 0 && (
                    <div className="col-md-6 mb-4">
                        <button className="btn btn-primary" onClick={() => handleNavigate("/favoritos-exercises")}>
                            <span className="ms-2">Ejercicios</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favoritos;
