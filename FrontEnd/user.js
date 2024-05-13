//  Une fois connecté 

function isConnected() {
    const loginLink = document.querySelector(".login_button");
    const modifierLink = document.querySelector(".modifier");
    const filters = document.querySelectorAll(".filter-container");

    // Vérifiez si l'utilisateur est connecté au chargement de la page
    if (sessionStorage.getItem("token") !== null) {
        // Si l'utilisateur est connecté, changez le texte du lien de connexion en "logout"
        loginLink.textContent = "logout";
        // Ajoutez un gestionnaire d'événements au lien de connexion pour gérer la déconnexion
        loginLink.addEventListener("click", disconnected);

        // Modifier le texte du lien "modifier" avec l'icône
        modifierLink.innerHTML = " <i class='fa-solid fa-pen-to-square'></i> Modifier";

        // Masquer les éléments de filtre
        filters.forEach(filter => {
            filter.style.display = "none";
        });
    }
}

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

function disconnected() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    window.location.href = "login.html"; // Redirigez l'utilisateur vers la page de connexion après la déconnexion
}


