document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Initial tasks from the wireframe
    const initialTasks = [
        "Submit an expense report",
        "Set up a project review meeting",
        "Create slides for demo",
        "Review project plan",
        "Write executive summary"
    ];

    // Load initial tasks on page load
    initialTasks.forEach(taskText => addTaskToDOM(taskText, false));

    // Event listener for the "Add" button
    addTaskBtn.addEventListener('click', addTask);
    
    // Allow adding tasks by pressing Enter in the input field
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    /**
     * Handles the logic for adding a new task from the input field.
     */
    function addTask() {
        const text = taskInput.value.trim();

        if (text !== "") {
            addTaskToDOM(text);
            taskInput.value = ""; // Clear the input field
            taskInput.focus(); // Keep focus on input for quick entry
        }
    }

    /**
     * Creates and adds a new task item to the list.
     * @param {string} text - The text content of the task.
     * @param {boolean} [isNew=true] - Flag to indicate if it's a new user-added task.
     */
    function addTaskToDOM(text, isNew = true) {
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');

        // Task content and checkbox
        listItem.innerHTML = `
            <label>
                <input type="checkbox">
                <span>${text}</span>
            </label>
            <i class="fas fa-trash-alt delete-icon"></i>
        `;

        const checkbox = listItem.querySelector('input[type="checkbox"]');
        const deleteIcon = listItem.querySelector('.delete-icon');

        // Toggle task completion
        checkbox.addEventListener('change', () => {
            listItem.classList.toggle('completed');
        });

        // Delete task
        deleteIcon.addEventListener('click', () => {
            // Optional: Add a transition class for a smooth removal
            listItem.style.opacity = '0';
            setTimeout(() => {
                taskList.removeChild(listItem);
            }, 300); // Wait for the transition
        });

        if (isNew) {
            // Add new tasks to the top of the list
            taskList.prepend(listItem);
        } else {
            // Add initial/loaded tasks to the end
            taskList.appendChild(listItem);
        }
    }

});