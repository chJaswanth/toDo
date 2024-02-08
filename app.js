document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask(taskText) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;
        li.appendChild(taskContent);

        // Create a div for buttons to align them to the right
        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'ms-auto'; // Bootstrap class to auto margin left

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning btn-sm me-2'; // me-2 for margin-right
        editButton.textContent = 'Edit';
        editButton.onclick = function () {
            const newTask = prompt('Edit your task', taskContent.textContent);
            if (newTask !== null && newTask.trim() !== '') {
                taskContent.textContent = newTask.trim();
                saveTasks();
            }
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

        // Append the button group to the list item
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

    // Load tasks from Local Storage on page load
    loadTasks();
});
