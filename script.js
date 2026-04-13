alert("NEW VERSION");

let tasks = [];
let lastDeleted = null;
let tasks = [];
let lastDeleted = null;

let xp = 0;
let level = 1;
let streak = 0;

// SOUND
const sounds = {
  click: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-game-click-1114.mp3"),
  done: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3")
};

function playSound(name) {
  if (!sounds[name]) return;
  sounds[name].currentTime = 0;
  sounds[name].play();
}

// ADD TASK
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (!text) return;

  tasks.push({ text, done: false });
  input.value = "";

  playSound("click");
  render();
}

// TOGGLE TASK
function toggleTask(i) {
  tasks[i].done = !tasks[i].done;

  if (tasks[i].done) {
    gainXP();
    playSound("done");
  }

  render();
}

// DELETE TASK
function deleteTask(i) {
  lastDeleted = tasks[i];
  tasks.splice(i, 1);
  showUndo();
  render();
}

// UNDO
function undoDelete() {
  if (lastDeleted) {
    tasks.push(lastDeleted);
    lastDeleted = null;
    render();
  }
}

function showUndo() {
  const bar = document.getElementById("undoBar");
  bar.classList.remove("hidden");
  setTimeout(() => bar.classList.add("hidden"), 3000);
}

// XP SYSTEM
function gainXP() {
  xp += 10;

  if (xp >= level * 100) {
    xp = 0;
    level++;
    alert("LEVEL UP!");
  }
}

// STREAK
function updateStreak() {
  const today = new Date().toDateString();
  const last = localStorage.getItem("mino_day");

  if (last !== today) {
    streak++;
    localStorage.setItem("mino_day", today);
  }
}

// POMODORO
let timer = 1500;
let interval;

function startPomodoro() {
  clearInterval(interval);

  interval = setInterval(() => {
    timer--;
    updateTimer();

    if (timer <= 0) {
      clearInterval(interval);
      alert("Time's up!");
    }
  }, 1000);
}

function updateTimer() {
  const min = Math.floor(timer / 60);
  const sec = timer % 60;

  document.getElementById("timer").textContent =
    min + ":" + sec.toString().padStart(2, "0");
}

// RESET
function resetApp() {
  const ok = confirm("Delete all progress?");
  if (!ok) return;

  tasks = [];
  xp = 0;
  level = 1;
  streak = 0;

  render();
}

// RENDER
function render() {
  document.getElementById("xp").textContent = xp;
  document.getElementById("level").textContent = level;
  document.getElementById("streak").textContent = streak;

  const list = document.getElementById("taskList");

  if (tasks.length === 0) {
    list.innerHTML = "<p style='opacity:0.5'>No tasks yet...</p>";
    return;
  }

  list.innerHTML = tasks.map((t, i) => `
    <div style="display:flex;justify-content:space-between;margin:6px 0">
      <span onclick="toggleTask(${i})" style="cursor:pointer">
        ${t.done ? "✓" : "○"} ${t.text}
      </span>
      <button onclick="deleteTask(${i})">X</button>
    </div>
  `).join("");
}

// INIT
updateStreak();
render();