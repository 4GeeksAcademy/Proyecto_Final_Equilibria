import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Hero Section */}
            <header
                className="text-white py-5"
                style={{ background: 'linear-gradient(to right, #20c997, #0d6efd)' }}
            >
                <div className="container text-center">
                    <h1 className="display-4 fw-bold mb-3">Bienvenido a Equilibria</h1>
                    <p className="lead mb-4">Tu acompañante digital hacia el bienestar mental</p>
                    <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                        <button className="btn btn-light btn-lg shadow" onClick={() => handleNavigate('/login')}>
                            Iniciar Sesión   
                        </button>
                        <button className="btn btn-outline-light btn-lg shadow" onClick={() => handleNavigate('/signup')}>
                            Registrarse
                        </button>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <main className="flex-grow-1 bg-light py-5" id="features">
                <div className="container">
                    <h2 className="text-center mb-5">¿Qué ofrecemos?</h2>
                    <div className="row row-cols-1 row-cols-md-3 g-5 justify-content-center">
                        <div className="col d-flex">
                            <div className="card flex-fill text-center border-0 rounded-3 shadow-lg">
                                <div className="card-body p-4">

                                    <h5 className="card-title mb-2">Privacidad Segura</h5>
                                    <p className="card-text">
                                        Tus datos y reflexiones están siendo compartidos, ni utilizados con nadie.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col d-flex">
                            <div className="card flex-fill text-center border-0 rounded-3 shadow-lg">
                                <div className="card-body p-4">

                                    <h5 className="card-title mb-2">Soporte Empático</h5>
                                    <p className="card-text">
                                        Recibe recomendaciones personalizadas para tu bienestar emocional.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col d-flex">
                            <div className="card flex-fill text-center border-0 rounded-3 shadow-lg">
                                <div className="card-body p-4">

                                    <h5 className="card-title mb-2">Seguimiento Activo</h5>
                                    <p className="card-text">
                                        Monitorea tu progreso y mantente motivado día a día.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white py-4 border-top mt-auto">
                <div className="container text-center text-muted small">
                    &copy; {new Date().getFullYear()} Equilibria. Todos los derechos reservados.
                </div>
            </footer>
        </div>
    );
}
export default LandingPage;