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
});

const getMyProfile = async () => {
  try {
    const token = localStorage.getItem("token");

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

function updateProfil(data) {
  const emailData = document.getElementById("emailData");
  emailData.innerText = data.user.email;
}

// IIFE :  Immediately Invoked Function Expression
(async () => {
  try {
    const userData = await getMyProfile();
    console.log(userData);
    if (userData) updateProfil(userData);
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
