// Soy Dalto - Curso de JAVASCRIPT desde CERO (Completo) - Nivel MID LEVEL. Capitulo 11. Creando soluciones en la historia de Cofla. Solucion 1
// Fechas de desarrollo: inicio(2022-04-14), fin(2022-04-23).

// Cofla está en su ultimo año y necesita recuperar todas sus notas para que le puedan decir si efectivamente pasó al ultimo semestre, de ser así,... ¡Cofla ya estaría a un solo paso para finalizar su carrera como ingeniero! Pero hay un problema: estas notas están almacenadas en otro servidor.
// - Crear un sistema que almacene toda la informacion de las materias y las muestre en pantalla de forma ordenada.



// Elementos HTML
let estudianteNombre_titulo = document.getElementById("estudianteNombre_titulo")
let estudianteNombre_input = document.getElementById("estudianteNombre_input")
let estudianteNombre_mensaje = document.getElementById("estudianteNombre_mensaje")
let materiaNombre_titulo = document.getElementById("materiaNombre_titulo")
let materiaNombre_input = document.getElementById("materiaNombre_input")
let materiaNombre_mensaje = document.getElementById("materiaNombre_mensaje")
let materiaNota_titulo = document.getElementById("materiaNota_titulo")
let materiaNota_input = document.getElementById("materiaNota_input")
let materiaNota_mensaje = document.getElementById("materiaNota_mensaje")
let anadirMateria_boton = document.getElementById("anadirMateria_boton")
let materiasAgregadas = document.getElementById("materiasAgregadas")
let eliminarMaterias_boton = document.getElementById("eliminarMaterias_boton")
let ordenarMaterias_boton = document.getElementById("ordenarMaterias_boton")
let guardarMaterias_boton = document.getElementById("guardarMaterias_boton")
let mensajeParaDesarrollador = document.getElementById("mensajeParaDesarrollador")

// Materias agregadas a DOM
let materiasParaEnviarAservidor = []

// Crear objeto para enviara a servidor por Internet
const agregarMateriaAobjetoParaServidor = (nombre, nota)=> {
	let objeto = { "nombre": `${nombre}`, "nota": nota }
	materiasParaEnviarAservidor.push(objeto) 
}

// Numero para id de materia agregada a DOM
let numeroParaId = 0

// Creador de elemento para materias
const agregarMateriaAlDOM = (nombreDeMateria, notaDeMateria, numeroParaId)=> {
	let nuevoElemento = document.createElement("SPAN")
	nuevoElemento.setAttribute("id", `materia${numeroParaId}`)
	nuevoElemento.textContent = `${nombreDeMateria}: ${notaDeMateria}`
	materiasAgregadas.appendChild(nuevoElemento)
	let nuevoBr = document.createElement("BR")
	materiasAgregadas.appendChild(nuevoBr)
}

// Funciones a utilizar en el proyecto
const comprobarInputQueNoEsteVacio = (objeto)=>{
	return new Promise((resolve, reject)=> {
		if (objeto.valor == "") {
			objeto.mensaje = "Rellene este campo"
			objeto.sinErrores = false, 
			reject(objeto)
		} else {
			objeto.sinErrores = true, 
			resolve(objeto)
		}
	})
}
const comprobarInputQueNoSeaNumero = (objeto)=> {
	return new Promise((resolve, reject)=> {
		if (!isNaN(objeto.valor[0])) {
			objeto.mensaje = "Rellene este campo empezando con letras"
			objeto.sinErrores = false, 
			reject(objeto)
		} else {
			objeto.sinErrores = true, 
			resolve(objeto)				
		}
	})
}
const comprobarInputQueSeaNumero = (objeto)=> {
	return new Promise((resolve, reject)=>{
		if (isNaN(objeto.valor)) {
			objeto.mensaje = "Rellene este campo con un numero"
			objeto.sinErrores = false, 
			reject(objeto)
		} else {
			objeto.sinErrores = true, 
			resolve(objeto)				
		}
	} )
}

class Div {
	constructor(valor, elementoParaMensaje) {
		this.valor = valor
		this.elementoParaMensaje = elementoParaMensaje
	}
}

