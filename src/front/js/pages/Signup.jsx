import React from "react";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";


export const Signup = () => {

    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    const signupFormRef = useRef(null)
    const navigate = useNavigate()
    


const handleName = (e) => {
    e.preventDefault()
    setName(e.target.value)
}

const handleEmail = (e) => {
    e.preventDefault()
    setEmail(e.target.value)
}

const handlePassword = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
}

const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password || !name) {
        alert("All fields are required, please try again.")
    }


    const userAvailable = await action.checkUserAvailable({email})

    if (userAvailable) {
        alert("User created successfully")
        navigate("/")
    } else {
        alert ("User already exists")
    }

    if (signupFormRef.current) {
        signupFormRef.current.reset()
    }
}

    return (
        <div>
           <form className="px-4" ref={signupFormRef}>
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input onChange = {handleName} type="text" className="form-control" id="inputName" aria-describedby="nameHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange = {handleEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange = {handlePassword} type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <button onClick = {handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}