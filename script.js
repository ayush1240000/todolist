'use  strict';
    const todoForm = document.getElementById("todo-form");
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDate");
    const todoList = document.getElementById("todo-list");
    const sortSelect = document.getElementById("sort");
    const categorySelect = document.getElementById("Category");

    let tasks = [];

    function renderTasks() {
        todoList.innerHTML = "";
        const categoryFilter = categorySelect.value;
        tasks.forEach((task, index) => {
            if (categoryFilter === "All" || (categoryFilter === "completed" && task.completed) || (categoryFilter === "pending" && !task.completed)) {
                const taskElement = document.createElement("li");
                taskElement.classList.add("task");
                if (task.completed) {
                    taskElement.classList.add("completed");
                }
                taskElement.innerHTML = `
                    <input type="checkbox" ${task.completed ? "checked" : ""}>
                    <input type="text" value="${task.name}" ${task.completed ? "disabled" : ""}>
                    <span>${task.dueDate}</span>
                    <button class="delete">Delete</button>
                `;
                const checkbox = taskElement.querySelector("input[type='checkbox']");
                const taskInput = taskElement.querySelector("input[type='text']");
                const deleteButton = taskElement.querySelector(".delete");

                checkbox.addEventListener("change", () => {
                    tasks[index].completed = checkbox.checked;
                    renderTasks();
                });

                taskInput.addEventListener("change", () => {
                    tasks[index].name = taskInput.value;
                });


                deleteButton.addEventListener("click", () => {
                    if (!tasks[index].completed) { 
                        tasks.splice(index, 1);
                        renderTasks();
                    }
                });
                todoList.appendChild(taskElement);
            }
        });
    }

    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const taskName = taskInput.value.trim();
        const dueDate = dueDateInput.value;
       
        if (taskName !== "") {
            tasks.push({ name: taskName, completed: false, dueDate: dueDate });
            taskInput.value = "";
            dueDateInput.value = "";
        
            renderTasks();
        }
    });

    sortSelect.addEventListener("change", () => {
        const sortBy = sortSelect.value;
        tasks.sort((a, b) => {
            if (sortBy === "dueDate") {
                return new Date(a.dueDate) - new Date(b.dueDate);
            } else {
                return a.name.localeCompare(b.name);
            }
        });
        renderTasks();
    });

    categorySelect.addEventListener("change", () => {
        renderTasks();
    });

    renderTasks();
