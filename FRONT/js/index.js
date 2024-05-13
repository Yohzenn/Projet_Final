function fetchCharacters() {
  return fetch("https://hp-api.lainocs.fr/characters/").then((response) =>
    response.json()
  );
}

async function displayCharacters() {
  const data = await fetchCharacters();
  data.forEach((character) => {
    document.querySelector("#characters").innerHTML += `
                <a href="single-hp.html?slug=${character.slug}">
                    <div class="character">
                        <h2>${character.name}</h2>
                        <img src="${character.image}" alt "${character.name}"/>
                    </div>
                </a> 
                `;
  });
}
displayCharacters();
