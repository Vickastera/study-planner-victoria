let user = "";
let subjects = [];
let tasks = [];
let lastDeleted = null;

let xp = 0;
let level = 1;
let streak = 0;

// 🔊 sound
const clickSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3");

function play() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// 🧠 ONBOARDING
function addSubject() {
  const input = document.getElementById("subjectInput");
  if (!input.value.trim()) return;

  subjects.push(input.value.trim());
  input.value = "";
  renderSubjects();
}

function renderSubjects() {
  document.getElementById("subjectList").innerHTML =
    subjects.map(s => `<div>📘 ${s}</div>`).join("");
}

function startApp() {
  const name = document.getElementById("nameInput").value.trim();
  if (!name || subjects.length === 0) return;

  user = name;

  document.getElementById("onboarding").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  document.getElementById("userTitle").innerText = "PLAYER: " + user;

  document.getElementById("subjectSelect").innerHTML =
    subjects.map(s => `<option>${s}</option>`).join("");

  updateStreak();
  render();
}

// ➕ TASK
function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const subject = document.getElementById("subjectSelect").value;

  if (!text) return;

  tasks.push({ text, subject, done: false });
  document.getElementById("taskInput").value = "";

  play();
  render();
}

// ✔ TOGGLE
function toggleTask(i) {
  tasks[i].done = !tasks[i].done;

  if (tasks[i].done) {
    xp += 10;

    if (xp >= level * 50) {
      level++;
      alert("LEVEL UP 🔥");
    }
  }

  render();
}

// ❌ DELETE
function deleteTask(i) {
  lastDeleted = tasks[i];
  tasks.splice(i, 1);

  showUndo();
  render();
}

// ↩ UNDO
function undoDelete() {
  if (lastDeleted) {
    tasks.push(lastDeleted);
    lastDeleted = null;
    render();
  }
}

function showUndo() {
  document.getElementById("undoBar").classList.remove("hidden");
  setTimeout(() => {
    document.getElementById("undoBar").classList.add("hidden");
  }, 3000);
}

// 🔥 STREAK
function updateStreak() {
  const today = new Date().toDateString();
  const last = localStorage.getItem("lastDay");

  if (last !== today) {
    streak++;
    localStorage.setItem("lastDay", today);
  }
}

// 🧠 RENDER
function render() {
  document.getElementById("xp").innerText = "XP " + xp;
  document.getElementById("level").innerText = "Lv " + level;
  document.getElementById("streak").innerText = "🔥 " + streak;

  document.getElementById("taskList").innerHTML = tasks.map((t, i) => `
    <div class="task" onclick="toggleTask(${i})">
      <span>${t.done ? "✔" : "○"} ${t.text} [${t.subject}]</span>
      <button onclick="event.stopPropagation(); deleteTask(${i})">X</button>
    </div>
  `).join("");
}

// 🔄 RESET
function resetApp() {
  if (!confirm("Reset everything?")) return;
  localStorage.clear();
  location.reload();
}
