# Pokédex Interactiva

Una Pokédex interactiva desarrollada como Trabajo Práctico Integrador para Tecno3F. Integra la PokéAPI para mostrar información detallada de Pokémon en tiempo real con un diseño temático estilo Pokédex.

## Características

- Búsqueda dinámica por nombre o número Pokédex
- Diseño visual fiel a la Pokédex original con colores rojo y amarillo
- Responsive para desktop, tablet y móvil
- Información completa: estadísticas, tipos, habilidades, movimientos y versión shiny
- Carga de Pokémon aleatorios
- Formulario de contacto con validación en tiempo real
- Semántica HTML correcta y navegación accesible

## Tecnologías

- HTML5 - Estructura semántica
- CSS3 - Gradientes, animaciones, Flexbox, Grid
- JavaScript Vanilla - Sin frameworks, código limpio y funcional
- Fetch API - Integración con PokéAPI
- Google Fonts - Tipografía Orbitron y Poppins

## Cómo usar

1. Cargar la página
   - Se cargan 4 Pokémon aleatorios al abrir
   - Haz clic en cualquier tarjeta para ver detalles

2. Buscar Pokémon
   - Escribe un nombre: pikachu, charizard
   - O un número: 25, 006
   - Los resultados se filtran mientras escribes

3. Ver detalles
   - Haz clic en una tarjeta para abrir el modal
   - Verás: estadísticas, tipos, habilidades, movimientos
   - Botón "Ver Shiny" para versión alternativa coloreada

4. Cargar más
   - Botón "Cargar otros" para 4 Pokémon nuevos

5. Contacto
   - Completa el formulario con nombre, email y mensaje
   - Validación automática en tiempo real

## Estructura del proyecto

```
poke/
├── index.html      Estructura HTML
├── styles.css      Estilos completos
├── script.js       Lógica JavaScript
└── README.md       Este archivo
```

## API utilizada

PokéAPI - https://pokeapi.co/

Endpoints usados:
- /pokemon/{id} - Datos del Pokémon
- Sprites, tipos, stats, habilidades, movimientos

## Requisitos del TP cumplidos

- Sitio onepage con HTML, CSS, JavaScript
- 4+ secciones (Header, Contenido, API, Formulario, Footer)
- Integración API pública (PokéAPI)
- Datos dinámicos
- Eventos e interactividad
- Menú responsivo
- Formulario con validación JavaScript
- Año dinámico y botón "Volver arriba"
- Scroll suave entre secciones

## Características especiales

Diseño Pokédex:
- Lente azul con efecto 3D
- LEDs indicadores (rojo, amarillo, verde)
- Pantalla LCD verde para sección de Pokémon
- Bordes y sombras realistas
- Botones amarillos con efecto físico

Animaciones:
- Fade-in y slide-up del modal
- Hover effects en cards y botones
- Transiciones suaves en scroll
- Efecto "presionado" en botones

## Responsive

- Escritorio (720px+): Menú horizontal, diseño completo
- Móvil (<720px): Menú desplegable, cards adaptadas

## Funciones principales

JavaScript:
- cargarPokemon() - Carga 4 Pokémon aleatorios
- buscarPokemon(termino) - Busca por nombre o ID
- abrirModal(pokemon) - Muestra detalles en modal
- validarCampo(campo) - Valida campos del formulario
- Eventos: búsqueda con debounce, scroll, click, blur, submit

CSS:
- Gradientes radiales y lineales
- Flexbox y Grid layout
- Animaciones keyframe
- Variables CSS (:root)
- Media queries responsive

## Mejoras implementadas

- Tipografía de Google Fonts (Orbitron, Poppins)
- Modal interactivo con vista shiny
- Búsqueda en tiempo real
- Validación visual de formulario
- Scroll offset para títulos
- Navbar compacto
- Paleta de colores Pokémon auténtica

## Autor

Jenn Gold
jenngold.tecno3f@gmail.com
Tecno3F - Municipalidad de Tres de Febrero

## Licencia

Proyecto educativo. PokéAPI es de código abierto.

## Enlaces

GitHub - https://github.com/jenngold20/tpintegradorjs
PokéAPI - https://pokeapi.co/

---

Hecho para el Trabajo Práctico Integrador de Tecno3F
