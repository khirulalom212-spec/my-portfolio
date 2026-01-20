const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const clearAllBtn = document.getElementById("clearAll");

// LocalStorage key
const STORAGE_KEY = "khirul_todos";

// Load todos on start
let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
renderTodos();

addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

clearAllBtn.addEventListener("click", () => {
  todos = [];
  saveTodos();
  renderTodos();
});

function addTodo(){
  const text = todoInput.value.trim();
  if (!text) return;

  const todo = {
    id: Date.now(),
    text: text,
    done: false
  };

  todos.unshift(todo);
  todoInput.value = "";
  saveTodos();
  renderTodos();
}

function toggleDone(id){
  todos = todos.map(t => t.id === id ? {...t, done: !t.done} : t);
  saveTodos();
  renderTodos();
}

function deleteTodo(id){
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  renderTodos();
}

function saveTodos(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos(){
  todoList.innerHTML = "";

  if (todos.length === 0){
    todoList.innerHTML = `<li style="opacity:.7; padding:10px;">No tasks yet ✅</li>`;
    return;
  }

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.done ? " done" : "");

    li.innerHTML = `
      <div class="left">
        <input type="checkbox" ${todo.done ? "checked" : ""} />
        <span class="todo-text"></span>
      </div>
      <button class="delete-btn">Del</button>
    `;

    li.querySelector(".todo-text").textContent = todo.text;

    li.querySelector("input").addEventListener("change", () => toggleDone(todo.id));
    li.querySelector(".delete-btn").addEventListener("click", () => deleteTodo(todo.id));

    todoList.appendChild(li);
  });
}
