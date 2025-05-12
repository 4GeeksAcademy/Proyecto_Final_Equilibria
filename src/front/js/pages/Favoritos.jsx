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

            <div className="row d-flex justify-content-center flex-column">
                {/* Sección de Quotes */}
                <div className="col-md-6 mb-4 text-center container shadow rounded p-3">
                    <h4>Tus palabras favoritas, siempre a tu alcance.</h4>
                    {store.favoritos?.quotes?.length > 0 ? (
                        <>
                            <p className="text-muted">Tienes {store.favoritos.quotes.length} frases favoritas.</p>
                            <button className="btn btn-primary" onClick={() => handleNavigate("/favoritos-quotes")}>Ver Frases</button>
                        </>
                    ) : (
                        <>
                            <p className="text-muted">Aún no tienes frases favoritas. ¡Explora frases motivacionales!</p>
                            <button className="btn btn-secondary" onClick={() => handleNavigate("/frases-motivacionales")}>Ir a Frases Motivacionales</button>
                        </>
                    )}
                </div>

                {/* Sección de Películas */}
                <div className="col-md-6 mb-4 text-center container shadow rounded p-3">
                    <h4>Tus películas favoritas, siempre disponibles.</h4>
                    {store.favoritos?.movies?.length > 0 ? (
                        <>
                            <p className="text-muted">Tienes {store.favoritos.movies.length} películas favoritas.</p>
                            <button className="btn btn-primary" onClick={() => handleNavigate("/favoritos-movies")}>Ver Películas</button>
                        </>
                    ) : (
                        <>
                            <p className="text-muted">Aún no tienes películas favoritas. ¡Explora recomendaciones!</p>
                            <button className="btn btn-secondary" onClick={() => handleNavigate("/recomendaciones")}>Ir a Recomendaciones</button>
                        </>
                    )}
                </div>

                {/* Sección de Series */}
                <div className="col-md-6 mb-4 text-center container shadow rounded p-3">
                    <h4>Tus series favoritas, listas para ver.</h4>
                    {store.favoritos?.series?.length > 0 ? (
                        <>
                            <p className="text-muted">Tienes {store.favoritos.series.length} series favoritas.</p>
                            <button className="btn btn-primary" onClick={() => handleNavigate("/favoritos-series")}>Ver Series</button>
                        </>
                    ) : (
                        <>
                            <p className="text-muted">Aún no tienes series favoritas. ¡Explora recomendaciones!</p>
                            <button className="btn btn-secondary" onClick={() => handleNavigate("/recomendaciones")}>Ir a Recomendaciones</button>
                        </>
                    )}
                </div>

                {/* Sección de Podcasts */}
                <div className="col-md-6 mb-4 text-center container shadow rounded p-3">
                    <h4>Tus podcasts favoritos, siempre a mano.</h4>
                    {store.favoritos?.podcasts?.length > 0 ? (
                        <>
                            <p className="text-muted">Tienes {store.favoritos.podcasts.length} podcasts favoritos.</p>
                            <button className="btn btn-primary" onClick={() => handleNavigate("/favoritos-podcasts")}>Ver Podcasts</button>
                        </>
                    ) : (
                        <>
                            <p className="text-muted">Aún no tienes podcasts favoritos. ¡Explora recomendaciones!</p>
                            <button className="btn btn-secondary" onClick={() => handleNavigate("/recomendaciones")}>Ir a Recomendaciones</button>
                        </>
                    )}
                </div>

                {/* Sección de Libros */}
                <div className="col-md-6 mb-4 text-center container shadow rounded p-3">
                    <h4>Tus libros favoritos, para disfrutar.</h4>
                    {store.favoritos?.books?.length > 0 ? (
                        <>
                            <p className="text-muted">Tienes {store.favoritos.books.length} libros favoritos.</p>
                            <button className="btn btn-primary" onClick={() => handleNavigate("/favoritos-books")}>Ver Libros</button>
                        </>
                    ) : (
                        <>
                            <p className="text-muted">Aún no tienes libros favoritos. ¡Explora recomendaciones!</p>
                            <button className="btn btn-secondary" onClick={() => handleNavigate("/recomendaciones")}>Ir a Recomendaciones</button>
                        </>
                    )}
                </div>

                {/* Sección de Ejercicios */}
                <div className="col-md-6 mb-4 text-center container shadow rounded p-3">
                    <h4>Tus ejercicios favoritos, listos para practicar.</h4>
                    {store.favoritos?.exercises?.length > 0 ? (
                        <>
                            <p className="text-muted">Tienes {store.favoritos.exercises.length} ejercicios favoritos.</p>
                            <button className="btn btn-primary" onClick={() => handleNavigate("/favoritos-exercises")}>Ver Ejercicios</button>
                        </>
                    ) : (
                        <>
                            <p className="text-muted">Aún no tienes ejercicios favoritos. ¡Explora recomendaciones!</p>
                            <button className="btn btn-secondary" onClick={() => handleNavigate("/recomendaciones")}>Ir a Recomendaciones</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Favoritos;
