const token = localStorage.getItem("token");
let allCards;
const boosterBtn = document.getElementById("boosterBtn");
const cardsBox = document.querySelector(".cardsBox");

// Event delegation
document.addEventListener("click", (e) => {
  // On récupère la target clické
  const target = e.target;

  // Si la targat match avec la classe .navTab
  if (target.matches(".navTab")) {
    // On vérifie si une tab est déjà active
    const isActive = document.querySelector(".navTab.active");

    // Si une tab est déjà active et qu'elle est différente de la target
    if (isActive && isActive !== target) {
      // On remove la classe active
      isActive.classList.remove("active");
      document.querySelector(".tabContent.active").classList.remove("active");

      target.classList.add("active");

      // On ajoute la classe active au container qui a la classe 'tabContent"
      // Et qui possède le même attribut data-tab que la target
      document
        .querySelector(`.tabContent[data-tab="${target.dataset.tab}"]`)
        .classList.add("active");
    }
  }

  if (target.matches(".closeBoosterWindow")) {
    document.querySelector(".boosterWindow").remove();
  }
});

boosterBtn.addEventListener("click", async () => {
  try {
    let cardsId = [];
    const cardsNumber = 5;
    // Je crée 5 id aléatoires que j'ajoute dans cardsId
    for (let i = 0; i < cardsNumber; i++) {
      cardsId.push(Math.floor(Math.random() * allCards.length));
    }

    // J'effectue la requête de l'ouverture du booster
    const response = await fetch("/booster/open", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cards: cardsId,
      }),
    });

    const data = await response.json();

    // Si la réponse est good
    if (response.ok) {
      // Créer la window avec les 5 cartes en aléatoire.
      createBoosterWindow(cardsId);
      boosterBtn.setAttribute("disabled", "");
    } else {
      // Sinon on met une alerte
      alert(data.message);
    }
  } catch (error) {
    alert(error.message);
  }
});

const getMyProfile = async () => {
  try {
    const response = await fetch("/getMyProfile", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/login.html";
    } else if (response.status === 404) {
      localStorage.removeItem("token");
      window.location.href = "/login.html";
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    alert(error.message);
  }
};

const getAllCards = async () => {
  try {
    const response = await fetch("https://hp-api.lainocs.fr/characters");

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Les cartes n'ont pas pu être récupérées.");
  }
};

const getUserCards = async () => {
  try {
    const response = await fetch("/user/cards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      alert("An error occured.");
    }
  } catch (error) {
    alert(error.message);
  }
};

function createBoosterWindow(cardsId) {
  const window = document.createElement("div");
  window.classList.add("boosterWindow");
  const windowTitle = document.createElement("h2");
  windowTitle.innerText = "Vos acquisitions du booster";
  const cardsList = document.createElement("div");
  cardsList.classList.add("boosterWindow__cardsList");

  // Pour chaque carte piochée dans le booster
  cardsId.forEach((card) => {
    // Creer la carte
    const cardEl = document.createElement("div");
    cardEl.classList.add("boosterWindow__cardsList__element");
    cardEl.innerHTML = `
        <span class="cardName">${allCards[card].name}</span>
        <div class="boxImg">
          <img src="${allCards[card].image}" alt="Image de ${allCards[card].name}">
        </div>
    `;

    // On ajoute l'élément Html cardEl dans la box
    cardsList.appendChild(cardEl);
  });

  for (let i = 0; i < cardsId.length; i++) {}

  const closeWindowBtn = document.createElement("button");
  closeWindowBtn.classList.add("closeBoosterWindow");
  closeWindowBtn.innerText = "Close";

  window.appendChild(windowTitle);
  window.appendChild(cardsList);
  window.appendChild(closeWindowBtn);

  document.querySelector("main").appendChild(window);
}

function updateProfil(data) {
  const emailData = document.getElementById("emailData");
  emailData.innerText = data.user.email;
  updateTimer(data.user.booster);
}

function updateTimer(nextBooster) {
  const timeLeft = nextBooster - Date.now();
  if (timeLeft <= 0) boosterBtn.removeAttribute("disabled");
}

// Paramètre "cards" qui est un tableau des données reçues de tes cartes sous la forme :
// [{cardId: 1, quantity: 3}, {cardId: 1, quantity: 3}, {cardId: 1, quantity: 3}]
function displayUserCards(cards) {
  let numberOfCards = 0;

  // Pour chaque carte dans cards
  cards.forEach((card) => {
    // On récupère la carte correspondant à celle qui possède le même id que card.cardId
    const cardData = allCards.find((el) => el.id === card.cardId);

    // On crée l'affichage de la carte en insérant ses données dedans.
    const cardEl = document.createElement("div");
    cardEl.classList.add("boosterWindow__cardsList__element");
    cardEl.innerHTML = `
        <span class="cardName">${cardData.name}</span>
        <div class="boxImg">
          <img src="${cardData.image}" alt="Image de ${cardData.name}">
        </div>
        <span class="cardQuantity">${card.quantity}</span>
        `;

    numberOfCards += card.quantity;
    cardsBox.appendChild(cardEl);
  });
}

// IIFE :  Immediately Invoked Function Expression
(async () => {
  try {
    const userData = await getMyProfile();
    if (userData) updateProfil(userData);
    allCards = await getAllCards();
    const usersCards = await getUserCards();
    displayUserCards(usersCards);
  } catch (error) {
    alert(error.message);
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (token) {
    const loginButton = document.getElementById("login");
    loginButton.textContent = "Mon compte";
  }
});
