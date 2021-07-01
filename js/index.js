const results = document.getElementById("results");
//:crée const results

let teddies;
//: déclare variable teddies

const fetchTeddies = async () => {
  teddies = await fetch("http://localhost:3000/api/teddies").then((res) =>
    res.json()
  );
};
//: ramène réponse de fetch en json

const showTeddies = async () => {
  await fetchTeddies();
  

  results.innerHTML = teddies
    .map(
      (teddy) =>
        `

          <div class="card" style="width: 25rem;">
            <img class="card-img-top" src="${teddy.imageUrl}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${teddy.name}</h5>
              <p class="card-text">${teddy.description}</p>
              <p class="card-text">Prix : ${teddy.price/100} euros</p>
              <a href="produit.html?id=${teddy._id}" class="btn btn-outline-dark">Voir</a>

            </div>
          </div>

        `
    )
    .join("");
};


//: crée le modèle html à insérer

showTeddies();

//: montre var teddies

//: aide:https://www.youtube.com/watch?v=ZCrh59Bvbts&t=913s
