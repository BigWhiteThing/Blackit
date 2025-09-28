let tokens = 0;
let packsOpened = 0;
let blokes = [];
let lastSpin = null;

const tokenCount = document.getElementById("tokenCount");
const packsOpenedSpan = document.getElementById("packsOpened");
const blokeCount = document.getElementById("blokeCount");
const lastSpinSpan = document.getElementById("lastSpin");
const spinResult = document.getElementById("spinResult");
const packResult = document.getElementById("packResult");
const blokeList = document.getElementById("blokeList");

const rewards = [10,20,30,40,50,100];
const allBlokes = ["🐱 Cat","🐶 Dog","🐸 Frog","🐵 Monkey","🐲 Dragon","👽 Alien"];

document.getElementById("spinBtn").onclick = () => {
  const today = new Date().toDateString();
  if (lastSpin === today) {
    spinResult.textContent = "Already spun today!";
    return;
  }
  const reward = rewards[Math.floor(Math.random()*rewards.length)];
  tokens += reward;
  lastSpin = today;
  spinResult.textContent = `You got ${reward} tokens!`;
  render();
};

document.getElementById("openPackBtn").onclick = () => {
  if (tokens < 50) {
    packResult.textContent = "Not enough tokens!";
    return;
  }
  tokens -= 50;
  packsOpened++;
  const newBloke = allBlokes[Math.floor(Math.random()*allBlokes.length)];
  blokes.push(newBloke);
  packResult.textContent = `You pulled: ${newBloke}`;
  render();
};

function render() {
  tokenCount.textContent = tokens;
  packsOpenedSpan.textContent = packsOpened;
  blokeCount.textContent = blokes.length;
  lastSpinSpan.textContent = lastSpin || "Never";

  blokeList.innerHTML = "";
  blokes.forEach(b => {
    const div = document.createElement("div");
    div.className = "bloke";
    div.textContent = b;
    blokeList.appendChild(div);
  });
}

render();
