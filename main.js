const inputForm = document.querySelector(".form-input");

const firstname = document.querySelector(".name");
const surname = document.querySelector(".surname");
const age = document.querySelector(".age");
const userEmail = document.querySelector(".email");
const userCap = document.querySelector(".cap");
const userMarried = document.querySelector(".married");
const userActive = document.querySelector(".active");

const errorName = document.querySelector(".error-name");
const errorAge = document.querySelector(".error-age");
const errorEmail = document.querySelector(".error-email");
const errorCap = document.querySelector(".error-cap");
const errorSurname = document.querySelector(".error-surname");

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  localStorage.clear();
  localStorage.setItem("user", JSON.stringify(createUser()));

  clearErrors();
  prova();

  putUser();
});

const prova = () => {
  validationName();
  validationEmail();
  validationCap();
  validationLastName();
  validationAge();
};

const createUser = () => {
  let user = {
    nome: firstname.value,
    cognome: surname.value,
    eta: age.value,
    email: userEmail.value,
    cap: userCap.value,
    married: userMarried.checked,
    active: userActive.checked,
  };

  return user;
};

const putUser = async () => {
  const userObject = JSON.parse(localStorage.getItem("user"));
  try {
    const response = await fetch(`https://dummyjson.com/users/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userObject),
    });
    return await response.json();
  } catch (error) {
    console.log("Errore nella fetch" + error.message);
  }
};

const validationName = () => {
  if (firstname.value.trim() === "") {
    firstname.classList.add("is-invalid");
    errorName.innerText = "Campo richiesto";
    return false;
  } else {
    firstname.classList.add("is-valid");
    return true;
  }
};

const validationLastName = () => {
  if (surname.value.trim() === "") {
    surname.classList.add("is-invalid");
    errorSurname.innerText = "Campo richiesto";
    return false;
  } else {
    surname.classList.add("is-valid");
    return true;
  }
};

const validationEmail = () => {
  if (!userEmail.value.includes("@")) {
    userEmail.classList.add("is-invalid");
    errorEmail.innerText = "è richiesto un'indirizzo email";
    return false;
  } else {
    userEmail.classList.add("is-valid");
    return true;
  }
};

const validationAge = () => {
  if (age.value > 150) {
    age.classList.add("is-invalid");
    errorAge.innerText = "You are not a turtle";
    return false;
  } else {
    age.classList.add("is-valid");
    return true;
  }
};
const validationCap = () => {
  if (userCap.value > 99999) {
    userCap.classList.add("is-invalid");
    errorCap.innerText = "massimo 5 cifre";

    return false;
  } else if (userCap.value < 0) {
    userCap.classList.add("is-invalid");
    errorCap.innerText = "Non Puoi inserire numeri negativi";
    return false;
  } else {
    userCap.classList.add("is-valid");
    return true;
  }
};

const clearErrors = () => {
  errorName.innerHTML = "";
  errorSurname.innerHTML = "";
  errorAge.innerHTML = "";
  errorCap.innerHTML = "";
  errorEmail.innerHTML = "";

  firstname.classList.remove("is-invalid");
  surname.classList.remove("is-invalid");
  errorAge.classList.remove("is-invalid");
  errorCap.classList.remove("is-invalid");
  userEmail.classList.remove("is-invalid");
};
