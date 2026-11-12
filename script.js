const userList = document.querySelector("#userList");
const searchInput = document.querySelector("#searchInput");
let users = [];

function displayUsers(userArray) {
  userList.innerHTML = "";

  userArray.forEach(function (user) {
    const userCard = document.createElement("div");

    userCard.innerHTML = `
      <h2>${user.name}</h2>
      <p>${user.email}</p>
      <p>${user.address.city}</p>
    `;

    userList.appendChild(userCard);
  });
}

async function getUsers() {
  userList.textContent = "Loading users...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    users = await response.json();

    displayUsers(users);
  } catch (error) {
    userList.textContent = "Unable to load users. Please try again.";
    console.log(error.message);
  }
}

getUsers();
