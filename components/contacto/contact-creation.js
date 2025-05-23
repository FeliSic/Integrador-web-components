function crearFormularioContacto() {
  const formCreate = document.createElement("form");
  formCreate.classList.add("form");

  const formLabelName = document.createElement("label");
  formLabelName.classList.add("form__label");
  formLabelName.setAttribute("for", "name");
  const h3 = document.createElement("h3");
  h3.classList.add("contacto__title");
  h3.textContent = "Nombre";
  formLabelName.appendChild(h3);

  const formInputName = document.createElement("input");
  formInputName.classList.add("form__input-name");
  formInputName.setAttribute("type", "text");
  formInputName.setAttribute("id", "name");

  formCreate.appendChild(formLabelName);
  formCreate.appendChild(formInputName);

  const containerDiv2 = document.createElement("div");
  containerDiv2.classList.add("form__container");

  const formLabelEmail = document.createElement("label");
  formLabelEmail.classList.add("form__label");
  formLabelEmail.setAttribute("for", "email");
  const h3Segundo = document.createElement("h3");
  h3Segundo.classList.add("contacto__title");
  h3Segundo.textContent = "Email";
  formLabelEmail.appendChild(h3Segundo);

  const formInputEmail = document.createElement("input");
  formInputEmail.classList.add("form__input-email");
  formInputEmail.setAttribute("type", "email");
  formInputEmail.setAttribute("id", "email");

  formCreate.appendChild(formLabelEmail);
  formCreate.appendChild(formInputEmail);

  const formLabelTextArea = document.createElement("label");
  formLabelTextArea.classList.add("form__label");
  formLabelTextArea.setAttribute("for", "message");
  const h3Tercero = document.createElement("h3");
  h3Tercero.classList.add("contacto__title");
  h3Tercero.textContent = "Mensaje";
  formLabelTextArea.appendChild(h3Tercero);

  const formInputTextArea = document.createElement("textarea");
  formInputTextArea.classList.add("form__input-textarea");
  formInputTextArea.setAttribute("id", "message");

  const button = document.createElement("button");
  button.classList.add("form__button");
  button.textContent = "Enviar ✈️";
  formCreate.appendChild(button);

  const boton = document.createElement("div");
  boton.appendChild(button);

  formCreate.appendChild(formLabelTextArea);
  formCreate.appendChild(formInputTextArea);
  formCreate.appendChild(button);

  document.querySelector(".section__form").appendChild(formCreate);

  const form = document.querySelector("form");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const url = "https://apx.school/api/utils/email-to-student";
    const body = {
      to: email,
      message: message,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Mensaje enviado correctamente");
        // Opcional: Limpiar el formulario
        form.reset();
      } else {
        alert("Error al enviar el mensaje");
      }
    } catch (error) {
      alert("Error de conexión");
    }
  });
}
