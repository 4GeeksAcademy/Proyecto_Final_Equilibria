import { element } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// Información del usuario
			// mensajePorMood : false,
			info: null, // Información del usuario autenticado
			token: sessionStorage.getItem("token") || null, // Token almacenado
			mensajeIA: null, // Mensaje generado por IA
			message: null, // Mensaje genérico
			estado: null, // Estado de ánimo del usuario
			favoritos: {
				quotes: null, // Frases favoritas
				movies: null, // Películas favoritas
				series: null, // Series favoritas
				podcasts: null, // Podcasts favoritos
				books: null, // Libros favoritos
				exercises: null // Ejercicios favoritos
			}, // Lista de favoritos
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			loginUsuario: async (userData) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(userData)
					})
					if (!resp.ok) {
						throw new Error("Error accedeindo al user");
					}
					let data = await resp.json();
					sessionStorage.setItem("token", data.token);
					return true;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			userSignup: async (userData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/user", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(userData)
					})

					if (!resp.ok) {
						throw new Error("Something went wronggg");
					}

					let data = await resp.json()

					return data

				} catch (error) {
					console.log("Something went wrong:", error)

				}
			},
			adminSignup: async (userData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/signup-admin", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(userData)
					})

					if (!resp.ok) {
						console.log(resp)
						throw new Error("Something went wronggg");
					}

					let data = await resp.json()

					return data

				} catch (error) {
					console.log("Something went wrong:", error)

				}
			},
			verificarToken: async () => {
				try {
					// fetching data from the backend
					const token = sessionStorage.getItem("token");
					const resp = await fetch(process.env.BACKEND_URL + "/api/user", {
						method: "GET",
						headers: {
							"Authorization": "Bearer " + token
						}
					});

					if (!resp.ok) {
						throw new Error("Error, token no es correcto");
					}
					let data = await resp.json();

					setStore({ info: data });
					return true;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			logout: () => {
				try {
					sessionStorage.removeItem("token");
					setStore({ info: null });
					console.log("Usuario deslogueado exitosamente");
				} catch (error) {
					console.log("Error al intentar cerrar sesión:", error);
				}
			},
			listaFetch: async (url, seccion) => {
				try {
					const token = sessionStorage.getItem("token");
					const resp = await fetch(process.env.BACKEND_URL + url, {
						method: "GET",
						headers: {
							"Authorization": "Bearer " + token
						}
					});

					if (!resp.ok) {
						throw new Error("Error, token no es correcto");
					}
					let data = await resp.json();

					setStore({ ...getStore(), [seccion]: data });
					return true;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
			fetchFavoritos: async (url) => {
				try {
					const token = sessionStorage.getItem("token");
					const resp = await fetch(process.env.BACKEND_URL + url, {
						method: "GET",
						headers: {
							"Authorization": "Bearer " + token
						}
					});

					if (!resp.ok) {
						throw new Error("Error, token no es correcto");
					}
					let data = await resp.json();
					const favoritos = {
						quotes: [],
						movies: [],
						series: [],
						podcasts: [],
						books: [],
						exercises: []
					};
			
					for (const ele of data) {
						if (ele.type === "quote") {
							favoritos.quotes.push(ele);
						} else if (ele.type === "Película") {
							favoritos.movies.push(ele);
						} else if (ele.type === "Serie") {
							favoritos.series.push(ele);
						} else if (ele.type === "Podcast") {
							favoritos.podcasts.push(ele);
						} else if (ele.type === "Libro") {
							favoritos.books.push(ele);
						} else if (ele.type === "Ejercicio") {
							favoritos.exercises.push(ele);
						}
					}
					setStore({ ...getStore(), favoritos });
					return true;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
			eliminarFavorito: async (id, type) => {
				try {
					const token = sessionStorage.getItem("token");
					const resp = await fetch(process.env.BACKEND_URL + "api/favorite-del", {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
						body: JSON.stringify({ "favorite_id": id })
					});

					if (!resp.ok) {
						alert('There was an error trying to delete you favorite, try again')
						throw new Error("Error, token no es correcto");
					}
					let data = await resp.json();

					// setStore({ ...getStore(), [type]: data });
					return true;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
			guardarEstadodeanimo: async (estado) => {
				try {
					const token = sessionStorage.getItem("token");
					const resp = await fetch(process.env.BACKEND_URL + "api/entrada", {
						method: "POST",
						headers: {
							"Authorization": "Bearer " + token,
							"Content-Type": "application/json"
						},
						body: JSON.stringify(estado)
					});

					if (!resp.ok) {
						throw new Error("Error, token no es correcto");
					}
					setStore({ ...getStore(), estado: estado.mood_tag });

					return true;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			isAdmin: async () => {
				try {
					const token = sessionStorage.getItem("token");
					const resp = await fetch(process.env.BACKEND_URL + "/api/user", {
						method: "GET",
						headers: {
							"Authorization": "Bearer " + token
						}
					});

					if (!resp.ok) {
						throw new Error("Error, token no es correcto");
					}
					let data = await resp.json();

					if (data.is_admin === true) {
						return true;
					}
					return false;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			mensajePersonalizado: async (mood_tag) => {
				try {
					setStore({ ...getStore(), loadingMensajeIA: true, mensajeIA: null });
					const token = sessionStorage.getItem("token");
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/consejo-personalizado", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + token
						},
						body: JSON.stringify({ mood_tag })
					});
					const data = await resp.json();
					setStore({ ...getStore(), mensajeIA: data.advice, loadingMensajeIA: false });
					return true
				}
				catch (error) {
					console.log("Error loading message from backend", error)
					setStore({ ...getStore(), loadingMensajeIA: false });
				}
			},
			mensajePorMood: async () => {
				const store = getStore();
				await getActions().mensajePersonalizado(store.estado);
			},
			fraseMotivacional: async () => {
				try {
					setStore({ ...getStore(), loadingFraseMotivacionalIA: true, fraseMotivacional: null });
					const token = sessionStorage.getItem("token");
					const resp = await fetch(process.env.BACKEND_URL + "api/frase-motivacional", {
						method: "POST",
						headers: {
							"Authorization": "Bearer " + token
						}
					});

					if (!resp.ok) {
						throw new Error("Error, token no es correcto");
					}
					let data = await resp.json();

					setStore({ ...getStore(), fraseMotivacional: data, loadingFraseMotivacionalIA: false });
					return true;
				} catch (error) {
					console.log("Error loading message from backend", error)
					setStore({ ...getStore(), loadingFraseMotivacionalIA: false });
				}
			},
			frasesMotivacionales: async () => {
				try {
					setStore({ ...getStore(), loadingFrasesMotivacionalesIA: true, frasesMotivacionales: null });
					const token = sessionStorage.getItem("token");
					const resp = await fetch(process.env.BACKEND_URL + "api/frases-motivacionales", {
						method: "POST",
						headers: {
							"Authorization": "Bearer " + token
						}
					});

					if (!resp.ok) {
						throw new Error("Error, token no es correcto");
					}
					let data = await resp.json();

					setStore({ ...getStore(), frasesMotivacionales: data, loadingFrasesMotivacionalesIA: false });
					return true;
				} catch (error) {
					console.log("Error loading message from backend", error)
					setStore({ ...getStore(), loadingFrasesMotivacionalesIA: false });
				}
			},
			guardarFavorito: async (favorito) => {
				try {
					const token = sessionStorage.getItem("token");
					const resp = await fetch(process.env.BACKEND_URL + "api/favorite", {
						method: "POST",
						headers: {
							"Authorization": "Bearer " + token,
							"Content-Type": "application/json"
						},
						body: JSON.stringify(favorito)

						 });

					if (!resp.ok) {
						throw new Error("Error, token no es correcto");
					}
					let data = await resp.json();

					setStore({ ...getStore(), favoritos: data });
					return true;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			cargarRecomendaciones: async (busqueda) => {
				try {
					const token = sessionStorage.getItem("token");
					const resp = await fetch(process.env.BACKEND_URL + "api/recomendaciones", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
						body: JSON.stringify({ "busqueda": busqueda })
					});

					if (!resp.ok) {
						throw new Error("Error, token no es correcto");
					}
					let data = await resp.json();

					setStore({ ...getStore(), recomendaciones: data });
					return true;
				}
				catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			reestablecerContrasena: async (user_id) => {
				try {
					const token = sessionStorage.getItem("token");
					const resp = await fetch(process.env.BACKEND_URL + "api/admin/force-reset-password", {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							"authorization": "Bearer " + token
						},
						body: JSON.stringify({ "user_id": user_id })
					});
					if (!resp.ok) {
						throw new Error("Error, token no es correcto");
					}
				}
				catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			suspenderReactivarUsuario: async (user_id) => {
				try {
					const token = sessionStorage.getItem("token");
					const resp = await fetch(process.env.BACKEND_URL + "api/admin/suspender-activar-user", {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							"authorization": "Bearer " + token
						},
						body: JSON.stringify({ "user_id": user_id })
					});
					if (!resp.ok) {
						throw new Error("Error, token no es correcto");
					}
				}
				catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			modificarIsAdmin: async (user_id) => {
				try {
					const token = sessionStorage.getItem("token");
					const resp = await fetch(process.env.BACKEND_URL + "api/admin/hacer-deshacer-admin", {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							"authorization": "Bearer " + token
						},
						body: JSON.stringify({ "user_id": user_id })
					});
					if (!resp.ok) {
						throw new Error("Error, token no es correcto");
					}
				}
				catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			cambiarDatos: async (datos) => {
				try {
					const token = sessionStorage.getItem("token");
					const resp = await fetch(process.env.BACKEND_URL + "api/user/change-data", {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							"authorization": "Bearer " + token
						},
						body: JSON.stringify(datos)
					});
					if (!resp.ok) {
						throw new Error("Error, token no es correcto");
					}
					return true;
				}
				catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			setStore: (seccion, favorito_id) => {
				let store = getStore();
				store.favoritos[seccion] = store.favoritos[seccion].filter((item) => item.id !== favorito_id);
				setStore({ ...getStore(), [seccion] : store.favoritos[seccion] });
			},

		}
	};
};

export default getState;
