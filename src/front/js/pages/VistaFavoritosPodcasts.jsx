import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const VistaFavoritosPodcasts = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path); // Acción para navegar a otra página
    };
    const handleLogout = () => {
        actions.logout(); // Acción para cerrar sesión
        navigate("/"); // Navegar a la página de inicio
    };

    const handleEliminarFavorito = (id) => {
        actions.eliminarFavorito(id, "podcasts"); // Acción para eliminar un podcast de favoritos
    };

    return (
        <div className="container mt-5">
            {/* Botones superiores */}
            <div className="w-100 d-flex justify-content-between p-3">
                <button
                    className="btn btn-secondary"
                    onClick={() => handleNavigate("/favoritos")}
                >
                    Regresar a Favoritos
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <h1 className="text-center mb-4 text-primary">Tus Favoritos de Podcasts</h1>
            <p className="text-center text-muted">Aquí puedes ver y gestionar tus podcasts favoritos.</p>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {store.favoritos.podcasts && store.favoritos.podcasts.length > 0 ? (
                    store.favoritos.podcasts.map((podcast, index) => (
                        <div key={index} className="col">
                            <div className="card shadow-sm border-0">
                                <div className="card-body text-center">
                                    <h5 className="card-title">{podcast.title}</h5>
                                    <p className="card-text">{podcast.description}</p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleEliminarFavorito(podcast.id)}
                                    >
                                        Eliminar de Favoritos
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2 className="text-danger text-center mt-4">No tienes podcasts favoritos.</h2>
                )}
            </div>
        </div>
    );
};

export default VistaFavoritosPodcasts;