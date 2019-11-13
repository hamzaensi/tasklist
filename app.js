// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners : call function
loadEventListeners();

// Load all event listeners function
function loadEventListeners() {
  // Load DOM listener
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear Tasks event

  clearBtn.addEventListener("click", clearTasks);

  // Filter Task event
  filter.addEventListener("keyup", filterTasks);
}

// get tasks from LS

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(task => {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);
  // store in LS
  storeTaskInLocalStorage(taskInput.value);
  // Clear input
  taskInput.value = "";
  e.preventDefault();
}

// Store Task

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Remove task function

function removeTask(e) {
  if (e.target.classList.contains("fa"))
    if (confirm("are you sure ?"))
      e.target.parentElement.parentElement.remove();
  // remove tasks from LS

  removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

// Remove task from LS function

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) tasks.pop(index);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove liste

function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // clear tasks from local Storage
  clearTasksFromLocalStorage();
}
// clear tasks from local storage function

function clearTasksFromLocalStorage() {
  localStorage.clear();
}
// Filter tasks function

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  // console.log(text);
  document.querySelectorAll(".collection-item").forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
