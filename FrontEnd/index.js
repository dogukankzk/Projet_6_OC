// Appeler la fonction principale une fois que le contenu de la page est chargé

document.addEventListener("DOMContentLoaded", async(event) => {

    let allWorks = [];
    let allCategories = [];
    // Récupérer les travaux et les catégories une seule fois
    allWorks = await GetWorks();
    allCategories = await GetCategories();
    // Afficher les travaux et les filtres
    DisplayWorks(allWorks);
    DisplayGalerieModale()
   // DisplayWorksModal()
    DisplayCategoriesFilters(allCategories, allWorks);
    isConnected();
    DisplayAddModale()
    PrevisualisationImage()
    DisplayCategoriesModale()
    AjoutProjet();

}
);




