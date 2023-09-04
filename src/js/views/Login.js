import React, { useContext, useEffect, useState } from "react"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router"


export const Login = () => {

    const initialForm = {
        email: "",
        password: ""
    }
    const navigate = useNavigate()
    const [stateForm, setStateForm] = useState(initialForm)

    const { store, actions } = useContext(Context)
    const { messageError } = store

    useEffect(() => {
        localStorage.removeItem("token")
    }, [])

    const ValidarFormulario = async (e) => {
        e.preventDefault()
        const loginStatus = await actions.Login(stateForm)
        if (loginStatus === true) {
            navigate("/home")
        }
    }

    return (
        <div className="row ">
            <h1 style={{ marginTop: "100px" }} className="text-white text-center">Login </h1>
            <div className="col-3 mx-auto p-4 bg-white" style={{ marginTop: "50px" }}>
                <form onSubmit={ValidarFormulario}>
                    {
                        messageError && <div className="alert alert-danger" role="alert">
                            {messageError}
                        </div>
                    }
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input value={stateForm.email} onChange={(e) => setStateForm({ ...stateForm, email: e.target.value })} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input value={stateForm.password} onChange={(e) => setStateForm({ ...stateForm, password: e.target.value })} type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className=" btn btn-warning m-auto">Login</button>
                    <p className="text-center">No tienes una cuenta? <span role="button" className="text-warning" onClick={() => navigate("/register")}>Crear Una</span> </p>
                </form>

            </div>
        </div>
    )

}