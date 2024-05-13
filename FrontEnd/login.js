// Variables globales pour le login
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const form = document.querySelector("form");
const baseApiUrl = "http://localhost:5678/api/";


// Événement de soumission du formulaire de connexion
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await login();
});


