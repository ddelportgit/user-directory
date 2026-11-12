const userList = document.querySelector("#userList");
const searchInput = document.querySelector("#searchInput");
const userCount = document.querySelector("#userCount");

let users = [];

function displayUsers(userArray) {
  userList.innerHTML = "";
  const userWord = userArray.length === 1 ? "user" : "users";
  userCount.textContent = `Showing ${userArray.length} ${userWord}`;

  if (userArray.length === 0) {
    userList.textContent = "No users found.";
    return;
  }

  userArray.forEach(function (user) {
    const userCard = document.createElement("div");
    userCard.classList.add("userCard");

    const name = document.createElement("h2");
    name.textContent = user.name;

    const email = document.createElement("p");
    email.textContent = user.email;

    const city = document.createElement("p");
    city.textContent = user.address.city;

    userCard.appendChild(name);
    userCard.appendChild(email);
    userCard.appendChild(city);

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

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();

  const filteredUsers = users.filter(function (user) {
    return (
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.address.city.toLowerCase().includes(searchTerm)
    );
  });

  displayUsers(filteredUsers);
});
