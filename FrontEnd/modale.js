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

// Affichage des travaux dans la modale
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
        // Ajouter un event listener sur trash
        trash.addEventListener("click", async () => {
            console.log("poubelle");
            // Appeler la fonction DeleteWorks avec l'ID du projet
            await DeleteWorks(projet.id); // Passer l'ID du projet
            await DisplayGalerieModale(); // Réafficher la galerie modale après suppression
        });

        img.src = projet.imageUrl;
        span.appendChild(trash);
        figure.appendChild(span);
        figure.appendChild(img);
        galerie_modale.appendChild(figure);
    });
}

// Suppression d'une image dans la modale
async function DeleteWorks(idProjet) {
    const token = localStorage.getItem("token");
    console.log("Suppression du projet avec l'ID:", idProjet);
    
    // Récupérer le token JWT depuis localStorage
    
    // Vérifier si le token JWT est présent
    if (!token) {
        console.error("Token JWT non trouvé dans localStorage.");
        return;
    }
    
    // Effectuer la requête DELETE avec le token JWT inclus dans l'en-tête
    try {
        const response = await fetch(`http://localhost:5678/api/works/${idProjet}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        if (!response.ok) {
            throw new Error("Échec de la suppression. Statut de la réponse: " + response.status);
        }

        if (response.status === 204) {
            console.log("Projet supprimé avec succès");
            // Supprimer l'élément du DOM correspondant au projet supprimé
            const elementASupprimer = document.getElementById(idProjet);
            if (elementASupprimer) {
                elementASupprimer.parentNode.removeChild(elementASupprimer);
            }
        }
    } catch (error) {
        console.error("Erreur de suppression:", error);
    }
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

// faire la prévisualisation de l'image
const previewImg = document.querySelector(".container_file img")
const inputFile = document.querySelector(".container_file input")
const labelFile = document.querySelector(".container_file label")
const iconFile = document.querySelector(".container_file .fa-image")
const pFile = document.querySelector(".container_file p")

function PrevisualisationImage(){
    inputFile.addEventListener("change", ()=>{
        const file = inputFile.files[0]
        console.log(file)
        if (file){
            const reader = new FileReader()
            reader.onload = function (e){
                previewImg.src = e.target.result
                previewImg.style.display = "flex"
                labelFile.style.display = "none"
                iconFile.style.display = "none"
                pFile.style.display = "none"
            }
            reader.readAsDataURL(file)
        }
    })
}

// selection de la catégorie dans la modale 
async function DisplayCategoriesModale(){
    const select = document.querySelector(".add_projet_modale select")
    const categorys = await GetCategories()
    categorys.forEach(category =>{
        const option = document.createElement("option")
        option.value = category.id
        option.textContent = category.name
        select.appendChild(option)
    })
}

// méthode POST
const form = document.querySelector(".add_projet_modale form");
const title = document.querySelector(".add_projet_modale #title");
const category = document.querySelector(".add_projet_modale #category");
const add_input = document.querySelector(".add_projet_modale input[type='file']");

async function AjoutProjet() {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Récupérer le token JWT depuis localStorage
        const token = localStorage.getItem("token");

        // Créer un objet FormData pour envoyer les données
        const formData = new FormData();
        formData.append("title", title.value);
        formData.append("category", category.value);
        formData.append("image", add_input.files[0]); // inputFile est l'élément <input type="file">

        // Effectuer la requête POST avec le token JWT inclus dans l'en-tête
        try {
            const response = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'envoi des données. Statut de la réponse: " + response.status);
            }

            const data = await response.json();
            console.log("Projet ajouté avec succès :", data);
            await DisplayGalerieModale(); // Réafficher la galerie modale après ajout
            DisplayWorks();
        } catch (error) {
            console.error("Erreur lors de l'ajout du projet :", error);
        }
    });
}

// Appeler les fonctions initiales

