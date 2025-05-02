import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const VistaUsuarios = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [url, setUrl] = useState("/api/admin/users");


    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        actions.logout();
        navigate("/");
    };

    const handleFiltrar = (name, email) => {
        if (name.trim() === "" && email.trim() === "") {
             setUrl("/api/admin/users");
        } else if (name.trim() !== "" && email.trim() === "") {
             setUrl(`/api/admin/users?name=${name}`);
        } else if (name.trim() === "" && email.trim() !== "") {
             setUrl(`/api/admin/users?email=${email}`);
        } else {
             setUrl(`/api/admin/users?name=${name}&email=${email}`);
        }
    }

    useEffect(() => {
        const seccion = "listaUsuarios";
        actions.listaFetch(url, seccion);
    }, [url]);

    return (
        <div className="container d-flex flex-column align-items-center">
            <div className="w-100 d-flex justify-content-between p-3 ">
                <button className="btn btn-secondary" onClick={() => handleNavigate("/admin-dashboard")}>
                    Regresar al Dashboard
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div>
                filtrar por nombre:
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre de usuario"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                filtrar por email:
                <input
                    type="text"
                    className="form-control"
                    placeholder="Email de usuario"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className="btn btn-primary mt-2"
                    onClick={() => handleFiltrar(name, email)}
                >
                    Filtrar
                </button>
            </div>
            <div>
                {store.listaUsuarios && store.listaUsuarios.length > 0 ? (
                    store.listaUsuarios.map((usuario, index) => (
                        <div key={index} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{usuario.username}</h5>
                                <p className="card-text">{usuario.email}</p>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => actions.eliminarUsuario(usuario.id)}
                                >
                                    Eliminar Usuario
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2 className="text-danger text-center mt-4">No hay usuarios registrados.</h2>
                )}
            </div>
        </div>
    );
}
export default VistaUsuarios;