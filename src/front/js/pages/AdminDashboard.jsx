import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

const AdminDashboard = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };
    
    const handleNewAdmin = () => {
        navigate('/signup-admin')
    }
    const handleLogout = () => {
        actions.logout();
        navigate("/");
    };

    return (
        <div>
            {/* Navbar */}
            <div className="w-100 d-flex justify-content-between p-3 bg-light shadow-sm">
                <h1 className="page-title">Equilibra</h1>
                <div className="d-flex justify-content-end p-3 gap-3">
                <button className="btn btn-secondary" onClick={() => handleNavigate("/dashboard")}>
                    Dashboard usuario
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
                </div>

            </div>

            <div className="row row-cols-1 row-cols-md-2 g-4 px-4">
                {/* <div className="col">
                    <div className="card pb-3">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Usuario</h5>
                            <p className="card-text">
                                This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                            </p>
                        </div>
                        <div className="buttons">
                            <a href="#" className="btn btn-primary mx-2 bg-warning">Reestablecer contraseña</a>
                            <a href="#" className="btn btn-primary mx-2">Suspender/Reactivar</a>
                            <a href="#" className="btn btn-primary mx-2 bg-danger">Eliminar</a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card pb-3">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Usuario</h5>
                            <p className="card-text">
                                This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                            </p>
                        </div>
                        <div className="buttons">
                            <a href="#" className="btn btn-primary mx-2 bg-warning">Reestablecer contraseña</a>
                            <a href="#" className="btn btn-primary mx-2">Suspender/Reactivar</a>
                            <a href="#" className="btn btn-primary mx-2 bg-danger">Eliminar</a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card pb-3">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Usuario</h5>
                            <p className="card-text">
                                This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                            </p>
                        </div>
                        <div className="buttons">
                            <a href="#" className="btn btn-primary mx-2 bg-warning">Reestablecer contraseña</a>
                            <a href="#" className="btn btn-primary mx-2">Suspender/Reactivar</a>
                            <a href="#" className="btn btn-primary mx-2 bg-danger">Eliminar</a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card pb-3">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Usuario</h5>
                            <p className="card-text">
                                This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                            </p>
                        </div>
                        <div className="buttons">
                            <a href="#" className="btn btn-primary mx-2 bg-warning">Reestablecer contraseña</a>
                            <a href="#" className="btn btn-primary mx-2">Suspender/Reactivar</a>
                            <a href="#" className="btn btn-primary mx-2 bg-danger">Eliminar</a>
                        </div>
                    </div>
                </div> */}
                <div>
                    <button className="btn btn-primary mx-2 " onClick={() => handleNavigate("/vista-usuarios")}>
                        Ver usuarios
                    </button>
                    <button className="btn btn-warning mx-2 " onClick={handleNewAdmin}>
                        Crear nuevo admin
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;