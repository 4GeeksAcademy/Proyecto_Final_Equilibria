import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const VistaFavoritosBooks = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const handleLogout = () => {
        actions.logout();
        navigate("/");
    };
    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleEliminarFavorito = (id) => {
        actions.eliminarFavorito(id, "books"); // Acción para eliminar un libro de favoritos
        actions.setStore("books", id)
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
            <h1 className="text-center mb-4 text-primary">Tus Favoritos de Libros</h1>
            <p className="text-center text-muted">Aquí puedes ver y gestionar tus libros favoritos.</p>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {store.favoritos.books && store.favoritos.books.length > 0 ? (
                    store.favoritos.books.map((book, index) => (
                        <div key={index} className="col">
                            <div className="card shadow-sm border-0">
                                <div className="card-body text-center">
                                    <h5 className="card-title">{book.title}</h5>
                                    <p className="card-text">{book.description}</p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleEliminarFavorito(book.id)}
                                    >
                                        Eliminar de Favoritos
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2 className="text-danger text-center mt-4">No tienes libros favoritos.</h2>
                )}
            </div>
        </div>
    );
};

export default VistaFavoritosBooks;