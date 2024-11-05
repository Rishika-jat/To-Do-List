document.addEventListener('DOMContentLoaded', () => {
  const doneBtn = document.getElementById('done-button');
  const input = document.getElementById('input-field');
  const list = document.querySelector('.list-ul');
  const filterTask = document.getElementById('filter-task');
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function renderTasks(tasks) {
    list.innerHTML = '';
    tasks.forEach(task => addTaskToList(task));
  }

  function addTaskToList(task) {
    const li = document.createElement('li');
    li.className = `todo-item ${task.status}`;
    li.innerHTML = `
      <span class="todo-text ${task.status} ${task.status === 'Complete' ? 'todo-text-decor' : ''}">${task.text}</span>
      <button class="edit-btn ${task.text}"><i class="fa-solid fa-lg fa-file-pen" style="color: #f0ad4e;"></i></button>
      <button class="complete-btn ${task.text}"><i class="fa-solid fa-lg fa-circle-check" style="color: #5de56d;"></i></button>
      <button class="delete-btn ${task.text}"><i class="fa-solid fa-lg fa-circle-xmark" style="color: #f40b51;"></i></button>
    `;
    list.appendChild(li);

    li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.text));
    li.querySelector('.complete-btn').addEventListener('click', () => completeTask(task.text));
    li.querySelector('.edit-btn').addEventListener('click', () => editTask(task.text));
  }

  function addTask() {
    const taskText = input.value.trim();
    if (taskText.length < 2) return;
    const task = { text: taskText, status: 'Pending' };
    tasks.push(task);
    setTasks(tasks);
    renderTasks(tasks);
    input.value = '';
  }

  function deleteTask(taskText) {
    tasks = tasks.filter(task => task.text !== taskText);
    setTasks(tasks);
    renderTasks(tasks);
  }

  function completeTask(taskText) {
    tasks = tasks.map(task => task.text === taskText ? { ...task, status: 'Complete' } : task);
    setTasks(tasks);
    renderTasks(tasks);
  }

  function editTask(taskText) {
    const newTaskText = prompt('Edit task', taskText).trim();
    if (newTaskText.length < 2) return;
    tasks = tasks.map(task => task.text === taskText ? { ...task, text: newTaskText } : task);
    setTasks(tasks);
    renderTasks(tasks);
  }

  function setTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function filterTasks(status) {
    if (status === 'All') {
      renderTasks(tasks);
    } else {
      renderTasks(tasks.filter(task => task.status === status));
    }
  }

  doneBtn.addEventListener('click', addTask);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  filterTask.addEventListener('change', (e) => filterTasks(e.target.value));

  renderTasks(tasks);
});

