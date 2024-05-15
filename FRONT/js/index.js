// Ce tableau sert à stocker les personnages de l'API
let dataArray;
const token = localStorage.getItem("token");
const searchBar = document.getElementById("searchBar");

document.addEventListener("DOMContentLoaded", () => {
  if (token) {
    const loginButton = document.getElementById("login");
    loginButton.textContent = "Mon compte";
  }
});

// ----- Ceci est moins bon pour les performances. ----- //
// const filters = document.querySelectorAll('.filterBtn');

// filters.forEach(filter => {
//   filter.addEventListener('click', () => {

//   })
// })

// Event Delegation
document.addEventListener("click", (e) => {
  const target = e.target;

  if (target.matches(".filterBtn")) {
    const filter = target.getAttribute("data-house");
    const isActive = document.querySelector(".filterBtn.active");

    if (isActive && isActive !== target) {
      isActive.classList.remove("active");
      target.classList.add("active");

      if (filter === "all") {
        document.querySelectorAll(".cardElement.hidden").forEach((card) => {
          card.classList.remove("hidden");
        });

        return;
      }

      // On cache toutes les cartes.
      document.querySelectorAll(".cardElement").forEach((card) => {
        card.classList.add("hidden");
      });

      // On montre que les cartes filtrées
      document
        .querySelectorAll(`.cardElement[data-house="${filter}"]`)
        .forEach((cardFiltered) => {
          cardFiltered.classList.remove("hidden");
        });
    }
  }
});

searchBar.addEventListener("input", (e) => {
  // Ensuite, on récupère la valeur en minuscule de l'input
  const searchValue = e.target.value.toLowerCase().replace(/\s/g, ""); // remplace les espaces par rien
  const allcards = document.querySelectorAll(".cardElement");
  document.querySelector(".boxError").classList.remove("visible");

  if (searchValue) {
    // On cache toutes les cartes
    allcards.forEach((card) => card.classList.add("hidden"));

    const filteredArray = dataArray.filter((perso) =>
      perso.name.toLowerCase().includes(searchValue)
    );

    if (!filteredArray.length) {
      document.querySelector(".boxError").classList.add("visible");
      return;
    }

    filteredArray.forEach((element) => {
      document
        .querySelector(`.cardElement[data-name="${element.name}"]`)
        .classList.remove("hidden");
    });

    console.log(filteredArray);
  } else {
    allcards.forEach((card) => card.classList.remove("hidden"));
  }
});

async function fetchCharacters() {
  const response = await fetch("https://hp-api.lainocs.fr/characters/");
  dataArray = await response.json();
  return dataArray;
}

async function displayCharacters() {
  const data = await fetchCharacters();
  data.forEach((character) => {
    document.querySelector("#characters").innerHTML += `
      <a href="single-hp.html?slug=${
        character.slug
      }" data-house="${character.house.toLowerCase()}" data-name="${
      character.name
    }" class="cardElement">
          <div class="character">
              <h2>${character.name}</h2>
              <img src="${character.image}" alt "${character.name}"/>
          </div>
      </a> 
      `;
  });
}

function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

displayCharacters();
