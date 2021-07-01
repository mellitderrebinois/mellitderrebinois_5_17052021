const urlUnique = window.location.search;
console.log(urlUnique);

const urlSearchParams = new URLSearchParams(urlUnique);
const id = urlSearchParams.get("id");

getArticle();

function getArticle() {
  fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (article) {
      displayArticle(article);
    })
    .catch(function (error) {
      alert(error);
    });
}

function displayArticle(article) {
  const results = document.getElementById("results");

  results.innerHTML = `

        
  <div class="container">
  <div class="row align-items-center">
      <div class="col-md-6">
          <img class="card-img-top mb-5 mb-md-0" src="${article.imageUrl}" />
      </div>

    <div class="col-md-6">

      <h1 class="display-5 fw-bolder">${article.name}</h1>

        <div class="fs- mb-4">
          <span>${article.description}</span>
        </div>

      <p class="lead">
        ${article.price / 100} euros
      </p>

      <div class="d-flex">

        <button class="panier btn btn-outline-dark " type="button">
          Ajouter au panier
        </button>

      </div>
    
      </br>
      
      <label class="fw-bolder" for="personnaliser">
        Choisir une couleur
      </label>
      
    
      <select class="choix form-select mt-3" name="colors" id="personnaliser">
      </select>
      
    </div>

  </div>

  </div>
  `;

  let choice = document.querySelector(".choix");

  //: boucle forEach

  article.colors.forEach(function (colors) {
    let option = document.createElement("option");
    option.value = colors;
    option.textContent = colors;
    choice.appendChild(option);
  });

  //: ajout du produit au panier

  let cartBtn = document.querySelector(".panier");

  cartBtn
    .addEventListener('click', () => {
      let select = document.querySelector(".choix");
      article.selectColors = select.options[select.selectedIndex].value;
      addItemcart(article);
    })
  
    // Message d'erreur
    .catch((e) => {
      errorMessage();
      console.log(e);
    });

  function addItemcart(item) {
    // variable tableaux
    let cartItem = [];

    // stockage dans un objet
    let saveItemCart = {
      _id: item._id,
      imageUrl: item.imageUrl,
      name: item.name,
      price: item.price,
      quantity: 1,
      selectColors: item.selectColors,
    };
    let otherItem = true;
    // Si sessionStorage est vide elle crée un nouveau tableau panierproduit et l'enregistre dans le sessionStorage
    if (sessionStorage.getItem("anyItem") === null) {
      cartItem.push(saveItemCart);
      sessionStorage.setItem("anyItem", JSON.stringify(cartItem));
    }
    // Sinon elle récupère le tableau du sessionStorage, ajoute le nouveau produit, et enregistre le nouveau tableau.
    else {
      cartItem = JSON.parse(sessionStorage.getItem("anyItem"));

      cartItem.forEach((prod) => {
        if (item._id === prod._id && item.selectColors === prod.selectColors) {
          prod.quantity++;
          otherItem = false;
        }
      });
      if (otherItem) cartItem.push(saveItemCart);
      sessionStorage.setItem("anyItem", JSON.stringify(cartItem));
    }
  }
}
