const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// Información del usuario

			info: null, // Información del usuario autenticado
			token: sessionStorage.getItem("token") || null, // Token almacenado
			message: null, // Mensaje genérico
			estado: null, // Estado de ánimo del usuario
			favoritos: [], // Lista de favoritos
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
			eliminarFavorito: async (id) => {
				try {
					const token = sessionStorage.getItem("token");
					const resp = await fetch(process.env.BACKEND_URL + "/api/favorite-quotes/" + id, {
						method: "DELETE",
						headers: {
							"Authorization": "Bearer " + token
						}
					});

					if (!resp.ok) {
						alert('There was an error trying to delete you favorite, try again')
						throw new Error("Error, token no es correcto");
					}
					let data = await resp.json();

					setStore({ ...getStore(), favoritos: data });
					alert('Favorite quote successfully deleted!')
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
					let data = await resp.json();

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
			mensajePersonalizado: async(mood_tag) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/consejo-personalizado", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ mood_tag })
					});
					const data = await resp.json();
					setStore({ ...getStore(), message: data.advice });
					return true
				}
				catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
		}
	};
};

export default getState;
