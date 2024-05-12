function myFuction() {
  let x = document.getElementById("password");
  let y = document.getElementById("hide1");
  let z = document.getElementById("hide2");

  if (x.type === "password") {
    x.type = "text";
    y.style.display = "block";
    z.style.display = "none";
  } else {
    x.type = "password";
    y.style.display = "none";
    z.style.display = "block";
  }
}

document.querySelector(".eye").addEventListener("click", myFuction);

const formulaire = document.getElementById("formulaire");

formulaire.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      window.location.href = "profil.html";
    }
  } catch (error) {
    alert(error.message);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (token) {
    const loginButton = document.getElementById("login");
    loginButton.textContent = "Mon compte";
  }
});

// const getMyProfile = async () => {
//   const token = localStorage.getItem("token");

//   const response = await fetch("http://localhost:3000/getMyProfile", {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });

//   const data = await response.json();

//   console.log(data);
// };
