(function main() {
  console.log("Esta función se ejecuta automáticamente.");
  const form = document.querySelector(".section__form");
  console.log(form);

  document.addEventListener("DOMContentLoaded", () => {
    crearFormularioContacto(); // Llamada a la función que crea el formulario
  });
})();
