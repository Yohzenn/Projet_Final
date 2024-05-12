const getMyProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/getMyProfile", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      return { userData };
    } else {
      alert("An error occured.");
    }
  } catch (error) {
    alert(error.message);
  }
};

function updateProfil(data) {
  const nameData = document.getElementById("nom");
  nameData.innerText = data.user.email;
}

// IIFE :  Immediately Invoked Function Expression
(async () => {
  const { userData } = await getMyProfile();
  updateProfil(userData);
})();
