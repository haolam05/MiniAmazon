export const disabledSubmitButton = () => {
  document.querySelector("button[type=submit]").setAttribute("disabled", "");
}

export const enabledSubmitButton = () => {
  document.querySelector("button[type=submit]").removeAttribute("disabled");
}

export const turnOnRedBoxShadow = e => {
  e.target.classList.add("box-shadow-red");
  e.target.classList.remove("box-shadow-green");
}

export const turnOnGreenBoxShadow = e => {
  e.target.classList.add("box-shadow-green");
  e.target.classList.remove("box-shadow-red");
}

export const turnOnOffAllBoxShadow = e => {
  e.target.classList.remove("box-shadow-red");
  e.target.classList.remove("box-shadow-green");
}
