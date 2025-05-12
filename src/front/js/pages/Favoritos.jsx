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
            <p className="text-center text-muted">Aquí puedes ver y gestionar todos tus favoritos.</p>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {/* Sección de Quotes */}
                <div className="col-md-6 mb-4 text-center container shadow rounded p-3">
                    <h4>Tus palabras favoritas, siempre a tu alcance.</h4>
                    <p className="text-muted">Cantidad: {store.favoritos?.quotes?.length || 0}</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleNavigate(store.favoritos?.quotes?.length > 0 ? "/favoritos-quotes" : "/frasesmotivacionales")}
                    >
                        <span className="ms-2">Frases</span>
                    </button>
                </div>

                {/* Sección de Películas */}
                <div className="col-md-6 mb-4 text-center container shadow rounded p-3">
                    <h4>Explora tus películas favoritas.</h4>
                    <p className="text-muted">Cantidad: {store.favoritos?.movies?.length || 0}</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleNavigate(store.favoritos?.movies?.length > 0 ? "/favoritos-movies" : "/recomendaciones")}
                    >
                        <span className="ms-2">Películas</span>
                    </button>
                </div>

                {/* Sección de Series */}
                <div className="col-md-6 mb-4 text-center container shadow rounded p-3">
                    <h4>Descubre tus series más queridas.</h4>
                    <p className="text-muted">Cantidad: {store.favoritos?.series?.length || 0}</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleNavigate(store.favoritos?.series?.length > 0 ? "/favoritos-series" : "/recomendaciones")}
                    >
                        <span className="ms-2">Series</span>
                    </button>
                </div>

                {/* Sección de Podcasts */}
                <div className="col-md-6 mb-4 text-center container shadow rounded p-3">
                    <h4>Reproduce tus podcasts preferidos.</h4>
                    <p className="text-muted">Cantidad: {store.favoritos?.podcasts?.length || 0}</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleNavigate(store.favoritos?.podcasts?.length > 0 ? "/favoritos-podcasts" : "/recomendaciones")}
                    >
                        <span className="ms-2">Podcasts</span>
                    </button>
                </div>

                {/* Sección de Libros */}
                <div className="col-md-6 mb-4 text-center container shadow rounded p-3">
                    <h4>Sumérgete en tus libros favoritos.</h4>
                    <p className="text-muted">Cantidad: {store.favoritos?.books?.length || 0}</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleNavigate(store.favoritos?.books?.length > 0 ? "/favoritos-books" : "/recomendaciones")}
                    >
                        <span className="ms-2">Libros</span>
                    </button>
                </div>

                {/* Sección de Ejercicios */}
                <div className="col-md-6 mb-4 text-center container shadow rounded p-3">
                    <h4>Organiza tus rutinas de ejercicios.</h4>
                    <p className="text-muted">Cantidad: {store.favoritos?.exercises?.length || 0}</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleNavigate(store.favoritos?.exercises?.length > 0 ? "/favoritos-exercises" : "/recomendaciones")}
                    >
                        <span className="ms-2">Ejercicios</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Favoritos;
