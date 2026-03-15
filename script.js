let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) {
      span.classList.add("completed");
    }

    const buttons = document.createElement("div");
    buttons.classList.add("task-buttons");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.classList.add("complete-btn");
    completeBtn.onclick = () => toggleTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteTask(index);

    buttons.appendChild(completeBtn);
    buttons.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttons);

    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text === "") return;

  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

renderTasks();
