// fake user storage (localStorage)
let player = {
  name: "",
  tokens: 0,
  blokes: [],
  lastSpin: null
};

const usernameInput = document.getElementById("usernameInput");
const loginBtn = document.getElementById("loginBtn");
const loginScreen = document.getElementById("loginScreen");
const gameScreen = document.getElementById("gameScreen");
const playerName = document.getElementById("playerName");
const tokenCount = document.getElementById("tokenCount");

const spinBtn = document.getElementById("spinBtn");
const spinResult = document.getElementById("spinResult");

const openPackBtn = document.getElementById("openPackBtn");
const packResult = document.getElementById("packResult");
const blokeList = document.getElementById("blokeList");

// load from localStorage if exists
if (localStorage.getItem("miniBlokesPlayer")) {
  player = JSON.parse(localStorage.getItem("miniBlokesPlayer"));
  showGame();
}

// login
loginBtn.onclick = () => {
  if (usernameInput.value.trim() === "") return;
  player.name = usernameInput.value.trim();
  save();
  showGame();
};

function showGame() {
  loginScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  playerName.textContent = player.name;
  tokenCount.textContent = player.tokens;
  renderBlokes();
  checkDaily();
}

function save() {
  localStorage.setItem("miniBlokesPlayer", JSON.stringify(player));
}

// daily spin
spinBtn.onclick = () => {
  const today = new Date().toDateString();
  if (player.lastSpin === today) {
    spinResult.textContent = "You already spun today!";
    return;
  }
  const rewards = [10, 20, 30, 40, 50, 100];
  const reward = rewards[Math.floor(Math.random() * rewards.length)];
  player.tokens += reward;
  player.lastSpin = today;
  spinResult.textContent = `You got ${reward} tokens! 🎉`;
  tokenCount.textContent = player.tokens;
  save();
};

function checkDaily() {
  const today = new Date().toDateString();
  if (player.lastSpin === today) {
    spinBtn.disabled = true;
    spinResult.textContent = "Come back tomorrow for another spin!";
  } else {
    spinBtn.disabled = false;
    spinResult.textContent = "";
  }
}

// pack opening
const allBlokes = ["🐱 Cat Bloke", "🐶 Dog Bloke", "🐸 Frog Bloke", "🐵 Monkey Bloke", "🐲 Dragon Bloke", "👽 Alien Bloke"];

openPackBtn.onclick = () => {
  if (player.tokens < 50) {
    packResult.textContent = "Not enough tokens!";
    return;
  }
  player.tokens -= 50;
  const newBloke = allBlokes[Math.floor(Math.random() * allBlokes.length)];
  player.blokes.push(newBloke);
  packResult.textContent = `You pulled: ${newBloke}`;
  tokenCount.textContent = player.tokens;
  renderBlokes();
  save();
};

function renderBlokes() {
  blokeList.innerHTML = "";
  player.blokes.forEach(b => {
    const li = document.createElement("li");
    li.textContent = b;
    blokeList.appendChild(li);
  });
}
