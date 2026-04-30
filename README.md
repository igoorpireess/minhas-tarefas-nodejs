# ✅ To-Do List — Node.js + Express

Aplicação web de gerenciamento de tarefas desenvolvida com **Node.js**, **Express** e **JavaScript puro** no frontend.

Projeto desenvolvido durante o curso de **Análise e Desenvolvimento de Sistemas**.

---

## 📸 Funcionalidades

- ➕ Adicionar novas tarefas
- ✅ Marcar tarefas como concluídas
- 🗑️ Remover tarefas
- 🔍 Filtrar por: Todas, Pendentes e Concluídas
- 📊 Contador de tarefas em tempo real
- 💾 Persistência de dados em arquivo JSON local

---

## 🛠️ Tecnologias utilizadas

| Camada     | Tecnologia         |
|------------|--------------------|
| Backend    | Node.js + Express  |
| Frontend   | HTML, CSS, JS puro |
| Banco      | JSON (arquivo local)|

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 14 ou superior)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/todo-app.git

# 2. Acesse a pasta do projeto
cd todo-app

# 3. Instale as dependências
npm install

# 4. Inicie o servidor
npm start
```

Abra o navegador em: **http://localhost:3000**

> Para desenvolvimento com auto-reload: `npm run dev` (requer nodemon)

---

## 📁 Estrutura do projeto

```
todo-app/
├── public/
│   ├── index.html      # Interface do usuário
│   ├── style.css       # Estilos
│   └── script.js       # Lógica do frontend e chamadas à API
├── server.js           # Servidor Express e rotas da API
├── package.json        # Dependências do projeto
├── .gitignore
└── README.md
```

---

## 🔌 Endpoints da API

| Método   | Rota              | Descrição                        |
|----------|-------------------|----------------------------------|
| `GET`    | `/api/tasks`      | Lista todas as tarefas           |
| `POST`   | `/api/tasks`      | Cria uma nova tarefa             |
| `PATCH`  | `/api/tasks/:id`  | Alterna status (concluída/pendente) |
| `DELETE` | `/api/tasks/:id`  | Remove uma tarefa                |

---

## 📝 Licença

Este projeto está sob a licença MIT.
