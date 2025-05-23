(function main() {
  async function cargarHeader() {
    try {
      const respuesta = await fetch("./components/header/header.html");
      if (!respuesta.ok) throw new Error("Error al cargar el header");

      const textoHTML = await respuesta.text();

      // Crear un contenedor temporal
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = textoHTML;

      // Extraer la etiqueta <header>
      const headerContent = tempDiv.querySelector("header");

      if (headerContent) {
        const headerContainer = document.getElementById("header-container");
        headerContainer.replaceWith(headerContent); // Reemplazar el contenedor

        // Activar eventos de `header.js` después de agregar el header
        inicializarEventosHeader();
      } else {
        console.error("No se encontró un <header> en header.html.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Función para inicializar eventos del menú después de cargar `header.html`
  function inicializarEventosHeader() {
    const menuToggle = document.querySelector(".menu-toggle-abre");
    const nav = document.querySelector(".header__links-nav");
    const closeMenu = document.querySelector(".close-menu");

    if (menuToggle && nav && closeMenu) {
      menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
      });

      closeMenu.addEventListener("click", () => {
        nav.classList.remove("active");
      });
    } else {
      console.error("Los elementos del menú no se encontraron.");
    }
  }

  // Cargar footer
  async function cargarFooter() {
    try {
      const respuesta = await fetch("./components/footer/footer.html");
      if (!respuesta.ok) throw new Error("Error al cargar el footer");

      const textoHTML = await respuesta.text();

      // Crear un contenedor temporal
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = textoHTML;

      // Extraer la etiqueta <header>
      const footerContent = tempDiv.querySelector("footer");

      if (footerContent) {
        const footerContainer = document.getElementById("footer-container");
        footerContainer.replaceWith(footerContent); // Reemplazar el contenedor
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  document.addEventListener("DOMContentLoaded", async () => {
    try {
      await cargarHeader(); // Primero carga la estructura del header
      await cargarFooter(); // Luego el footer
      crearFormularioContacto(); // Finalmente, cargamos el formulario de contacto
    } catch (error) {
      console.error("Error en la carga de los componentes:", error);
    }
  });
})();
