import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";

const Diario = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [url, setUrl] = useState("api/diario");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const seccion = "listaEntradas";
            await actions.listaFetch(url, seccion);
            await actions.mensajePorMood();
        };

        fetchData();
    }, [url]);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        actions.logout();
        navigate("/");
    };

    const handleFiltrar = () => {
        const s = startDate.trim();
        const e = endDate.trim();

        if (s > e) {
            alert("La fecha de inicio no puede ser posterior a la de fin");
            return;
        }
        setUrl(`api/diario/?start_date=${s}&end_date=${e}`);
    };

    const descargarPDF = async () => {
        const s = startDate.trim();
        const e = endDate.trim();

        if (!s && !e) {
            actions.descargarPDF({});
            return;
        }

        if (s && e) {
            if (s > e) {
                alert("La fecha de inicio debe ser anterior o igual a la de fin");
                return;
            }

            await actions.descargarPDF({ start_date: s, end_date: e });
            return;
        }

        alert("Por favor, completa fecha de inicio y fecha de fin, o déjalas ambas vacías para ver todo.");
    };

    return (
        <div className="container mt-5" style={{ backgroundColor: "#fff" }}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                
                  <button
    className="btn btn-purple shadow-sm"
    onClick={() => handleNavigate("/dashboard")}
    style={{ backgroundColor: "#6f42c1", borderColor: "#6f42c1", color: "white" }}
>
    Regresar al Dashboard
</button>


            </div>

            {/* Título */}
            <h2 className="text-center mb-4" style={{ color: "#6f42c1" }}>
                Mi Diario
            </h2>

            {/* Mensaje generado por IA */}
            <div className="mb-4">
                {store.loadingMensajeIA ? (
                    <p className="text-center text-muted">Cargando mensaje...</p>
                ) : store.mensajeIA && store.info ? (
                    <div className="alert alert-info p-4 rounded shadow-lg border border-primary">
                        <h4 className="text-primary mb-2">Hola, {store.info.name}!</h4>
                        <p className="mb-0">{store.mensajeIA}</p>
                    </div>
                ) : null}
            </div>

            {/* Filtro de fechas */}
            <div className="row g-3 align-items-end mb-4">
                <div className="col-md-5">
                    <label htmlFor="startDate" className="form-label" style={{ color: "#6f42c1" }}>
                        Fecha de inicio
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        className="form-control"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                    />
                </div>
                <div className="col-md-5">
                    <label htmlFor="endDate" className="form-label" style={{ color: "#6f42c1" }}>
                        Fecha de fin
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        className="form-control"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />
                </div>
                <div className="col-md-2 d-flex gap-3">
                    <button className="btn btn-purple" onClick={handleFiltrar}>
                        Filtrar
                    </button>
                    {store.listaEntradas && store.listaEntradas.length > 0 && (
                        <button className="btn btn-purple" onClick={descargarPDF}>
                            Descargar PDF
                        </button>
                    )}
                </div>
            </div>

            {/* Lista de entradas */}
            {store.listaEntradas && store.listaEntradas.length > 0 ? (
                store.listaEntradas.map((entrada, index) => (
                    <div key={entrada.id} className="card mb-3 shadow-lg border border-secondary">
                        <div className="card-body">
                            <h5 className="card-title text-capitalize" style={{ color: "#6f42c1" }}>
                                Estado de ánimo: {entrada.mood_tag}
                            </h5>
                            <p className="card-text text-muted">
                                {new Date(entrada.date).toLocaleDateString()} -{" "}
                                {new Date(entrada.date).toLocaleTimeString()}
                            </p>
                            <p className="card-text" style={{ color: "#333" }}>{entrada.entry_text}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="d-flex flex-column align-items-center justify-content-center mt-4">
    <img 
        src="https://static.vecteezy.com/system/resources/previews/012/132/219/non_2x/calendar-with-coffee-plant-and-pencil-cartoon-icon-illustration-business-object-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg" 
        alt="No hay entradas registradas" 
        style={{ height: "300px", width: "300px" }}
    />
    <h4 className="text-muted mt-3">No hay entradas registradas todavía.</h4>
</div>

            )}

            {/* Botón para registrar nueva entrada */}
            <div className="position-fixed bottom-0 end-0 m-4">
                <button
                    className="btn btn-purple btn-lg rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                    style={{ width: "60px", height: "60px" }}
                    onClick={() => handleNavigate("/registrar-entrada")}
                >
                    <i style={{ color: "white", fontSize: "30px" }}>+</i>
                </button>
            </div>
        </div>
    );
};

export default Diario;
