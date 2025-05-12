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
        <div className="min-vh-100 bg-light">
            {/* Navbar */}
            <div className="w-100 d-flex justify-content-between p-4 bg-gradient shadow-sm" style={{ background: "linear-gradient(135deg, #6f42c1, #007bff)" }}>
                <h1 className="page-title text-white">Equilibra</h1>
                <div className="d-flex justify-content-end gap-3">
                    <button className="btn btn-outline-light" onClick={() => handleNavigate("/dashboard")}>
                        Dashboard usuario
                    </button>
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="container py-5">
                <div className="row row-cols-1 row-cols-md-2 g-4 px-4">
                    <div className="col">
                        <button className="btn btn-primary w-100 py-3" onClick={() => handleNavigate("/vista-usuarios")}>
                            Ver usuarios
                        </button>
                    </div>
                    <div className="col">
                        <button className="btn btn-warning w-100 py-3" onClick={handleNewAdmin}>
                            Crear nuevo admin
                        </button>
                    </div>
                </div>
            </div>

            <style>
                {`
                    /* Estilos personalizados */
                    .btn-primary {
                        background-color: #007bff;
                        border-color: #007bff;
                        color: white;
                        transition: background-color 0.3s, transform 0.2s;
                    }
                    .btn-primary:hover {
                        background-color: #0056b3;
                        border-color: #004085;
                        transform: scale(1.05);
                    }
                    .btn-warning {
                        background-color: #f39c12;
                        border-color: #e67e22;
                        color: white;
                        transition: background-color 0.3s, transform 0.2s;
                    }
                    .btn-warning:hover {
                        background-color: #e67e22;
                        border-color: #d35400;
                        transform: scale(1.05);
                    }
                    .btn-outline-light {
                        border-color: white;
                        color: white;
                        transition: border-color 0.3s, color 0.3s;
                    }
                    .btn-outline-light:hover {
                        border-color: #6f42c1;
                        color: #6f42c1;
                    }
                    .page-title {
                        font-size: 2rem;
                        font-weight: bold;
                    }
                    .w-100 {
                        width: 100% !important;
                    }
                    .container {
                        max-width: 1200px;
                    }
                    .bg-gradient {
                        background: linear-gradient(135deg, #6f42c1, #007bff) !important;
                    }
                    .shadow-sm {
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
                    }
                    .btn {
                        border-radius: 8px;
                    }
                `}
            </style>
        </div>
    );
};

export default AdminDashboard;
