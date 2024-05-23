document.addEventListener("DOMContentLoaded", async (event) => {
    let allWorks = [];
    let allCategories = [];

    // Récupérer les travaux et les catégories une seule fois
    allWorks = await GetWorks();
    allCategories = await GetCategories();

    // Afficher les travaux et les filtres
    DisplayWorks(allWorks);
    DisplayGalerieModale();
    isConnected();
    DisplayCategoriesFilters(allCategories, allWorks);
    DisplayAddModale();
    PrevisualisationImage();
    DisplayCategoriesModale();
    AjoutProjet();
});
