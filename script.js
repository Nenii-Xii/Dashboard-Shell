console.log("Dashboard Shell loaded.");

const appName = "Dashboard Shell";
let userCount = 128;

function formatCurrency(amount) {
  return "Rp" + amount.toLocaleString("id-ID");
}

console.log(appName, "- Total users:", userCount);
console.log(formatCurrency(421000));

const statUsers = document.querySelector("#stat-users");
const statTransactions = document.querySelector("#stat-transactions");
const statAverage = document.querySelector("#stat-average");

console.log(statUsers, statTransactions, statAverage);

function displayData() {
  statUsers.textContent = userCount;
  statTransactions.textContent = 54;
  statAverage.textContent = formatCurrency(421000);
}

displayData();

const menuToggle = document.querySelector("#menu-toggle");
const sidebar = document.querySelector("#sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar-open");
});

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", (event) => {
    event.preventDefault();
    navLinks.forEach((l) => l.classList.remove("active"));
    event.currentTarget.classList.add("active");
  });
});

const btnRefresh = document.querySelector("#btn-refresh");

btnRefresh.addEventListener("click", () => {
  userCount = Math.floor(Math.random() * 500);
  displayData();
});

const visitorNameInput = document.querySelector("#visitor-name");
const greetingOutput = document.querySelector("#greeting-output");

document.querySelector("#btn-greet-unsafe").addEventListener("click", () => {
  greetingOutput.innerHTML = "Hello, " + visitorNameInput.value + "!";
});

document.querySelector("#btn-greet-safe").addEventListener("click", () => {
  greetingOutput.textContent = "Hello, " + visitorNameInput.value + "!";
});

const btnTheme = document.querySelector("#btn-theme");

btnTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

const commentBox = document.querySelector("#comment-box");
const commentInput = document.querySelector("#comment-input");

document.querySelector("#btn-comment").addEventListener("click", () => {
  const text = commentInput.value.trim();
  if (!text) return;

  const commentParagraph = document.createElement("p");
  commentParagraph.className = "comment-item";
  commentParagraph.textContent = text;
  commentBox.appendChild(commentParagraph);

  commentInput.value = "";
});

// Session 4 — Fetch API & 4 Request States
async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  console.log(data);
}

fetchUsers();

const stateLoading = document.querySelector("#state-loading");
const stateEmpty = document.querySelector("#state-empty");
const stateError = document.querySelector("#state-error");
const userList = document.querySelector("#user-list");
const btnRetry = document.querySelector("#btn-retry");

let lastFailedAction = null;

function showState(state) {
  stateLoading.hidden = state !== "loading";
  stateEmpty.hidden = state !== "empty";
  stateError.hidden = state !== "error";
  userList.hidden = state !== "success";
  btnRetry.hidden = state !== "error";
}

function renderUsers(data) {
  userList.textContent = "";

  data.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user.name + " - " + user.email;
    userList.appendChild(li);
  });
}

async function loadUsers(query = "") {
  lastFailedAction = () => loadUsers(query);
  showState("loading");

  try {
    const url =
      "https://jsonplaceholder.typicode.com/users" +
      (query ? "?username=" + encodeURIComponent(query) : "");
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("HTTP status: " + response.status);
    }

    const data = await response.json();

    if (data.length === 0) {
      showState("empty");
      return;
    }

    renderUsers(data);
    showState("success");
  } catch (error) {
    console.error("Failed to load data:", error);
    showState("error");
  }
}

document.querySelector("#btn-load-users").addEventListener("click", () => {
  loadUsers();
});

document.querySelector("#search-username").addEventListener("input", (event) => {
  loadUsers(event.target.value.trim());
});

async function loadUsersBroken() {
  lastFailedAction = () => loadUsersBroken();
  showState("loading");

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/no-such-user");

    if (!response.ok) {
      throw new Error("HTTP status: " + response.status);
    }

    const data = await response.json();
    renderUsers(data);
    showState("success");
  } catch (error) {
    console.error("Failed to load data:", error);
    showState("error");
  }
}

document.querySelector("#btn-simulate-error").addEventListener("click", () => {
  loadUsersBroken();
});

document.querySelector("#btn-cors-demo").addEventListener("click", async () => {
  lastFailedAction = () => {
    document.querySelector("#btn-cors-demo").click();
  };
  showState("loading");

  try {
    const response = await fetch("https://www.google.com");
    const data = await response.text();
    console.log(data);
    showState("success");
  } catch (error) {
    console.error("Failed (likely CORS):", error);
    showState("error");
  }
});

btnRetry.addEventListener("click", () => {
  if (typeof lastFailedAction === "function") {
    lastFailedAction();
  }
});
