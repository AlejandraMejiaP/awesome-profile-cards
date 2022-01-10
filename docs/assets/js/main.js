"use strict";const diseña=document.querySelector(".form-title-js"),rellena=document.querySelector(".form-title2-js"),comparte=document.querySelector(".form-title3-js"),fieldsetForm=document.querySelectorAll(".form-js"),allInputs=document.querySelectorAll(".js-input"),resetButton=document.querySelector(".preview__button"),paletteDesing=document.querySelectorAll(".list__palette"),shareButton=document.querySelector(".share-button");let checkBox="",checkPalette=document.querySelectorAll("#palette");const namePreview=document.querySelector(".name"),jobPreview=document.querySelector(".profession"),linkedinPreview=document.querySelector(".linkedin-js"),githubPreview=document.querySelector(".github-js"),emailLink=document.querySelector(".js-email"),iconPhone=document.querySelector(".linkPhone"),icons=document.querySelectorAll(".js-icon"),iconsBorder=document.querySelectorAll(".js-iconBorder"),divLine=document.querySelector(".js__line-palette"),cardButton=document.querySelector("#button-card"),shareDiv=document.querySelector("#share-card");function resetForm(e){e.preventDefault();for(const e of allInputs)e.value="";profileImage.style.backgroundImage="",profilePreview.style.backgroundImage="",checkPalette[0].checked=!0,resetObject(),renderPreviewCard(),changeColorPalette(e),saveLocalStorage(),shareButton.classList.add("unabled"),shareButton.setAttribute("disabled",!0)}function resetObject(){data={name:"",job:"",email:"",phone:"",linkedin:"",github:"",photo:"",palette:1}}function collapseFieldset(e){e.currentTarget===rellena?(e.currentTarget.parentNode.classList.toggle("collapsed"),diseña.parentNode.classList.add("collapsed"),comparte.parentNode.classList.add("collapsed")):e.currentTarget===diseña?(e.currentTarget.parentNode.classList.toggle("collapsed"),rellena.parentNode.classList.add("collapsed"),comparte.parentNode.classList.add("collapsed")):e.currentTarget===comparte&&(abilitateButton(),e.currentTarget.parentNode.classList.toggle("collapsed"),rellena.parentNode.classList.add("collapsed"),diseña.parentNode.classList.add("collapsed"))}function rotateArrows(){for(const e of fieldsetForm)e.classList.contains("collapsed")?e.querySelector(".js-arrow").classList.add("js-arrow-down"):e.querySelector(".js-arrow").classList.remove("js-arrow-down")}resetButton.addEventListener("click",resetForm);let data={name:"",job:"",email:"",phone:"",linkedin:"",github:"",photo:"",palette:1};function renderPreviewCard(){""===data.name?namePreview.innerHTML="Nombre y apellidos":namePreview.innerHTML=data.name,""===data.job?jobPreview.innerHTML="Profesión":jobPreview.innerHTML=data.job,""===data.email?emailLink.href="":emailLink.href="mailto:"+data.email,""===data.linkedin?linkedinPreview.href="":linkedinPreview.href=data.linkedin,""===data.github?githubPreview.href="www.github.com/":githubPreview.href="www.github.com/"+data.github,""===data.phone?iconPhone.href="":iconPhone.href="tel:+34"+data.phone}function getData(e){const t=e.currentTarget,a=e.currentTarget.value,r=e.currentTarget.id,o=t.parentElement;"palette"===r?o.classList.contains("second__color")?data.palette=2:o.classList.contains("first__color")?data.palette=1:data.palette=3:data[r]=a,renderPreviewCard(),saveLocalStorage()}for(const e of allInputs)e.addEventListener("change",getData);function handleCreateCard(e){e.preventDefault(),fetch("https://awesome-profile-cards.herokuapp.com/card",{method:"POST",body:JSON.stringify(data),headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>{e.success&&(shareDiv.innerHTML=`<h4>La tarjeta ha sido creada:</h4>\n        <a href="${e.cardURL}" class="card-link" target="_blank">${e.cardURL}</a>\n        <a class="twitter" href="https://twitter.com/intent/tweet?text=Mi%20tarjeta%20de%20contacto%20creada%20por%20Las%20Picateclas%20&url=${e.cardURL}&hashtags=programación,js,adalab" target="_blank"><i class="fab fa-twitter"></i>\n          Compartir en twitter\n        </a>`,cardButton.classList.add("unabled"),shareDiv.classList.remove("hidden"))})}function unabling(){cardButton.classList.add("unabled"),shareDiv.classList.remove("hidden")}function addListenersPalette(){for(const e of paletteDesing)e.addEventListener("click",changeColorPalette)}function changeColorPalette(e){if(checkBox=e.currentTarget.children[0],!1===checkBox.checked&&(checkBox.checked=!0),e.currentTarget.classList.contains("second__color")){namePreview.classList.add("color2-dark"),divLine.classList.add("background-color2"),jobPreview.classList.add("color2-light"),data.palette=2;for(const e of icons)e.classList.add("color2-icon");for(const e of iconsBorder)e.classList.add("color2-icon-border")}else{namePreview.classList.remove("color2-dark"),divLine.classList.remove("background-color2"),jobPreview.classList.remove("color2-light");for(const e of icons)e.classList.remove("color2-icon");for(const e of iconsBorder)e.classList.remove("color2-icon-border")}if(e.currentTarget.classList.contains("third__color")){namePreview.classList.add("color3-dark"),divLine.classList.add("background-color3"),jobPreview.classList.add("color3"),data.palette=3;for(const e of icons)e.classList.add("color3-icon");for(const e of iconsBorder)e.classList.add("color3-icon-border")}else{namePreview.classList.remove("color3-dark"),divLine.classList.remove("background-color3"),jobPreview.classList.remove("color3");for(const e of icons)e.classList.remove("color3-icon");for(const e of iconsBorder)e.classList.remove("color3-icon-border")}}function handleFieldsetClick(e){collapseFieldset(e),rotateArrows()}function saveLocalStorage(){const e=JSON.stringify(data);localStorage.setItem("user data",e)}function getLocalElements(){let e=localStorage.getItem("user data");if(null!==e){e=JSON.parse(e),data=e,renderPreviewCard(),renderInputs()}}function renderInputs(){if(null!==data)for(const e in data){const t=document.querySelector("#"+e);if("palette"===e||"photo"===e){if(2===data.palette){namePreview.classList.add("color2-dark"),divLine.classList.add("background-color2"),jobPreview.classList.add("color2-light");for(const e of icons)e.classList.add("color2-icon");for(const e of iconsBorder)e.classList.add("color2-icon-border")}else if(3===data.palette){namePreview.classList.add("color3-dark"),divLine.classList.add("background-color3"),jobPreview.classList.add("color3");for(const e of icons)e.classList.add("color3-icon");for(const e of iconsBorder)e.classList.add("color3-icon-border")}}else t.value=data[e]}}function abilitateButton(){let e=!0;for(const t of allInputs)t.hasAttribute("required")&&""===t.value&&(e=!1);!0===e?(shareButton.classList.remove("unabled"),shareButton.removeAttribute("disabled")):(shareButton.classList.add("unabled"),shareButton.setAttribute("disabled",!0))}addListenersPalette(),getLocalElements(),diseña.addEventListener("click",handleFieldsetClick),rellena.addEventListener("click",handleFieldsetClick),comparte.addEventListener("click",handleFieldsetClick),cardButton.addEventListener("click",handleCreateCard),cardButton.addEventListener("click",unabling);const fr=new FileReader,fileField=document.querySelector(".js__profile-upload-btn"),profileImage=document.querySelector(".js__profile-image"),profilePreview=document.querySelector(".js__profile-preview");function getImage(e){const t=e.currentTarget.files[0];fr.addEventListener("load",writeImage),fr.readAsDataURL(t)}function writeImage(){profileImage.style.backgroundImage=`url(${fr.result})`,profilePreview.style.backgroundImage=`url(${fr.result})`,data.photo=fr.result}function fakeFileClick(){fileField.click()}fileField.addEventListener("change",getImage);