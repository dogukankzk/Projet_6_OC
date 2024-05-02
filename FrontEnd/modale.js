// affichage de la modale lorsque l'on clique sur modifier
const modifier = document.querySelector(".section_projet .modifier")
const ContainerModale = document.querySelector(".container_modale")
const xMark = document.querySelector(".container_modale .fa-xmark")
const galerie_modale = document.querySelector(".galerie_modale")

// affichage de la modale lors du clique sur modifier
modifier.addEventListener("click", ()=> {
    console.log("modifier")
    ContainerModale.style.display = "flex"
})

// quitter la modale lors du clique sur la croix 
xMark.addEventListener("click", ()=> {
    console.log("quitter")
    ContainerModale.style.display = "none"
})

// quitter la modale lors du clique en dehors de la modale
ContainerModale.addEventListener("click", (e)=> {
    console.log(e.target.className)
    if(e.target.className == "container_modale"){
        ContainerModale.style.display = "none"
    }
})

// affichage des travaux dans la modale

async function DisplayGalerieModale(){
    galerie_modale.innerHTML=""
    const galerie = await GetWorks()
   galerie.forEach(projet => {
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const span = document.createElement("span")
    const trash = document.createElement("i")
    trash.classList.add("fa-regular" , "fa-trash-can")
    trash.id = projet.id
    img.src = projet.imageUrl
    span.appendChild(trash)
    figure.appendChild(span)
    figure.appendChild(img)
    galerie_modale.appendChild(figure)
   });
   DelateWorks()
}

DisplayGalerieModale()


// supression d'une image dans la modale

function DelateWorks(){
    const TrashAll = document.querySelectorAll(".fa-trash-can")
    TrashAll.forEach(trash => {
        trash.addEventListener("click", (e)=>{
         const id = trash.id
         const init ={
            methode : "DELETE",
            headers:{"content-Type" : "application/json"}
         }
         fetch("http://localhost:5678/api/works/1" +id, init)
         .then((response)=>{
            if(!response.ok){
                console.log("le delete n'a pas fonctionné")
            }
            return response.json()
         })
         .then((data) =>{
            console.log("le delete a fonctionné voici la data",data)
            DisplayGalerieModale()
            DisplayWorks()
         })
        })
    });
}