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
        <div className="container mt-5 fade-in">
            <div className="d-flex justify-content-between mb-4">
                <button
                    className="btn btn-morado"
                    onClick={() => handleNavigate("/dashboard")}
                >
                    Regresar al Dashboard
                </button>
                <button className="btn btn-outline-light btn-logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Imagen decorativa */}
            <div className="image-container text-center mb-4">
                <img
    src="https://www.sicom.com.mx/wp-content/uploads/2022/05/recomendaciones-para-lograr-que-trabajadores-aprendan-de-manera-eficaz-con-contenido-instruccional.png"
    alt="Decoración"
    className="img-fluid banner-img"
/>

            </div>

            <h1 className="text-center text-morado">Recomendaciones</h1>
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
                    className="btn btn-morado mb-4"
                    onClick={() => actions.cargarRecomendaciones(busqueda)}
                >
                    Buscar
                </button>
            </div>
            {store.recomendaciones && store.recomendaciones.length > 0 ? (
                store.recomendaciones.map((recomendacion, index) => (
                    <div key={index} className="card mb-3 card-morado fade-in-up">
                        <div className="card-body">
                            <h5 className="card-title text-morado">{recomendacion.title}</h5>
                            <p className="card-text">{recomendacion.description}</p>
                        </div>
                        <div className="card-footer bg-transparent border-top-0">
                            <button
                                className="btn btn-morado"
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

const style = document.createElement("style");
style.innerHTML = `
    .btn-morado {
        background-color: #7e57c2 !important;
        color: white !important;
        border: none !important;
        transition: background-color 0.3s ease;
        box-shadow: 0 4px 6px rgba(126, 87, 194, 0.3);
    }

    .btn-morado:hover {
        background-color: #5e35b1 !important;
    }

    .text-morado {
        color: #7e57c2 !important;
    }

    .card-morado {
        border: 1px solid #d1c4e9 !important;
        box-shadow: 0 4px 12px rgba(126, 87, 194, 0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card-morado:hover {
        transform: scale(1.02);
        box-shadow: 0 6px 14px rgba(126, 87, 194, 0.4);
    }

    .btn-logout {
        border: 1px solid #7e57c2 !important;
        color: #7e57c2 !important;
        transition: all 0.3s ease;
    }

    .btn-logout:hover {
        background-color: #7e57c2 !important;
        color: white !important;
    }

    .fade-in {
        animation: fadeIn 1s ease-in-out;
    }

    .fade-in-up {
        animation: fadeInUp 0.8s ease-out;
    }

    .banner-img {
    max-height: 250px;
    object-fit: cover;
    border: none;
    box-shadow: none;
}


    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeInUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
