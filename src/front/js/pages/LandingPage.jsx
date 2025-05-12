import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <header
                className="text-white py-5 position-relative"
                style={{
                    backgroundImage: 'url("https://elmundoderegina.com/wp-content/uploads/2021/10/Salud-Mental.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        zIndex: 1,
                    }}
                ></div>

                <motion.div
                    className="container text-center"
                    style={{ position: 'relative', zIndex: 2 }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
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
                </motion.div>
            </header>

            <main className="flex-grow-1 bg-light py-5" id="features">
                <div className="container">
                    <h2 className="text-center mb-5">¿Qué ofrecemos?</h2>
                    <div className="row row-cols-1 row-cols-md-3 g-5 justify-content-center">
                        {[
                            {
                                title: 'Privacidad Segura',
                                text: 'Tus datos y reflexiones no se comparten ni se utilizan con terceros.',
                                image: 'https://studentprivacycompass.org/wp-content/uploads/2021/01/Screen-Shot-2021-01-11-at-9.43.25-AM-1.png',
                            },
                            {
                                title: 'Soporte Empático',
                                text: 'Recibe recomendaciones personalizadas para tu bienestar emocional.',
                                image: 'https://img.freepik.com/vector-premium/amigo-compasivo-mujer-consuelo-nina-triste-mujeres-hablan-sobre-empatia-apoyo-amigos-terapia-depresion-estres-o-ansiedad-ayuda-al-concepto-vector-caracter-llanto-molesto-abrazando-hombros_102902-3877.jpg',
                            },
                            {
                                title: 'Seguimiento Activo',
                                text: 'Monitorea tu progreso y mantente motivado día a día.',
                                image: 'https://img.freepik.com/vector-premium/mujer-hablando-psicologo-psicologia-terapia-salud-mental_254685-1244.jpg',
                            },
                        ].map((feature, index) => (
                            <motion.div
                                className="col d-flex"
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="card flex-fill text-center border-0 rounded-3 shadow-lg">
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="card-img-top"
                                        style={{ height: '150px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body p-4">
                                        <h5 className="card-title mb-2">{feature.title}</h5>
                                        <p className="card-text">{feature.text}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            <motion.footer
                className="bg-white py-4 border-top mt-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
            >
                <div className="container text-center text-muted small">
                    &copy; {new Date().getFullYear()} Equilibria. Todos los derechos reservados.
                </div>
            </motion.footer>
        </div>
    );
};

export default LandingPage;
