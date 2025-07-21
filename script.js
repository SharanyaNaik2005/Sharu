let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  let completed = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.text} 📅 ${task.date}</span>
      <input type="checkbox" ${task.done ? "checked" : ""} onchange="toggleTask(${index})">
    `;
    list.appendChild(li);
    if (task.done) completed++;
  });

  const progress = document.getElementById("progressBar");
  progress.value = tasks.length ? (completed / tasks.length) * 100 : 0;
}

function addTask() {
  const text = document.getElementById("taskInput").value;
  const date = document.getElementById("dueDate").value;
  if (!text || !date) return alert("Please enter topic and due date");

  tasks.push({ text, date, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  document.getElementById("taskInput").value = "";
  document.getElementById("dueDate").value = "";
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

window.onload = renderTasks;
