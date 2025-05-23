(function main() {
  document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle-abre");
    const nav = document.querySelector(".header__links-nav");
    const closeMenu = document.querySelector(".close-menu");

    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("active"); // Agrega la clase 'active' para abrir el menú
    });

    closeMenu.addEventListener("click", function () {
      nav.classList.remove("active"); // Quita la clase 'active' para cerrar el menú
    });
  });
})();
