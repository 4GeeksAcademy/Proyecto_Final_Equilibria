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
        const seccion = "favoritos";
        actions.listaFetch(url, seccion);
    }
    , [store.favoritos]);
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 text-primary">Tus Favoritos</h1>
            <p className="text-center text-muted">Aquí puedes ver y gestionar tus frases favoritas.</p>
            
            <div className="row">
                {/* Sección de Quotes */}
                {store.favoritos?.length > 0 && (
                    <div className="col-md-6 mb-4">
                        <h3 className="text-secondary">Quotes</h3>
                        <ul className="list-group">
                            {store.favoritos.map((quote, index) => (
                                <li key={index} className="list-group-item">
                                    {quote.quote_text} - <strong>{quote.author}</strong>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Sección de Películas */}
                {store.favorites?.movies?.length > 0 && (
                    <div className="col-md-6 mb-4">
                        <h3 className="text-secondary">Películas</h3>
                        <ul className="list-group">
                            {store.favorites.movies.map((movie, index) => (
                                <li key={index} className="list-group-item">
                                    {movie}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Sección de Series */}
                {store.favorites?.series?.length > 0 && (
                    <div className="col-md-6 mb-4">
                        <h3 className="text-secondary">Series</h3>
                        <ul className="list-group">
                            {store.favorites.series.map((serie, index) => (
                                <li key={index} className="list-group-item">
                                    {serie}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Sección de Podcasts */}
                {store.favorites?.podcasts?.length > 0 && (
                    <div className="col-md-6 mb-4">
                        <h3 className="text-secondary">Podcasts</h3>
                        <ul className="list-group">
                            {store.favorites.podcasts.map((podcast, index) => (
                                <li key={index} className="list-group-item">
                                    {podcast}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Sección de Libros */}
                {store.favorites?.books?.length > 0 && (
                    <div className="col-md-6 mb-4">
                        <h3 className="text-secondary">Libros</h3>
                        <ul className="list-group">
                            {store.favorites.books.map((book, index) => (
                                <li key={index} className="list-group-item">
                                    {book}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Sección de Ejercicios */}
                {store.favorites?.exercises?.length > 0 && (
                    <div className="col-md-6 mb-4">
                        <h3 className="text-secondary">Ejercicios</h3>
                        <ul className="list-group">
                            {store.favorites.exercises.map((exercise, index) => (
                                <li key={index} className="list-group-item">
                                    {exercise}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favoritos;
