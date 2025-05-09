import React, { useContext } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Context } from "../store/appContext";

const ReestablecerContrasena = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const recoveryForm = useRef()
    const {store, actions} = useContext(Context)

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const checkUser = () => {
        actions.checkUser()
    }

    return <div className=" d-flex justify-content-center ">
        <form className="row px-4 col-4 p-4" ref={recoveryForm}>
            <input onChange={handleEmail} type="email" className="form-control" id="inputEmail" aria-describedby="nameHelp" placeholder="ingrese su email" />
            <button onClick={checkUser} className="btn btn-primary my-2">Reestablecer contraseña</button>
            <button type="button" onClick={()=> navigate('/')} className="btn btn-primary ">Regresar</button>
        </form>
    </div>
}

export default ReestablecerContrasena