import axios from "axios"
import { object } from "prop-types"
import { useNavigate } from "react-router"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			film: {},
			// EMPIEZA DESDE >> vehicles: [{...},{...},{...},{...}]
			favoritos: [],
			peoples: [],
			vehicles: [], // si recargo pagina pierdo por unos segundos hasta que se vuelva a llamar
			planets: [],
			films: [],
			starships: [],
			messageError: undefined,
			messageExisto: undefined,
			userinfo: undefined,
			PageInfo: undefined,
			auth: false
		},
		actions: {




			// EMPIEZA DESDE >> 21 a 50  FAVORITOS >>> RODRI
			guardarFavoritos: async (NameFav) => {
				let existElement = false
				getStore().favoritos.map((element) => {
					if (NameFav === element) {
						return existElement = true
					}
				})

				if (existElement === false) {
					setStore({ ...getStore(), favoritos: [...getStore().favoritos, NameFav] })
				}

















			},
			// EMPIEZA DESDE >> 51 a 80  PEOPLE >>> RODRI
			obtenerPersonas: async () => {
				console.log("xd")
				try {
					const resp = await fetch("https://swapi.dev/api/people")
					const data = await resp.json()
					const store = getStore()
					if (data) {
						data.results.map((item, index) => {
							const uid = index + 1
							return setStore({ ...store, peoples: [...store.peoples, { ...item, uid: uid }] })
						})
					}
					console.log(store)

				} catch (error) {

				}











			},
			// EMPIEZA DESDE >> 81 a 110  VEHICLES >>> MATIAS

			getIdfromUrl: itemUrl => { // RECIBE UNA URL ej. https: // swapi.dev / api /vehicles / 4 / y le saca el numero 👹 
				const urlParts = itemUrl.split('/') // separa la string que llega por los / que tenga y devuelve un array de stringsssss ✨
				return urlParts[urlParts.length - 2]
			},

			obtenerVehiculos: async () => {
				try {
					const response = await fetch("https://swapi.dev/api/vehicles/")
					const data = await response.json()

					const vehiculosConId = await Promise.all(
						data.results.map(async item => {
							return { ...item, id: await getActions().getIdfromUrl(item.url) }
						})
					)
					setStore({ vehicles: vehiculosConId });
				} catch (error) {
					console.log(error)
				}
			},









			// EMPIEZA DESDE >> 111 a 140  PLANETS >>> JUAN
			obtenerPlanetas: async () => {
				const url = 'https://www.swapi.tech/api/planets';
				try {
					const response = await fetch(url);
					const data = await response.json();

					const planetsWithDetails = await Promise.all(
						data.results.map(async (planet) => {
							const detailResponse = await fetch(planet.url);
							const detailData = await detailResponse.json();
							return {
								...planet,
								properties: detailData.result.properties
							};
						})
					);
					setStore({ planets: planetsWithDetails });
				} catch (error) {
					console.error('Ocurrió un error:', error);
				}
			},








			// EMPIEZA DESDE >> 141 a 170  FILMS >>> KAROL
			obtenerPeliculas: async () => {
				const url = 'https://swapi.dev/api/films';
				try {
					const response = await fetch(url);
					const data = await response.json();
					console.log(data)
					data.results.map((item, index) => {
						const id = index + 1
						return setStore({ ...getStore(), films: [...getStore().films, { ...item, id: id }] })
					})
				} catch (error) {
					console.error('Ocurrió un error:', error);
				}
			},

			obtenerPeliculaIndividual: async (id) => {
				const url = 'https://swapi.dev/api/films/';
				console.log(id)
				try {
					const response = await fetch(url + id);
					const data = await response.json();
					console.log(data)
					setStore({ film: data });
				} catch (error) {
					console.error('Ocurrió un error:', error);
				}

			},

			// EMPIEZA DESDE >> 171 a 200  STARSHIPS >>> YOSELIN
			obtenerNaves: async () => {



























			},
			// EMPIEZA DESDE >> 201 a 200  Funcion que filtre datos en base a id >>> Rodrigo
			TraerInfoEspesifica: async (uid, tipo) => {
				console.log(`Estas buscando la api aca https://swapi.dev/api/${tipo}/${uid}`)
				try {
					console.log(`Estas buscando la api aca https://swapi.dev/api/${tipo}/${uid}`)
					const resp = await fetch(`https://swapi.dev/api/${tipo}/${uid}`)
					const data = await resp.json()
					console.log(data)
					setStore({ ...getStore(), PageInfo: data })

				} catch (error) {
					console.log(error)
				}
			},
			BorrarFavorito: (elements) => {
				const Favs = getStore().favoritos

				const newArr = Favs.filter((item) => {
					return item !== elements
				})

				setStore({ ...getStore(), favoritos: newArr })
			},
			RegistrarUsuario: async (formRegister) => {
				console.log(formRegister)
				const store = getStore()
				try {
					const { data } = await axios.post("https://vigilant-garbanzo-p99w6qpr6693rvg-3000.app.github.dev/register", formRegister)
					console.log(data)
					if (data.ok == true) {
						setStore({ ...store, messageExisto: data.msg, messageError: undefined })
						return true
					} else if (data.ok == false) {
						setStore({ ...store, messageError: data.msg })
						return false
					}

				} catch (error) {
					return false
					console.log(error)
				}

			},
			Login: async (dataLogin) => {
				try {
					const data = await axios.post("https://vigilant-garbanzo-p99w6qpr6693rvg-3000.app.github.dev/login", dataLogin)

					if (data.status === 200) {
						setStore({ ...getStore(), userinfo: data.data.info, auth: true })
						localStorage.setItem("token", data.data.token)
					}
					return true
				} catch (error) {
					console.log(error)
					if (error.response.status === 401) {
						console.log("error en las credenciales")
						setStore({ ...getStore(), messageError: error.response.data.msg })
					}
					return false

				}
			},
			CargarFavoritos: async () => {
				try {
					const store = getStore()
					const token = localStorage.getItem("token")
					const data = await axios.get(`https://vigilant-garbanzo-p99w6qpr6693rvg-3000.app.github.dev/user/favorite`, {
						headers: { "Authorization": "Bearer " + token }
					})
					if (data.data.dataFinal) {
						setStore({ ...store, favoritos: data.data.dataFinal })
					} else {
						setStore({ ...store, favoritos: data.data.msg })

					}
				} catch (error) {
					console.log(error)
				}
			},
			CargarInfoUserEspesifico: async () => {
				try {
					// Pending
				} catch (error) {
					console.log(error)
				}
			},
			Logout: () => {
				console.log("se cerro sesion existosamente")
				localStorage.removeItem("token")
				setStore({ ...getStore(), userinfo: undefined, auth: false })
			},
			ValidToken: async () => {
				try {
					const token = localStorage.getItem("token")
					const response = await axios.get(`https://vigilant-garbanzo-p99w6qpr6693rvg-3000.app.github.dev/validToken`, {
						headers: { "Authorization": "Bearer " + token }
					})
					console.log(response)
					if (response.status == 200) {
						setStore({ ...getStore(), auth: true })
					}
				} catch (error) {
					if (error.response.status > 400) {
						console.log(error)
						getActions().Logout()
					}
				}

			}

		}
	}
}

export default getState
