function fetchCharacter() {
  let url = window.location.search;
  let slug = new URLSearchParams(url).get("slug");
  return fetch("https://hp-api.lainocs.fr/characters/" + slug).then(
    (response) => response.json()
  );
}

async function displayCharacter() {
  const data = await fetchCharacter();
  document.querySelector("#character").innerHTML = `  
        <div class="character-container">
          <div class="infos">
        <h1>Nom: ${data.name}</h1>
        <p>Maison: ${data.house}</p>
        <p>Acteur: ${data.actor}</p>
        </div>
        <img src="${data.image}" alt "${data.name}"/>

        <a href="index.html">Back</a>
        </div>

        `;
  try {
    await UpdateLastHouse(1, data.house);
    // await UpdateLastHouse(await getMyId(), data.house);
  } catch {
    console.log("error");
  }
}

async function getMyId() {
  const token = localStorage.getItem("token");

  const response = await fetch("/getMyProfile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status == 200) {
    const data = await response.json();
    return data.id;
  }
}

function UpdateLastHouse(id, house) {
  let baseUrl = "/users/" + id;
  console.log(id);
  console.log(house);
  return fetch(baseUrl, {
    method: "PUT",
    body: JSON.stringify({
      house: house,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

displayCharacter();
