"use strict";

// colapsar contneido formularios cuando tengamos otra opción abierta

// constantes del form.
const diseña = document.querySelector(".form-title-js");
const rellena = document.querySelector(".form-title2-js");
const comparte = document.querySelector(".form-title3-js");
let allInputs = document.querySelectorAll(".js-input");
const resetButton = document.querySelector(".preview__button");
const paletteDesing = document.querySelectorAll(".list__palette");

//constantes tarjeta preview
const namePreview = document.querySelector(".name");
const jobPreview = document.querySelector(".profession");
const linkedinPreview = document.querySelector(".linkedin-js");
const githubPreview = document.querySelector(".github-js");
const emailLink = document.querySelector(".js-email");
const iconPhone = document.querySelector(".linkPhone");
const icons = document.querySelectorAll(".js-icon");
const iconsBorder = document.querySelectorAll(".js-iconBorder");

const cardButton = document.querySelector("#button-card");
const shareDiv = document.querySelector("#share-card");

// Reiniciar formulario con reset button:
function resetForm(event) {
  event.preventDefault();
  for (const eachInput of allInputs) {
    if (event.currentTarget) {
      eachInput.value = "";
    }
  }
}
resetButton.addEventListener("click", resetForm);
console.log("entra");

// funciones collapsables del formulario y giro de flecha
function handClickCollapsed(event) {
  event.currentTarget.parentNode.classList.toggle("collapsed");
  const arrow = event.currentTarget.querySelector(".js-arrow");
  arrow.classList.toggle("js-arrow-down");
}

// TARJETA DE PREVIEW
const data = {
  name: "",
  job: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  photo: "",
  palette: 1,
};

// función para actualizar tarjeta de preview con datos usuaria
function renderPreviewCard() {
  if (data.name === "") {
    namePreview.innerHTML = "Nombre y apellidos";
  } else {
    namePreview.innerHTML = data.name;
  }
  if (data.job === "") {
    jobPreview.innerHTML = "Profesión";
  } else {
    jobPreview.innerHTML = data.job;
  }
  if (data.email === "") {
    emailLink.href = "";
  } else {
    emailLink.href = `mailto:${data.email}`;
  }
  if (data.linkedin === "") {
    linkedinPreview.href = "";
  } else {
    linkedinPreview.href = data.linkedin;
  }
  if (data.github === "") {
    githubPreview.href = "";
  } else {
    githubPreview.href = data.github;
  }
  if (data.phone === "") {
    iconPhone.href = "";
  } else {
    iconPhone.href = `tel:+34${data.phone}`;
  }
}

// Función cambiar colores según paleta

// Función para recoger el valor de los inputs y volcar al objeto data
function getData(event) {
  // Recogemos el valor que escribe la usuaria
  const selectedInputValue = event.currentTarget.value;
  // Obtenemos el id del input clickado (name, job...)
  const selectedInputId = event.currentTarget.id;
  // Si la usuaria escribe en el input id name, vuelco el valor en el objeto data.name
  // if (selectedInputId === "name") {
  //   data.name = selectedInputValue;
  // } else if (selectedInputId === "job") {
  //   data.job = selectedInputValue;
  // } else if (selectedInputId === "email") {
  //   data.email = selectedInputValue;
  // } else if (selectedInputId === "phone") {
  //   let patternPhone = /^[6-7-9]{1}[0-9]{8}$/;
  //   if (patternPhone.test(selectedInputValue)) {
  //     data.phone = selectedInputValue;
  //   } else {
  //     event.currentTarget.title =
  //       "Por favor, introduce un número de teléfono fijo o móvil de España";
  //   }
  // } else if (selectedInputId === "linkedin") {
  //   console.log(selectedInputValue);
  //   data.linkedin = selectedInputValue;
  // } else if (selectedInputId === "github") {
  //   console.log(selectedInputValue);
  //   data.github = selectedInputValue;
  // } else if (selectedInputId === "photo") {
  //   data.photo = selectedInputValue;
  // } else if (selectedInputId === "palette") {
  //   data.palette = selectedInputValue;
  // }

  data[selectedInputId] = selectedInputValue;
  console.log(data);
  renderPreviewCard();
}

for (const eachInput of allInputs) {
  eachInput.addEventListener("keyup", getData);
}

function handleCreateCard(event) {
  //Poner preventDefault si es botón type submit
  event.preventDefault();
  //Función handleCreateCard: hacemos fetch al servidor para enviar objeto data
  fetch("https://awesome-profile-cards.herokuapp.com/card", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

// inhablitar botón cuando se ha clicado
// y mostrar div de compartir tarjeta cuando se haya creado

// function unabling() {
//   cardButton.classList.add("unabled");
//   shareDiv.classList.remove("hidden");
// }
function addListenersPalette() {
  for (const eachCheckBox of paletteDesing) {
    eachCheckBox.addEventListener("click", changeColorPalette);
  }
}
addListenersPalette();

function changeColorPalette(event) {
  let checkBox = event.currentTarget.children[0];
  // Si está desmarcado al clickar todo el div, lo marcamos
  if (checkBox.checked === false) {
    checkBox.checked = true;
  }
  // Segunda paleta
  if (event.currentTarget.classList.contains("second__color")) {
    namePreview.classList.add("color2");
    for (const icon of icons) {
      icon.classList.add("color2-icon");
    }
    for (const iconBorder of iconsBorder) {
      iconBorder.classList.add("color2-icon-border");
    }
  } else {
    namePreview.classList.remove("color2");
    for (const icon of icons) {
      icon.classList.remove("color2-icon");
    }
    for (const iconBorder of iconsBorder) {
      iconBorder.classList.remove("color2-icon-border");
    }
  }
  // Tercera paleta
  if (event.currentTarget.classList.contains("third__color")) {
    for (const icon of icons) {
      icon.classList.add("color3-icon");
    }
    for (const iconBorder of iconsBorder) {
      iconBorder.classList.add("color3-icon-border");
    }
  } else {
    for (const icon of icons) {
      icon.classList.remove("color3-icon");
    }
    for (const iconBorder of iconsBorder) {
      iconBorder.classList.remove("color3-icon-border");
    }
  }
}

// eventos para desplegar formularios
diseña.addEventListener("click", handClickCollapsed);
rellena.addEventListener("click", handClickCollapsed);
comparte.addEventListener("click", handClickCollapsed);
cardButton.addEventListener("click", handleCreateCard);

// cardButton.addEventListener("click", unabling);
