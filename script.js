const userList = document.querySelector("#userList");

async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();

    console.log(users);
  } catch (error) {
    console.log(error.message);
  }
}

getUsers();
