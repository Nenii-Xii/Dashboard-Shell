// Step 1 — Verify script connection
console.log("Dashboard Shell loaded.");

// Step 2 — Variables & helper function
const appName = "Dashboard Shell";
let userCount = 128;

function formatCurrency(amount) {
  return "Rp" + amount.toLocaleString("id-ID");
}

console.log(appName, "- Total users:", userCount);
console.log(formatCurrency(421000));

// Step 3 — Selecting DOM elements
const statUsers = document.querySelector("#stat-users");
const statTransactions = document.querySelector("#stat-transactions");
const statAverage = document.querySelector("#stat-average");

console.log(statUsers, statTransactions, statAverage);

// Step 4 — Populating DOM with data
function displayData() {
  statUsers.textContent = userCount;
  statTransactions.textContent = 54;
  statAverage.textContent = formatCurrency(421000);
}

displayData();

// Step 5 — Event handling: Menu toggle & active navigation
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

// Step 6 — Refresh Data button
const btnRefresh = document.querySelector("#btn-refresh");

btnRefresh.addEventListener("click", () => {
  userCount = Math.floor(Math.random() * 500);
  displayData();
});

// Step 7 — XSS Demo: innerHTML (unsafe) vs textContent (safe)
const visitorNameInput = document.querySelector("#visitor-name");
const greetingOutput = document.querySelector("#greeting-output");

// UNSAFE — innerHTML parses HTML tags/attributes and can execute scripts
document.querySelector("#btn-greet-unsafe").addEventListener("click", () => {
  greetingOutput.innerHTML = "Hello, " + visitorNameInput.value + "!";
});

// SAFE — textContent treats input strictly as plain text
document.querySelector("#btn-greet-safe").addEventListener("click", () => {
  greetingOutput.textContent = "Hello, " + visitorNameInput.value + "!";
});

// Exercise A — Dark/Light Theme toggle
const btnTheme = document.querySelector("#btn-theme");

btnTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Exercise B — Comment box (fixed safely using createElement + textContent)
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
