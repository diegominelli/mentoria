// ==========================================================================================
// SELECTORS

var createTodoForm = document.querySelector("#create-todo__form");
var todosContainer = document.querySelector(".todos-container");

// ==========================================================================================
// UTILS

function generateId() {
  return Math.floor(Math.random() * 500);
}

function getTodoData(title) {
  return {
    id: generateId(),
    title: title,
    done: false,
  };
}

function getSwitchStatusClass(status) {
  return status ? "--done" : "--not-done";
}

function createNoTodosMsg() {
  var noTodosMsg = document.createElement("p");
  noTodosMsg.classList.add("no-todos-msg");
  noTodosMsg.innerHTML = "No todos :(";

  return noTodosMsg;
}

function removeNoTodosMsg() {
  var noTodosMsg = todosContainer.querySelector(".no-todos-msg");
  noTodosMsg && todosContainer.removeChild(noTodosMsg);
}

function createTodoEl(todoData) {
  var todoEl = document.createElement("div");
  todoEl.classList.add("todo");
  todoEl.setAttribute("data-id", todoData.id);

  return todoEl;
}

function createTitleEl(todoData) {
  var titleEl = document.createElement("h4");
  titleEl.classList.add("todo__title");
  titleEl.innerHTML = todoData.title;

  return titleEl;
}

function createSwitchEl(todoData) {
  var switchEl = document.createElement("div");
  var switchMarkerEl = document.createElement("div");
  var switchStatusClass = getSwitchStatusClass(todoData.done);

  switchEl.classList.add("todo__switch", switchStatusClass);
  switchMarkerEl.classList.add("todo-switch__marker");

  switchEl.appendChild(switchMarkerEl);
  switchEl.addEventListener("click", function () {
    onUpdateTodoStatus(todoData.id);
  });

  return switchEl;
}

function createDeleteBtn(todoData) {
  var deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.classList.add("btn", "btn--delete");

  deleteBtn.addEventListener("click", function (e) {
    e.preventDefault();
    onDeleteTodo(todoData.id);
  });

  return deleteBtn;
}

function findTodo(id) {
  return document.querySelector('div[data-id="' + id + '"]');
}

// ==========================================================================================
// COMPONENTS

function todoComponent(todoData) {
  var todoEl = createTodoEl(todoData);
  var titleEl = createTitleEl(todoData);
  var switchEl = createSwitchEl(todoData);
  var deleteBtn = createDeleteBtn(todoData);

  var rightSideDiv = document.createElement("div");
  rightSideDiv.classList.add("todo_right-side");
  rightSideDiv.appendChild(switchEl);
  rightSideDiv.appendChild(deleteBtn);

  todoEl.appendChild(titleEl);
  todoEl.appendChild(rightSideDiv);

  return todoEl;
}

// ==========================================================================================
// EVENTS

var onTodoListChange = new Event("todo-list-change");

function onCreateTodo(form) {
  var inputEl = form.querySelector("#create-todo__input");
  var todoData = getTodoData(inputEl.value);
  var todo = todoComponent(todoData);

  todosContainer.appendChild(todo);
  todosContainer.dispatchEvent(onTodoListChange);
  inputEl.value = "";
}

function onUpdateTodoStatus(id) {
  var switchDoneClass = getSwitchStatusClass(true);
  var switchNotDoneClass = getSwitchStatusClass(false);

  var todoToUpdate = findTodo(id);
  var todoSwitch = todoToUpdate.querySelector(".todo__switch");
  var isDone = todoSwitch.classList.contains(switchDoneClass);

  if (isDone) {
    todoSwitch.classList.replace(switchDoneClass, switchNotDoneClass);
    return;
  }

  todoSwitch.classList.replace(switchNotDoneClass, switchDoneClass);
}

function onDeleteTodo(id) {
  var todoToRemove = findTodo(id);
  todosContainer.removeChild(todoToRemove);
  todosContainer.dispatchEvent(onTodoListChange);
}

// ==========================================================================================
// BINDINGS

createTodoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  onCreateTodo(this);
});

todosContainer.addEventListener("todo-list-change", function () {
  if (todosContainer.childElementCount === 0) {
    var noTodosMsg = createNoTodosMsg();
    todosContainer.appendChild(noTodosMsg);
    return;
  }
  removeNoTodosMsg();
});

// ==========================================================================================
// INIT

todosContainer.dispatchEvent(onTodoListChange);
