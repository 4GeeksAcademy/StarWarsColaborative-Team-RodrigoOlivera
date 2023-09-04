import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { MdDelete } from "react-icons/md"

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const { favoritos } = store
	const { BorrarFavorito } = actions
	const token = localStorage.getItem("token")
	const navigate = useNavigate()

	useEffect(() => {
		if (store.auth === true) {
			actions.CargarFavoritos()
		}
	}, [store.auth])

	const salir = () => {
		actions.Logout()
		navigate("/login")
	}

	return (
		<>
			<nav className="navbar navbar-light bg-light py-0 px-5 bg-dark">
				<Link to="/">
					<img width="60" height="60" src="https://img.icons8.com/color/96/000000/star-wars.png" alt="star-wars" />
				</Link>
				<div className="ml-auto d-flex flex-row">
					{
						store.auth === true ? <div className="d-flex flex-row">
							<div className="dropdown" >
								<button className="btn btn-warning text-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									Favoritos <span class="badge bg-dark">{Array.isArray(favoritos) ? favoritos.length : 0}</span>
								</button>
								<div className="dropdown-menu dropdown-menu-end row p-2 " style={{ width: "250px" }}>
									<h3>Favoritos</h3>
									{
										Array.isArray(favoritos) === true ? favoritos.map((item, index) => {
											return <p key={index} className="d-flex flex-row justify-content-between align-content-center">{item} <button onClick={() => BorrarFavorito(item)} className="bg-transparent border-0"> <MdDelete /></button></p>
										}) : <p className="text-dark">{favoritos}</p>
									}

								</div>
							</div>
							<button onClick={salir} className="btn btn-warning text-white mx-2">Salir</button>
						</div> : <button onClick={() => navigate("/login")} className="btn btn-warning text-white mx-2">Iniciar Sesion</button>
					}

				</div>
			</nav>
		</>
	);
};

