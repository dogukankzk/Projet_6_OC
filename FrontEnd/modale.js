// Variables globales
const modifier = document.querySelector(".section_projet .modifier");
const ContainerModale = document.querySelector(".container_modale");
const xMark = document.querySelector(".container_modale .fa-xmark");
const galerie_modale = document.querySelector(".galerie_modale");

// affichage de la modale lors du clic sur modifier
modifier.addEventListener("click", () => {
    console.log("modifier");
    ContainerModale.style.display = "flex";
});

// quitter la modale lors du clic sur la croix 
xMark.addEventListener("click", () => {
    console.log("quitter");
    ContainerModale.style.display = "none";
});

// quitter la modale lors du clic en dehors de la modale
ContainerModale.addEventListener("click", (e) => {
    console.log(e.target.className);
    if (e.target.className === "container_modale") {
        ContainerModale.style.display = "none";
    }
});

// affichage des travaux dans la modale
async function DisplayGalerieModale() {
    galerie_modale.innerHTML = "";
    const galerie = await GetWorks();
    galerie.forEach(projet => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const span = document.createElement("span");
        const trash = document.createElement("i");
        trash.classList.add("fa-regular", "fa-trash-can");

        trash.id = projet.id;
        // ajouter un event listener sur trash
        trash.addEventListener("click", () => {
            console.log("poubelle");
            // appeler la fonction DeleteWorks avec l'ID du projet
            DeleteWorks(trash.id); // Passer l'ID du projet
        });

        img.src = projet.imageUrl;
        span.appendChild(trash);
        figure.appendChild(span);
        figure.appendChild(img);
        galerie_modale.appendChild(figure);
    });
}



function DeleteWorks(idProjet) {
    console.log("Suppression du projet avec l'ID:", idProjet);
    let token = localStorage.getItem("token");
    console.log("Token d'authentification:", token); // Ajout du console.log ici
    fetch(`http://localhost:5678/api/works/${idProjet}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Échec de la suppression");
        }

        if (response.status === 204) {
            console.log("Projet supprimé avec succès");
            // Supprimer l'élément de la galerie modale
            const elementASupprimer = document.getElementById(idProjet);
            if (elementASupprimer) {
                elementASupprimer.parentNode.removeChild(elementASupprimer);
            }
        }
    })
    .catch((error) => console.error("Erreur de suppression:", error));
}

// affichage de la modale de l'ajout des projets lors du click
const btnModale = document.querySelector(".modale button")
const ModaleAjoutProjet = document.querySelector(".add_projet_modale")
const ModaleProjet = document.querySelector(".modale")
const arrowLeft = document.querySelector(".fa-arrow-left")
const MarkAdd = document.querySelector(".add_projet_modale .fa-xmark")

function DisplayAddModale(){
    btnModale.addEventListener("click",()=>{
        ModaleAjoutProjet.style.display ="flex"
        ModaleProjet.style.display="none"
    })
    arrowLeft.addEventListener("click",()=>{
        ModaleAjoutProjet.style.display ="none"
        ModaleProjet.style.display=""
    })
    MarkAdd.addEventListener("click",()=>{
        ContainerModale.style.display ="none"
    })
}

DisplayAddModale()