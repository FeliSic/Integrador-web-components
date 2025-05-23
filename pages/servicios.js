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

  // Cargar bg
  async function cargarBg() {
    try {
      const respuesta = await fetch("./components/bg/bg.html");
      if (!respuesta.ok) throw new Error("Error al cargar el background");

      const textoHTML = await respuesta.text();

      // Crear un contenedor temporal
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = textoHTML;

      // Extraer la etiqueta <header>
      const bgContent = tempDiv.querySelector(".background");

      if (bgContent) {
        const bgContainer = document.getElementById("services-section");
        bgContainer.prepend(bgContent); // Reemplazar el contenedor
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Cargar cards
  async function cargarCards() {
    try {
      const respuesta = await fetch("./components/card/card.html");
      if (!respuesta.ok) throw new Error("Error al cargar las cards");

      const textoHTML = await respuesta.text();

      // Crear un contenedor temporal
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = textoHTML;

      // Extraer la etiqueta <header>
      const cardsContent = tempDiv.querySelector(".container-card-mayor");

      if (cardsContent) {
        const cardContainer = document.getElementById("container-card-mayor");

        if (cardContainer) {
          // Insertar el contenido de las cards dentro del div existente
          cardContainer.innerHTML = cardsContent.innerHTML;
        } else {
          console.error(
            "No se encontró el contenedor 'container-card-mayor' en index.html"
          );
        }
      } else {
        console.error("No se encontró '.container-card-mayor' en card.html");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function fetchAllCardsData() {
    try {
      const response = await fetch(
        "https://cdn.contentful.com/spaces/ho9sw82c5vit/environments/master/entries?access_token=LauHIIiQWCam5Da5EjGDL_d-75gcdDdVvUzOZR6zORY&content_type=integradorWebComponents"
      );
      const data = await response.json();

      console.log("Datos recibidos desde Contentful:", data.items); // Depuración

      // Extraer cada tarjeta asegurando que el acceso es correcto
      const cards = data.items.map((item) => ({
        title: item.fields?.serviciosTitleCards || "Título no disponible",
        description:
          item.fields?.serviciosParrafarmsCards || "Descripción no disponible",
      }));

      console.log("Tarjetas procesadas:", cards); // Verifica que los títulos están definidos

      updateCards(cards);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }

  function updateCards(cards) {
    const cardContainers = document.querySelectorAll(".card-container");

    console.log("Número de tarjetas encontradas:", cardContainers.length);

    cards.forEach((card, index) => {
      if (cardContainers[index]) {
        const title = cardContainers[index].querySelector(
          `.card-title${index + 1}`
        );
        const description = cardContainers[index].querySelector(
          `.card-description${index + 1}`
        );

        if (title) title.textContent = card.title;
        if (description) description.textContent = card.description;

        console.log(`Tarjeta ${index + 1} actualizada`, {
          title: card.title,
          description: card.description,
        });
      } else {
        console.warn(`No se encontró una tarjeta en el índice ${index}`);
      }
    });
  }

  // Función para obtener datos de Contentful
  async function fetchServiceImg() {
    const url =
      "https://cdn.contentful.com/spaces/ho9sw82c5vit/entries?access_token=M032HuprFBBmaas-Acpf8_SVm93hca_tVCMVUNVI-AA";

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener datos de Contentful:", error);
      return null;
    }
  }

  // Función para extraer la URL de la imagen "develop"
  function findDevelopImage(data) {
    if (!data || !data.includes || !data.includes.Asset) {
      console.error("Formato de datos incorrecto o no hay assets");
      return null;
    }

    const developAsset = data.includes.Asset.find(
      (asset) => asset.fields && asset.fields.title === "develop"
    );

    if (!developAsset) {
      console.warn("No se encontró la imagen 'develop'");
      return null;
    }

    const imageUrl = developAsset.fields.file.url;
    return imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl;
  }

  // Función principal que carga la imagen en el elemento
  async function loadServiceImage() {
    const contentfulData = await fetchServiceImg();
    if (!contentfulData) return;

    const imageUrl = findDevelopImage(contentfulData);
    if (!imageUrl) return;

    // Asigna la URL al elemento <img class="main-img">
    const imgElement = document.querySelector(".main-img");
    if (imgElement) {
      imgElement.src = imageUrl;
      imgElement.alt = "develop"; // Opcional: añade un texto alternativo
    } else {
      console.warn("No se encontró el elemento .main-img");
    }
  }

  // Llama a esta función cuando necesites cargar la imagen
  loadServiceImage();

  async function fetchAndUpdateContent() {
    const url = `https://cdn.contentful.com/spaces/ho9sw82c5vit/environments/master/entries?access_token=LauHIIiQWCam5Da5EjGDL_d-75gcdDdVvUzOZR6zORY&content_type=integradorWebComponents`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log("Datos obtenidos de Contentful:", data); // Verifica si los datos llegan

      data.items.forEach((item) => {
        // 🔹 Títulos y secciones de texto
        const title = item.fields.holaSoyFelipe || "Título no disponible";

        const servTitle =
          item.fields.misServicios || "Título de servicios no disponible";
        const cardTitle =
          item.fields.serviciosTitleCards || "Título de tarjeta no disponible";

        document.querySelector(".main-title").textContent = title;

        fetchServiceImg();

        document.querySelector(".main-title").textContent = servTitle;

        // -------------------------------------------------------------------------------------

        // imgs section
        /* const welcImg = */

        //----------------------------------------------------------------------------------------
      });
    } catch (error) {
      console.error("Error al obtener datos de Contentful:", error);
    }
  }

  document.addEventListener("DOMContentLoaded", async () => {
    try {
      await cargarHeader(); // Primero carga la estructura del header
      await cargarFooter(); // Luego el footer
      await cargarBg(); // Luego el fondo
      await cargarCards(); // Inserta las tarjetas en el DOM antes de actualizar su contenido
      await fetchAllCardsData(); // Solo después de cargar las tarjetas, actualizamos con Contentful
      await fetchAndUpdateContent(); // Actualizar títulos, imágenes y texto después de tarjetas
    } catch (error) {
      console.error("Error en la carga de los componentes:", error);
    }
  });
})();
