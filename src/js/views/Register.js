import React, { useContext, useEffect, useState } from "react"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router"


export const Register = () => {

    const initialForm = {
        name: "",
        lastname: "",
        email: "",
        password: ""
    }
    const navigate = useNavigate()
    const [stateForm, setStateForm] = useState(initialForm)
    const { store, actions } = useContext(Context)
    const { messageExisto, messageError } = store

    const Registrarme = async (e) => {
        e.preventDefault()
        if (stateForm.name !== "" && stateForm.lastname !== "" && stateForm.email !== "" && stateForm.password !== "") {
            const statusRegister = await actions.RegistrarUsuario(stateForm)
            if (statusRegister === true) {
                setTimeout(() => {
                    navigate("/login")
                }, 1000);
            }
            // ahora tendremos que mandar el formulario y manejar el error si el email ya existe   

        }
    }


    return (
        <div className="row ">
            <div className="col-3 m-auto mt-5 bg-light px-5 py-2 rounded-3">
                <h1 className="text-center mb-3">Registrar Usuario</h1>
                {
                    messageError && <div className="alert alert-danger" role="alert">
                        {messageError}
                    </div>
                }
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={stateForm.name} onChange={(e) => setStateForm({ ...stateForm, name: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastname" className="form-label">Lastname</label>
                        <input type="text" className="form-control" id="lastname" aria-describedby="emailHelp" value={stateForm.lastname} onChange={(e) => setStateForm({ ...stateForm, lastname: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" value={stateForm.email} onChange={(e) => setStateForm({ ...stateForm, email: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={stateForm.password} onChange={(e) => setStateForm({ ...stateForm, password: e.target.value })} />
                    </div>
                    {
                        messageExisto && <div className="alert alert-success" role="alert">
                            {messageExisto}
                        </div>
                    }
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button onClick={Registrarme} type="submit" className="btn btn-warning">Registrarme</button>
                    <p className="text-center">Ya tienes una cuenta? <span role="button" className="text-warning" onClick={() => navigate("/login")}>Registrarme</span> </p>
                </form>

            </div>
        </div>
    )

}