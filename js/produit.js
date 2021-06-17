const urlUnique = window.location.search;
console.log(urlUnique);

const urlSearchParams = new URLSearchParams(urlUnique);
const id = urlSearchParams.get("id");

console.log(id);

const article = getArticle();

async function getArticle() {
  return fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (article) {
      return article;
    })
    .catch(function (error) {
      alert(error);
    });
}

console.log(article);

const results = document.getElementById("results");

results.innerHTML = `

        
<div class="container px-4 px-lg-5 my-5">
<div class="row gx-4 gx-lg-5 align-items-center">
  <div class="col-md-6">
    <img class="card-img-top mb-5 mb-md-0" src="${article.imageUrl}" />
  </div>
  <div class="col-md-6">
    <h1 class="display-5 fw-bolder">${article.name}</h1>
    <div class="fs-5 mb-5">
      <span>${article.description}</span>
    </div>
    <p class="lead">
    ${article.price}
    </p>
    <div class="d-flex">
      
      <button class="btn btn-outline-dark flex-shrink-0" type="button">
        <i class="bi-cart-fill me-1"></i>
        Ajouter au panier
      </button>
    </div>
    </br>
    <div class="dropdown">
      <button class="btn btn-outline-dark dropdown-toggle" type="button" data-toggle="dropdown">
        Personnaliser la couleur
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#">Couleur1</a>
        <a class="dropdown-item" href="#">Couleur2</a>
        <a class="dropdown-item" href="#">Couleur3</a>
      </div>
    </div>
  </div>
</div>
</div>


`;
console.log(article.description);