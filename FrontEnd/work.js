
// Récupérer les travaux de l'architecte
async function GetWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    return works;
}

// Récupérer les catégories
async function GetCategories() {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();
    return categories;
}

// Fonction pour afficher les travaux dans la galerie
function DisplayWorks(works) {
    const parentElement = document.querySelector('section#portfolio .gallery');
    parentElement.innerHTML = ""; // Effacer le contenu existant
    works.forEach(work => {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.src = work.imageUrl;
        image.alt = work.title;
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;
        figure.appendChild(image);
        figure.appendChild(figcaption);
        parentElement.appendChild(figure);
    });
}

// Afficher les filtres
function DisplayCategoriesFilters(allCategories, allWorks) {
    const filterContainer = document.querySelector('.filter-container');
    const allButton = CreateFilterButton('TOUS', 'all');
    filterContainer.appendChild(allButton);
    
    allCategories.forEach(category => {
        const button = CreateFilterButton(category.name.toUpperCase(), category.id);
        filterContainer.appendChild(button);
    });

    // Ajouter le focus au bouton "TOUS" automatiquement
    allButton.focus();

    // Après avoir créé les boutons de filtre, appelez la fonction FilterCategory()
    FilterCategory(allWorks);

    // Afficher tous les travaux au chargement de la page
    DisplayWorks(allWorks);
}

// Créer un bouton de filtre
function CreateFilterButton(text, categoryId) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add('filter-btn');
    button.dataset.categoryId = categoryId;
    return button;
}

// Filtrer les travaux par catégories
function FilterCategory(allWorks) {
    const buttons = document.querySelectorAll(".filter-container .filter-btn");
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            // Supprimer le focus des autres boutons
            buttons.forEach(btn => btn.blur());

            // Ajouter le focus au bouton cliqué
            e.target.focus();

            const btnId = e.target.dataset.categoryId;
            const filteredWorks = btnId === "all" ? allWorks : allWorks.filter(work => work.categoryId === parseInt(btnId));
            DisplayWorks(filteredWorks);
        });
    });
}

