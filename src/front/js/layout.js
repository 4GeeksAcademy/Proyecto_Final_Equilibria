import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Login from "./pages/login.jsx";
import { Signup } from "./pages/Signup.jsx";
import  Dashboard  from "./pages/dashboard.jsx";
import VistaFavoritos  from "./pages/vistaFavoritos.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Registrodiario from "./pages/registrodiario.jsx";
import  VistaUsuarios  from "./pages/VistaUsuarios.jsx";
import Diario from "./pages/Diario.jsx";
import  FrasesMotivacionales  from "./pages/FrasesMotivacionales.jsx";
import Recomendaciones from "./pages/Recomendaciones.jsx";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Login />} path="/" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Diario />} path="/diario" />
                        <Route element={<Dashboard />} path="/dashboard" />
                        <Route element={<AdminDashboard />} path="/admin-dashboard" />
                        <Route element={<Registrodiario />} path="/registrar-entrada" />
                        <Route element={<FrasesMotivacionales />} path="/frases-motivacionales" />
                        <Route element={<Recomendaciones />} path="/recomendaciones" />
                        <Route element={<VistaUsuarios />} path="/vista-usuarios" />
                        <Route element={<VistaFavoritos />} path="/favoritos" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
