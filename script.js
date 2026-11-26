// ===== API: PokeAPI (no necesita clave) =====
const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const MAX_ID = 1025; // cantidad aproximada de Pokémon disponibles

const cardsEl = document.getElementById("cards");
const statusEl = document.getElementById("status");
const loadBtn = document.getElementById("loadBtn");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModal");
const modalBody = document.getElementById("modalBody");

let pokemonesActuales = []; // guarda los Pokémon mostrados

// Devuelve un número entero aleatorio entre 1 y max
function idAleatorio(max = MAX_ID) {
  return Math.floor(Math.random() * max) + 1;
}

// Pide un Pokémon por id; si la respuesta no es correcta, lanza un error
async function obtenerPokemon(id) {
  const respuesta = await fetch(API_URL + id);
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al pedir el Pokémon ${id}`);
  }
  return respuesta.json();
}

// Color de cada tipo, como en los juegos
const TIPOS_COLORES = {
  normal: "#A8A77A", fire: "#EE8130", water: "#6390F0", electric: "#F7D02C",
  grass: "#7AC74C", ice: "#96D9D6", fighting: "#C22E28", poison: "#A33EA1",
  ground: "#E2BF65", flying: "#A98FF3", psychic: "#F95587", bug: "#A6B91A",
  rock: "#B6A136", ghost: "#735797", dragon: "#6F35FC", dark: "#705746",
  steel: "#B7B7CE", fairy: "#D685AD"
};

// Crea la ficha de un Pokémon (estilo Pokédex) usando DOM
function crearTarjeta(pokemon) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "card";
  tarjeta.style.cursor = "pointer";
  tarjeta.addEventListener("click", () => abrirModal(pokemon));

  const numero = document.createElement("span");
  numero.className = "card__numero";
  numero.textContent = `N.º ${String(pokemon.id).padStart(3, "0")}`;

  const contenedorImagen = document.createElement("div");
  contenedorImagen.className = "card__imagen";

  const imagen = document.createElement("img");
  imagen.src = pokemon.sprites.other?.["official-artwork"]?.front_default || pokemon.sprites.front_default;
  imagen.alt = `Imagen de ${pokemon.name}`;
  contenedorImagen.appendChild(imagen);

  const nombre = document.createElement("h3");
  nombre.textContent = pokemon.name;

  const tipos = document.createElement("div");
  tipos.className = "card__tipos";
  pokemon.types.forEach(t => {
    const pastilla = document.createElement("span");
    pastilla.className = "tipo";
    pastilla.textContent = t.type.name;
    pastilla.style.background = TIPOS_COLORES[t.type.name] || "#888";
    tipos.appendChild(pastilla);
  });

  tarjeta.append(numero, contenedorImagen, nombre, tipos);
  return tarjeta;
}

// Abre el modal con los detalles del Pokémon
function abrirModal(pokemon) {
  const imagenShiny = pokemon.sprites.other?.["official-artwork"]?.front_shiny || pokemon.sprites.front_shiny;
  const imagenNormal = pokemon.sprites.other?.["official-artwork"]?.front_default || pokemon.sprites.front_default;

  modalBody.innerHTML = `
    <div class="modal__header">
      <div class="modal__numero">N.º ${String(pokemon.id).padStart(3, "0")}</div>
      <h2 class="modal__titulo">${pokemon.name}</h2>
      ${imagenShiny ? `<button class="modal__shiny-toggle" id="shinyToggle" data-shiny="false">Ver Shiny</button>` : ""}
    </div>

    <div class="modal__imagen">
      <img id="modalImg" src="${imagenNormal}" alt="${pokemon.name}">
    </div>

    <div class="modal__tipos">
      ${pokemon.types.map(t => `
        <span class="tipo" style="background: ${TIPOS_COLORES[t.type.name] || '#888'}">
          ${t.type.name}
        </span>
      `).join("")}
    </div>

    <div class="modal__seccion">
      <h3>Medidas</h3>
      <div class="modal__info">
        <div class="modal__item">
          <span class="modal__label">Altura</span>
          <span class="modal__valor">${(pokemon.height / 10).toFixed(1)} m</span>
        </div>
        <div class="modal__item">
          <span class="modal__label">Peso</span>
          <span class="modal__valor">${(pokemon.weight / 10).toFixed(1)} kg</span>
        </div>
      </div>
    </div>

    <div class="modal__seccion">
      <h3>Estadísticas</h3>
      ${pokemon.stats.map(stat => `
        <div class="stat-bar">
          <span class="stat-bar__label">${stat.stat.name.substring(0, 3).toUpperCase()}</span>
          <div class="stat-bar__fill">
            <div class="stat-bar__valor" style="width: ${(stat.base_stat / 150) * 100}%">
              ${stat.base_stat}
            </div>
          </div>
        </div>
      `).join("")}
    </div>

    <div class="modal__seccion">
      <h3>Habilidades</h3>
      <div class="modal__lista">
        ${pokemon.abilities.map(a => `
          <span class="modal__lista-item">${a.ability.name}</span>
        `).join("")}
      </div>
    </div>

    <div class="modal__seccion">
      <h3>Movimientos</h3>
      <div class="modal__lista">
        ${pokemon.moves.slice(0, 8).map(m => `
          <span class="modal__lista-item">${m.move.name}</span>
        `).join("")}
      </div>
    </div>
  `;

  // Agregar funcionalidad al botón Shiny si existe
  const shinyToggle = modalBody.querySelector("#shinyToggle");
  if (shinyToggle && imagenShiny) {
    shinyToggle.addEventListener("click", () => {
      const modalImg = document.getElementById("modalImg");
      const isShiny = shinyToggle.getAttribute("data-shiny") === "true";

      if (isShiny) {
        modalImg.src = imagenNormal;
        shinyToggle.textContent = "Ver Shiny";
        shinyToggle.setAttribute("data-shiny", "false");
      } else {
        modalImg.src = imagenShiny;
        shinyToggle.textContent = "Normal";
        shinyToggle.setAttribute("data-shiny", "true");
      }
    });
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

// Cierra el modal
function cerrarModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

closeModalBtn.addEventListener("click", cerrarModal);

// Cierra el modal al hacer click fuera del contenido
modal.addEventListener("click", (e) => {
  if (e.target === modal) cerrarModal();
});

// Cierra el modal con la tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) {
    cerrarModal();
  }
});

// Carga 4 Pokémon al azar y los muestra. Se ejecuta al cargar la página y al hacer clic
async function cargarPokemon() {
  loadBtn.disabled = true;
  statusEl.textContent = "Cargando Pokémon...";
  cardsEl.innerHTML = "";
  searchInput.value = "";

  try {
    const ids = Array.from({ length: 4 }, () => idAleatorio());
    const pokemones = await Promise.all(ids.map(obtenerPokemon));
    pokemonesActuales = pokemones;
    mostrarPokemones(pokemones);
    statusEl.textContent = "";
  } catch (error) {
    statusEl.textContent = "No se pudieron cargar los datos. Probá de nuevo.";
    console.error(error);
  } finally {
    loadBtn.disabled = false;
  }
}

// Muestra las tarjetas en la pantalla
function mostrarPokemones(pokemones) {
  cardsEl.innerHTML = "";

  if (pokemones.length === 0) {
    statusEl.textContent = "No se encontraron resultados.";
    return;
  }
  pokemones.forEach(p => cardsEl.appendChild(crearTarjeta(p)));
  statusEl.textContent = "";
}

// Busca un Pokémon por nombre o número y lo muestra
async function buscarPokemon(termino) {
  if (termino.trim() === "") {
    mostrarPokemones(pokemonesActuales);
    return;
  }

  statusEl.textContent = "Buscando...";
  cardsEl.innerHTML = "";

  try {
    // Busca primero en los Pokémon cargados
    const coincidencias = pokemonesActuales.filter(p =>
      p.name.toLowerCase().includes(termino.toLowerCase()) ||
      String(p.id) === termino
    );

    if (coincidencias.length > 0) {
      mostrarPokemones(coincidencias);
      return;
    }

    // Si no encuentra, busca en la API (por nombre o número)
    const pokemon = await obtenerPokemon(termino.toLowerCase());
    mostrarPokemones([pokemon]);
  } catch (error) {
    statusEl.textContent = `"${termino}" no encontrado. Intenta otro nombre o Nº.`;
    cardsEl.innerHTML = "";
  }
}

loadBtn.addEventListener("click", cargarPokemon);

// Búsqueda en tiempo real (con pequeño delay)
let debounceTimer;
searchInput.addEventListener("input", (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    buscarPokemon(e.target.value.trim());
  }, 300);
});

// ===== Menú desplegable (evento click) =====
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  const abierto = menu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", abierto);
});

// Al elegir un enlace en el celular, el menú se cierra
menu.querySelectorAll("a").forEach(enlace => {
  enlace.addEventListener("click", () => {
    menu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ===== Validación del formulario =====
const form = document.getElementById("contactForm");

// Cada regla devuelve un mensaje de error, o "" si el valor es correcto
const reglas = {
  nombre: valor => {
    if (valor.trim() === "") return "El nombre es obligatorio.";
    if (valor.trim().length < 3) return "Debe tener al menos 3 caracteres.";
    return "";
  },
  email: valor => {
    if (valor.trim() === "") return "El correo es obligatorio.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return "El formato del correo no es válido.";
    return "";
  },
  mensaje: valor => {
    if (valor.trim() === "") return "El mensaje es obligatorio.";
    if (valor.trim().length < 10) return "Debe tener al menos 10 caracteres.";
    return "";
  }
};

// Muestra u oculta el error debajo del campo. Devuelve true si el campo es válido
function validarCampo(nombreCampo) {
  const campo = form.elements[nombreCampo];
  const error = reglas[nombreCampo](campo.value);
  form.querySelector(`[data-error="${nombreCampo}"]`).textContent = error;
  campo.classList.toggle("invalid", Boolean(error));
  return error === "";
}

// Valida al salir de cada campo (evento blur)
Object.keys(reglas).forEach(nombreCampo => {
  form.elements[nombreCampo].addEventListener("blur", () => validarCampo(nombreCampo));
});

// Valida todo al enviar. map revisa todos los campos para mostrar todos los errores
form.addEventListener("submit", event => {
  event.preventDefault();
  const esValido = Object.keys(reglas).map(validarCampo).every(Boolean);

  if (esValido) {
    alert("¡Mensaje enviado! Gracias por escribir.");
    form.reset();
  }
});

// ===== Pie de página =====
document.getElementById("year").textContent = new Date().getFullYear();

const botonArriba = document.getElementById("backToTop");

// Muestra el botón solo cuando el usuario bajó más de 300 px (evento scroll)
window.addEventListener("scroll", () => {
  botonArriba.hidden = window.scrollY < 300;
});

botonArriba.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Arrancamos mostrando los primeros Pokémon
cargarPokemon();
