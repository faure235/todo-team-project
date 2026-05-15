// Attendre que la page soit chargée
document.addEventListener('DOMContentLoaded', function() {
    
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    // Charger les tâches sauvegardées
    let tasks = [];

    // Ajouter une tâche
    function addTask() {
        const text = taskInput.value.trim();
        if (text === '') return;
        
        const task = {
            id: Date.now(),
            text: text,
            completed: false
        };
        
        tasks.push(task);
        taskInput.value = '';
        renderTasks();
    }

    // Supprimer une tâche
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }

    // Marquer comme terminée
    function toggleTask(id) {
        const task = tasks.find(task => task.id === id);
        task.completed = !task.completed;
        renderTasks();
    }

    // Afficher les tâches
    function renderTasks() {
        taskList.innerHTML = '';
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.style.textDecoration = task.completed ? 'line-through' : 'none';
            li.style.opacity = task.completed ? '0.6' : '1';
            
            li.innerHTML = `
                <span style="cursor: pointer; flex: 1;">${task.text}</span>
                <div>
                    <button class="complete-btn" style="background: green; margin-right: 5px;">✓</button>
                    <button class="delete-btn" style="background: red;">✗</button>
                </div>
            `;
            
            const completeBtn = li.querySelector('.complete-btn');
            const deleteBtn = li.querySelector('.delete-btn');
            
            completeBtn.onclick = () => toggleTask(task.id);
            deleteBtn.onclick = () => deleteTask(task.id);
            
            taskList.appendChild(li);
        });
    }

    // Événements
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
    });
});