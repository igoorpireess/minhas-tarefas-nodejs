// ========================
// ESTADO DA APLICAÇÃO
// ========================
let tasks = [];
let currentFilter = "all";

// ========================
// SELETORES DO DOM
// ========================
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const doneCount = document.getElementById("doneCount");
const filterBtns = document.querySelectorAll(".filter-btn");

// ========================
// FUNÇÕES DA API
// ========================

async function fetchTasks() {
  try {
    const res = await fetch("/api/tasks");
    tasks = await res.json();
    render();
  } catch (err) {
    console.error("Erro ao buscar tarefas:", err);
  }
}

async function addTask(title) {
  try {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error);
      return;
    }

    const newTask = await res.json();
    tasks.unshift(newTask);
    render();
  } catch (err) {
    console.error("Erro ao adicionar tarefa:", err);
  }
}

async function toggleTask(id) {
  try {
    const res = await fetch(`/api/tasks/${id}`, { method: "PATCH" });
    const updated = await res.json();
    tasks = tasks.map((t) => (t.id === id ? updated : t));
    render();
  } catch (err) {
    console.error("Erro ao atualizar tarefa:", err);
  }
}

async function deleteTask(id) {
  try {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    tasks = tasks.filter((t) => t.id !== id);
    render();
  } catch (err) {
    console.error("Erro ao deletar tarefa:", err);
  }
}

// ========================
// RENDERIZAÇÃO
// ========================

function getFilteredTasks() {
  if (currentFilter === "pending") return tasks.filter((t) => !t.completed);
  if (currentFilter === "done") return tasks.filter((t) => t.completed);
  return tasks;
}

function updateStats() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  const pending = total - done;

  totalCount.textContent = total;
  pendingCount.textContent = pending;
  doneCount.textContent = done;
}

function render() {
  const filtered = getFilteredTasks();

  taskList.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
    filtered.forEach((task) => {
      const li = createTaskElement(task);
      taskList.appendChild(li);
    });
  }

  updateStats();
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = `task-item ${task.completed ? "completed" : ""}`;
  li.dataset.id = task.id;

  li.innerHTML = `
    <div class="task-check" title="Marcar como concluída">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="#0d0d0f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="task-title">${escapeHtml(task.title)}</span>
    <button class="task-delete" title="Remover tarefa">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"></path>
        <path d="M10 11v6M14 11v6"></path>
      </svg>
    </button>
  `;

  // Toggle ao clicar no checkbox ou no título
  li.querySelector(".task-check").addEventListener("click", () => toggleTask(task.id));
  li.querySelector(".task-title").addEventListener("click", () => toggleTask(task.id));

  // Deletar
  li.querySelector(".task-delete").addEventListener("click", () => deleteTask(task.id));

  return li;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

// ========================
// EVENTOS
// ========================

addBtn.addEventListener("click", () => {
  const title = taskInput.value.trim();
  if (!title) return;
  addTask(title);
  taskInput.value = "";
  taskInput.focus();
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

// ========================
// INICIALIZAÇÃO
// ========================
fetchTasks();
