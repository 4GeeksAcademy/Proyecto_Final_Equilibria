import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const RegistroDiario = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [estado, setEstado] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!estado.trim() || !descripcion.trim()) {
      alert("Por favor, completa todos los campos antes de guardar.");
      return;
    }


    actions.guardarEstadodeanimo({ estado, descripcion });
    navigate("/diario");
    console.log("Estado de ánimo:", estado);
    console.log("Descripción:", descripcion);


    setEstado("");
    setDescripcion("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Registrar estado de ánimo</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
              Estado de ánimo
            </label>
            <select
              id="estado"
              name="estado"
              className="w-full border border-gray-300 rounded-xl p-2 mb-4 focus:ring-2 focus:ring-blue-400"
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
          <div className="d-flex flex-column">
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
              Escribe lo que sientes
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows="4"
              className="w-full border border-gray-300 rounded-xl p-2 mb-4 focus:ring-2 focus:ring-blue-400"
              placeholder="Escribe aquí..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-300"
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
