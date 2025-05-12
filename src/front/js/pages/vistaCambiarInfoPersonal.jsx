import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const VistaCambiarInfoPersonal = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [nombre, setNombre]       = useState(store.info?.name        || "");
  const [password, setPassword]   = useState("");
  const [email, setEmail]         = useState(store.info?.email       || "");
  const [gender, setGender]       = useState(store.info?.gender      || "");
  const [preferences, setPrefs]   = useState(
    Array.isArray(store.info?.preferences)
      ? store.info.preferences.join(", ")
      : store.info?.preferences || ""
  );
  const [guardando, setGuardando] = useState(false);
  const [alerta, setAlerta]       = useState(null);

  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };
  const handleNavigate = (path) => {
    navigate(path);
  }

  // 3. Envío del formulario
  const handleSubmit = async e => {
    e.preventDefault();
    setGuardando(true);
    setAlerta(null);

    const payload = {};
      if (nombre.trim()) payload.new_name = nombre
      if (password) payload.new_password = password
      if (email.trim()) payload.new_email= email
      if (gender.trim()) payload.new_gender= gender
      if (preferences.trim()) payload.new_preferences = preferences.split(",").map(s => s.trim())
    const resp = await actions.cambiarDatos(payload);
    setGuardando(false);
    setAlerta({
      tipo: resp ? "success" : "danger",
      mensaje: resp ? "¡Datos actualizados!" : "Error actualizando",
    });
    if (resp) await actions.verificarToken(), navigate("/dashboard")
  };

  return (
    <div>
      {/* Navbar simplificada */}
      <div className="w-100 d-flex justify-content-between p-3 bg-light shadow-sm">
        <h1 className="page-title">Equilibra</h1>
        <div className="d-flex gap-2">
          {store.info?.is_admin && (
            <button
              className="btn btn-secondary"
              onClick={() => handleNavigate("/admin-dashboard")}
            >
              Dashboard Admin
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={() => handleNavigate("/dashboard")}
          >
            Dashboard
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h1 className="card-title mb-3">Cambiar Información Personal</h1>
            {/* <p>
              Usuario:{" "}
              <span className="badge bg-secondary">
                {store.info?.name}
              </span>
            </p> */}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Nombre */}
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      placeholder="Nombre"
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                      required
                    />
                    <label htmlFor="nombre">Nombre</label>
                  </div>
                </div>

                {/* Contraseña */}
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Contraseña nueva"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Contraseña nueva</label>
                  </div>
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Correo electrónico"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                    <label htmlFor="email">Correo electrónico</label>
                  </div>
                </div>

                {/* Gender */}
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="gender"
                      placeholder="Género"
                      value={gender}
                      onChange={e => setGender(e.target.value)}
                    />
                    <label htmlFor="gender">Género</label>
                  </div>
                </div>

                {/* Preferences */}
                <div className="col-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="preferences"
                      placeholder="Preferencias (coma separadas)"
                      value={preferences}
                      onChange={e => setPrefs(e.target.value)}
                    />
                    <label htmlFor="preferences">
                      Preferencias (coma separadas)
                    </label>
                  </div>
                </div>
              </div>

              {/* Alert de feedback */}
              {alerta && (
                <div
                  className={`alert alert-${alerta.tipo} mt-3`}
                  role="alert"
                >
                  {alerta.mensaje}
                </div>
              )}

              {/* Botón de envío */}
              <button
                type="submit"
                className="btn btn-primary mt-4"
                disabled={guardando}
              >
                {guardando ? "Guardando…" : "Guardar cambios"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaCambiarInfoPersonal;
