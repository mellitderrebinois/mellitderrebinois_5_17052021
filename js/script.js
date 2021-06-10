const results = document.getElementById("results");


let teddies;

const fetchTeddies = async () => {
  teddies = await fetch("http://localhost:3000/api/teddies").then((res) =>
    res.json()
  );
};

const showTeddies = async () => {
  await fetchTeddies();

  results.innerHTML = (
    teddies
    .filter(teddy => teddy.name)
    .map(teddy => (
`


<div class="card" style="width: 25rem;">
  <img class="card-img-top" src="${teddy.imageUrl}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${teddy.name}</h5>
    <p class="card-text">${teddy.description}</p>
    <p class="card-text">Prix : ${teddy.price}</p>
  </div>
</div>





`


    )).join("")
    
    
    
    
    
    );




};

showTeddies();
