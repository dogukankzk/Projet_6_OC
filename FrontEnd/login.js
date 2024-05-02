// Variables globales pour le login
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const form = document.querySelector("form");
const baseApiUrl = "http://localhost:5678/api/";

// Fonction pour gérer la connexion de l'utilisateur
async function loginUser(email, password) {
    try {
        const response = await fetch(`${baseApiUrl}users/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            throw new Error("Email ou mot de passe incorrect");
        }

        return await response.json();
    } catch (error) {
        console.log("La récupération est impossible : ", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}

// Fonction de connexion
async function login() {
    try {
        const user = await loginUser(emailInput.value, passwordInput.value);
        sessionStorage.setItem("token", user.token);
        sessionStorage.setItem("userId", user.userId);
        window.location.replace("index.html");
    } catch (error) {
        messageErreur.textContent = "Email ou mot de passe incorrect";
    }
}

// Événement de soumission du formulaire de connexion
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await login();
});
