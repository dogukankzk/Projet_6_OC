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

function disconnected() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    window.location.href = "login.html"; // Redirigez l'utilisateur vers la page de connexion après la déconnexion
}

document.addEventListener("DOMContentLoaded", isConnected);