// Evento de boton para añadir materia
anadirMateria_boton.addEventListener("click", (evento)=> {
	let nombreDeMateria = new Div( materiaNombre_input.value.trim(), materiaNombre_mensaje )
	let notaDeMateria = new Div( materiaNota_input.value.trim(), materiaNota_mensaje )
	
	
	const recibirPromesasParaCorregirErrores = async()=> {
		let promesa = await comprobarInputQueNoEsteVacio(nombreDeMateria)
		if (promesa.sinErrores == true) {
			materiaNombre_mensaje.setAttribute("hidden", "something")
		} else throw promesa
		
		promesa = await comprobarInputQueNoSeaNumero(nombreDeMateria)
		if (promesa.sinErrores == true) {
			materiaNombre_mensaje.setAttribute("hidden", "something")
		} else throw promesa
		
		// promesa = await comprobarInputQueNoEsteVacio(notaDeMateria)
		// if (promesa.sinErrores == true) {
		// 	materiaNota_mensaje.setAttribute("hidden", "something")
		// } else throw promesa
		
		promesa = await comprobarInputQueSeaNumero(notaDeMateria)
		if (promesa.sinErrores == true) {
			materiaNota_mensaje.setAttribute("hidden", "something")
			
			agregarMateriaAlDOM(nombreDeMateria.valor, notaDeMateria.valor, numeroParaId)
			agregarMateriaAobjetoParaServidor(nombreDeMateria.valor, notaDeMateria.valor)
			
			// guardarMaterias_boton.value = "Guardar materias"
			eliminarMaterias_boton.removeAttribute("disabled")
			eliminarMaterias_boton.removeAttribute("hidden")
			ordenarMaterias_boton.removeAttribute("disabled")
			ordenarMaterias_boton.removeAttribute("hidden")
			guardarMaterias_boton.removeAttribute("disabled")
			guardarMaterias_boton.removeAttribute("hidden")
			mensajeParaDesarrollador.setAttribute("hidden", "something")
			
			materiaNombre_input.value = ""
			materiaNota_input.value = ""
		} else throw promesa
	}
	recibirPromesasParaCorregirErrores().catch((promesaRechazada)=> {
		console.log(promesaRechazada)
		promesaRechazada.elementoParaMensaje.textContent = `${promesaRechazada.mensaje}`
		promesaRechazada.elementoParaMensaje.removeAttribute("hidden")
	})
})

// Evento de boton para eliminar lista de materias
eliminarMaterias_boton.addEventListener("click", (evento)=> {
	document.getElementById("materiasAgregadas").innerHTML = ``
	materiasParaEnviarAservidor = []
	numeroParaId = 0
	
	eliminarMaterias_boton.setAttribute("disabled", "something")
	ordenarMaterias_boton.setAttribute("disabled", "something")
	guardarMaterias_boton.setAttribute("disabled", "something")
	
	materiaNombre_input.value = ""
	notaMateria_input.value = ""
	mensajeParaDesarrollador.setAttribute("hidden", "something")
})

// Evento de boton para ordenar la lista de materias en el DOM
ordenarMaterias_boton.addEventListener("click", (evento)=> {
	materiasParaEnviarAservidor.sort((a, b)=> {
		// Supe de este algoritmo para ordenar objetos de array por su propiedad gracias a: https://www.delftstack.com/es/howto/javascript/sort-array-based-on-some-property-javascript/#:~:text=En%20JavaScript%2C%20usamos%20la%20funci%C3%B3n,usar%20el%20m%C3%A9todo%20reverse()%20.
		if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
			return -1
		}
		if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
			return 1
		}
		return 0
	})

	
	materiasAgregadas.innerHTML = ``
	
	const devolverPromesa = (numeroDeIteracion)=> {
		return new Promise((resolve, reject)=> {
			
			setTimeout(()=> {
				// Esto simula como si fuese un servidor, o sea, la cuestion de que un servidor puede devolver datos despues de tardar un tiempo
				resolve(()=> {
					agregarMateriaAlDOM(materiasParaEnviarAservidor[numeroDeIteracion].nombre, materiasParaEnviarAservidor[numeroDeIteracion].nota, numeroDeIteracion +1)
				})
			}, Math.random() * 1000)
		})
	}
	const recibirPromesa = async ()=> {
		ordenarMaterias_boton.setAttribute("disabled", "something")
		mensajeParaDesarrollador.setAttribute("hidden", "something")
		
		for (let i = 0; i < materiasParaEnviarAservidor.length; i++) {
			let funcionAejecutar = await devolverPromesa(i)
			funcionAejecutar()
		}
		
		ordenarMaterias_boton.removeAttribute("disabled")
		// guardarMaterias_boton.value = "Guardar materias"
		guardarMaterias_boton.removeAttribute("disabled")
		mensajeParaDesarrollador.setAttribute("hidden", "something")
	}; recibirPromesa()
})

// Evento de boton para guardar la lista de materias en un objeto 
guardarMaterias_boton.addEventListener("click", (evento)=> {
	let nombreDeEstudiante = new Div( estudianteNombre_input.value.trim(), estudianteNombre_mensaje )
	
	const datosCompletosParaGuardar = (nombreDeEstudiante, materias)=> {
		return { "nombreDeEstudiante": nombreDeEstudiante, "materias": materias }		
	}
	
	const recibirPromesasParaCorregirErrores = async ()=> {
		try {
			let promesa = await comprobarInputQueNoEsteVacio(nombreDeEstudiante)
			if (promesa.sinErrores == true) {
				
			} else {
				throw promesa
			}
			promesa = await comprobarInputQueNoSeaNumero(nombreDeEstudiante)
			if(promesa.sinErrores == true) {
				guardarMaterias_boton.value = "Materias guardadas"
				guardarMaterias_boton.setAttribute("disabled", "something")
				estudianteNombre_mensaje.setAttribute("hidden", "something")
				
				console.log(datosCompletosParaGuardar(nombreDeEstudiante.valor, materiasParaEnviarAservidor))
				
				mensajeParaDesarrollador.removeAttribute("hidden")
			} else throw promesa
		} catch(promesaRechazada) {
			console.log("No")
			promesaRechazada.elementoParaMensaje.textContent = `${promesaRechazada.mensaje}`
			promesaRechazada.elementoParaMensaje.removeAttribute("hidden")
		}
	}; recibirPromesasParaCorregirErrores()
})
