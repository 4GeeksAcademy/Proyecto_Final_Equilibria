import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const VistaFavoritosSeries = () => {
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
        actions.eliminarFavorito(id, "series"); // Acción para eliminar una serie de favoritos
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
            <h1 className="text-center mb-4 text-primary">Tus Favoritos de Series</h1>
            <p className="text-center text-muted">Aquí puedes ver y gestionar tus series favoritas.</p>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {store.favoritos.series && store.favoritos.series.length > 0 ? (
                    store.favoritos.series.map((serie, index) => (
                        <div key={index} className="col">
                            <div className="card shadow-sm border-0">
                                <div className="card-body text-center">
                                    <h5 className="card-title">{serie.title}</h5>
                                    <p className="card-text">{serie.description}</p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleEliminarFavorito(serie.id)}
                                    >
                                        Eliminar de Favoritos
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2 className="text-danger text-center mt-4">No tienes series favoritas.</h2>
                )}
            </div>
        </div>
    );
};

export default VistaFavoritosSeries;