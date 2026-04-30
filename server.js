const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, "tasks.json");

// ========================
// MIDDLEWARES
// ========================

app.use(express.json());

// Serve arquivos estáticos da raiz do projeto
app.use(express.static(__dirname));

// ========================
// INICIALIZA O JSON
// ========================

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// ========================
// FUNÇÕES AUXILIARES
// ========================

function readTasks() {
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync(DB_FILE, JSON.stringify(tasks, null, 2));
}

// ========================
// ROTAS DA API
// ========================

// GET /api/tasks — Lista todas as tarefas
app.get("/api/tasks", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// POST /api/tasks — Cria nova tarefa
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res
      .status(400)
      .json({ error: "O título da tarefa é obrigatório." });
  }

  const tasks = readTasks();

  const newTask = {
    id: Date.now(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  saveTasks(tasks);

  res.status(201).json(newTask);
});

// PATCH /api/tasks/:id — Alterna status da tarefa
app.patch("/api/tasks/:id", (req, res) => {
  const tasks = readTasks();

  const task = tasks.find((t) => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ error: "Tarefa não encontrada." });
  }

  task.completed = !task.completed;

  saveTasks(tasks);

  res.json(task);
});

// DELETE /api/tasks/:id — Remove tarefa
app.delete("/api/tasks/:id", (req, res) => {
  let tasks = readTasks();

  const index = tasks.findIndex(
    (t) => t.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({ error: "Tarefa não encontrada." });
  }

  tasks.splice(index, 1);

  saveTasks(tasks);

  res.json({ message: "Tarefa removida com sucesso." });
});

// ========================
// INICIA O SERVIDOR
// ========================

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});