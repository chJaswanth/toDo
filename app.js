document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const saveChangesButton = document.getElementById('save-task-changes');
    let currentEditElement = null; // To keep track of the current task being edited

    // Bootstrap modal
    const editTaskModal = new bootstrap.Modal(document.getElementById('editTaskModal'), {
      keyboard: false
    });
    const taskEditInput = document.getElementById('task-edit-input');

    // Function to add a new task
    function addTask(taskText) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;
        li.appendChild(taskContent);

        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'ms-auto'; // Bootstrap class to auto margin left

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning btn-sm me-2'; // me-2 for margin-right
        editButton.textContent = 'Edit';
        editButton.onclick = function () {
            currentEditElement = taskContent; // Set current task being edited
            taskEditInput.value = taskContent.textContent; // Populate modal input with current task text
            editTaskModal.show(); // Show the modal
        };
        buttonGroup.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            li.remove();
            saveTasks();
        };
        buttonGroup.appendChild(deleteButton);

        li.appendChild(buttonGroup);

        taskList.appendChild(li);
        saveTasks();
    }

    // Save tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li span').forEach(task => {
            tasks.push(task.textContent.trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from Local Storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => addTask(task));
        }
    }

    // Event listener for the add task button
    addTaskButton.addEventListener('click', () => {
        const task = newTaskInput.value.trim();
        if (task) {
            addTask(task);
            newTaskInput.value = '';
        }
    });

    // Event listener for saving changes in the modal
    saveChangesButton.addEventListener('click', () => {
        if (currentEditElement && taskEditInput.value.trim() !== '') {
            currentEditElement.textContent = taskEditInput.value.trim();
            saveTasks();
            editTaskModal.hide();
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});
