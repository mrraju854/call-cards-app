const addNote = document.querySelector("#add-btn");
const formContainer = document.querySelector(".card-container");
const closeForm = document.querySelector(".close-btn");

const form = document.querySelector("#noteForm");
const imageUrlInput = document.querySelector("#image-url");
const fullNameInput = document.querySelector("#full-name");
const homeTownInput = document.querySelector("#home-town");
const purposeInput = document.querySelector("#purpose");
const categoryRadios = document.querySelectorAll("input[name='category']");

const cardsRoot = document.querySelector("#cardsRoot");

let currentIndex = 0;

// ---------- localStorage ----------
function saveToLocalStorage(obj) {
  const oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  oldTasks.push(obj);
  localStorage.setItem("tasks", JSON.stringify(oldTasks));
}

// ---------- create card element ----------
function createCard(task) {
  const profileCard = document.createElement("div");
  profileCard.classList.add("profile-card");

  const profileHeader = document.createElement("div");
  profileHeader.classList.add("profile-header");

  const img = document.createElement("img");
  img.classList.add("profile-img");
  img.src = task.imageUrl;

  const name = document.createElement("h2");
  name.classList.add("profile-name");
  name.textContent = task.fullName;

  profileHeader.append(img, name);

  const profileInfo = document.createElement("div");
  profileInfo.classList.add("profile-info");

  const homeDiv = document.createElement("div");
  homeDiv.innerHTML = `
    <p class="label">Home town</p>
    <p class="value">${task.homeTown}</p>
  `;

  const purposeDiv = document.createElement("div");
  purposeDiv.innerHTML = `
    <p class="label">Purpose</p>
    <p class="value">${task.purpose}</p>
  `;

  profileInfo.append(homeDiv, purposeDiv);

  const actions = document.createElement("div");
  actions.classList.add("profile-actions");

  const callBtn = document.createElement("button");
  callBtn.classList.add("btn", "call-btn");
  callBtn.textContent = "📞 Call";

  const msgBtn = document.createElement("button");
  msgBtn.classList.add("btn", "message-btn");
  msgBtn.textContent = "Message";

  actions.append(callBtn, msgBtn);

  profileCard.append(profileHeader, profileInfo, actions);
  return profileCard;
}

// ---------- show selected card only ----------
function showSelectedCard(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (tasks.length === 0) {
    cardsRoot.innerHTML = "<p>No cards yet</p>";
    return;
  }

  if (index < 0) index = tasks.length - 1;
  if (index >= tasks.length) index = 0;

  currentIndex = index;

  cardsRoot.innerHTML = "";
  const card = createCard(tasks[currentIndex]);
  cardsRoot.append(card);
}

function changeCard(direction) {
  const card = document.querySelector(".profile-card");

  if (!card) return;

  if (direction === "up") card.classList.add("slide-up");
  if (direction === "down") card.classList.add("slide-down");

  setTimeout(() => {
    if (direction === "up") showSelectedCard(currentIndex - 1);
    if (direction === "down") showSelectedCard(currentIndex + 1);
  }, 400);
}

addNote.addEventListener("click", () => {
  formContainer.style.display = "block";
});

closeForm.addEventListener("click", () => {
  formContainer.style.display = "none";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let selectedCategory = null;
  categoryRadios.forEach(r => {
    if (r.checked) selectedCategory = r.value;
  });

  if (!selectedCategory) {
    alert("Select a category");
    return;
  }

  saveToLocalStorage({
    imageUrl: imageUrlInput.value,
    fullName: fullNameInput.value,
    homeTown: homeTownInput.value,
    purpose: purposeInput.value,
    category: selectedCategory
  });

  form.reset();
  formContainer.style.display = "none";

  currentIndex = JSON.parse(localStorage.getItem("tasks")).length - 1;
  showSelectedCard(currentIndex);
});

document.querySelector("#moveUp").addEventListener("click", () => {
  changeCard("up");
});

document.querySelector("#moveDown").addEventListener("click", () => {
  changeCard("down");
});

document.addEventListener("DOMContentLoaded", () => {
  showSelectedCard(currentIndex);
});
