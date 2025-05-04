import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const RegistroDiario = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [estado, setEstado] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (estado.trim() === "" || descripcion.trim() === "") {
      alert("Por favor, completa todos los campos antes de guardar.");
      return;
    }
    await actions.guardarEstadodeanimo({ mood_tag: estado, entry_text: descripcion });
    await actions.mensajePorMood();
    navigate("/diario");
  };

  const handleNavigateToDiario = () => {
    navigate("/diario");
  };

  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="btn btn-secondary"
          onClick={handleNavigateToDiario}
        >
          Volver al Diario
        </button>
        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Formulario */}
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Registrar estado de ánimo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="estado" className="form-label">
              Estado de ánimo
            </label>
            <select
              id="estado"
              name="estado"
              className="form-select"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="feliz">Feliz 😊</option>
              <option value="triste">Triste 😢</option>
              <option value="ansioso">Ansioso 😰</option>
              <option value="motivado">Motivado 💪</option>
              <option value="enojado">Enojado 😡</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Escribe lo que sientes
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows="4"
              className="form-control"
              placeholder="Escribe aquí..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Guardar entrada
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroDiario;
