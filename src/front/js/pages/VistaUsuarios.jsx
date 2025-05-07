import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const VistaUsuarios = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(null);
    const [isActive, setIsActive] = useState(null);
    const [url, setUrl] = useState("/api/admin/users");
    const [seccion, setSeccion] = useState("listaUsuarios");
    // const [cambioEnCondicion, setCambioEnCondicion] = useState(false);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        actions.logout();
        navigate("/");
    };

    const handleFiltrar = (name, email, isAdmin, isActive) => {
        const queryParams = [];

        if (name.trim() !== "") queryParams.push(`name=${name.trim()}`);
        if (email.trim() !== "") queryParams.push(`email=${email.trim()}`);
        if (isAdmin !== null && isAdmin !== undefined) queryParams.push(`is_admin=${isAdmin}`);
        if (isActive !== null && isActive !== undefined) queryParams.push(`is_active=${isActive}`);

        const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
        const fullUrl = `/api/admin/users${queryString}`;

        setUrl(fullUrl);
    };


    useEffect(() => {
        actions.listaFetch(url, seccion);
    }, [url]);


    return (
        <div className="container d-flex flex-column align-items-center">
            <div className="w-100 d-flex justify-content-between p-3">
                <button className="btn btn-secondary" onClick={() => handleNavigate("/admin-dashboard")}>
                    Regresar al Dashboard
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="d-flex py-3 justify-content-between">
                <div className="mx-1">
                    <label htmlFor="">filtrar por nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre de usuario"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />

                </div>
                <div className="mx-1">
                    <label htmlFor="">
                        filtrar por email:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Email de usuario"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />

                </div>
                <div className="mx-1">
                    <label htmlFor="">
                        filtrar por rol:
                    </label>
                    <select
                        className="form-select"
                        onChange={(e) => {
                            // setCambioEnCondicion(e.target.value);
                            if (e.target.value === "admin") {
                                setIsAdmin(true);
                            } else if (e.target.value === "user") {
                                setIsAdmin(false);
                            } else {
                                setIsAdmin(null);
                            }
                            // actions.listaFetch("/api/admin/users", seccion);
                        }}
                    >
                        <option value="">Seleccionar rol</option>
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                    </select>

                </div>
                <div className="mx-1">
                    <label htmlFor="">
                        filtrar por estado:
                    </label>
                    <select
                        className="form-select"
                        onChange={(e) => {
                            // setCambioEnCondicion(e.target.value);
                            if (e.target.value === "active") {
                                setIsActive(true);
                            } else if (e.target.value === "inactive") {
                                setIsActive(false);
                            } else {
                                setIsActive(null);
                            }
                            // actions.listaFetch("/api/admin/users", seccion);
                        }}
                    >
                        <option value="">Seleccionar estado</option>
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                    </select>
                </div>
                <div className="d-flex align-items-end">
                    <button
                        className="btn btn-primary"
                        onClick={() => handleFiltrar(name, email, isAdmin, isActive)}
                    >
                        Filtrar
                    </button>
                </div>
            </div>
            <div className="d-flex row">
                {store.listaUsuarios && store.listaUsuarios.length > 0 ? (
                    store.listaUsuarios.map((usuario, index) => (
                        <div key={index} className="col-6 ">
                            <div className="p-3 m-2 d-flex text-center rounded" style={{ boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.31)' }}>
                                <div className="col-6">
                                    <h5 className="card-title">{usuario.name}</h5>
                                    <p className="card-text">{usuario.email}</p>
                                    <p className="card-text">{usuario.is_active ? (
                                        <span className="text-success">Activo</span>
                                    ) : (
                                        <span className="text-danger">Suspendido</span>
                                    )}</p>
                                    <p className="card-text">{usuario.is_admin ? (
                                        <span className="text-primary">Administrador</span>
                                    ) : (
                                        <span className="text-secondary">Usuario</span>
                                    )}</p>
                                    <p className="card-text">{usuario.force_password_change !== null ? (
                                        <span className="text-success">Verificado</span>
                                    ) : (
                                        <span className="text-danger">No verificado</span>
                                    )}</p>
                                </div>
                                <div className="buttons d-flex flex-column col-6 justify-content-between px-1">
                                    <button
                                        className="btn btn-primary my-1 bg-warning"
                                        onClick={() => {
                                            actions.reestablecerContrasena(usuario.id)
                                                .then(() => actions.listaFetch(url, seccion))
                                        }}
                                    >
                                        Reestablecer contraseña
                                    </button>
                                    <button
                                        className="btn btn-primary my-1"
                                        onClick={() => {
                                            actions.suspenderReactivarUsuario(usuario.id)
                                                .then(() => actions.listaFetch(url, seccion))
                                        }}
                                    >
                                        {usuario.is_active ? 'Suspender' : 'Reactivar'}
                                    </button>
                                    <button
                                        className="btn btn-primary my-1 bg-danger"
                                        onClick={() => {
                                            actions.modificarIsAdmin(usuario.id)
                                                .then(() => actions.listaFetch(url, seccion))
                                        }}
                                    >
                                        {usuario.is_admin ? 'Quitar admin' : 'Hacer admin'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2 className="text-danger text-center mt-4">No hay usuarios registrados.</h2>
                )}
            </div>
        </div>
    );
};

export default VistaUsuarios;