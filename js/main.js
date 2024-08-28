let theInput = document.querySelector(".todo-container .add-task input");
    theAddButton = document.querySelector(".todo-container .add-task .plus");
    tasksContent = document.querySelector(".tasks-content");
    tasksCount = document.querySelector(".tasks-count span");
    tasksComplete = document.querySelector(".tasks-completed span");

    let noTasksMsg = document.createElement("div");
        noTasksMsg.classList.add("no-tasks-message");
        noTasksMsg.textContent = 'no tasks to show';
        if(tasksContent.children.length == 0){tasksContent.appendChild(noTasksMsg);}
    

window.onload = function () {
    theInput.focus();
    loadTasksFromLocalStorage();
};

function addTask() {

    if(theInput.value === ''){

       console.log("No value");

    } else {

      noTasksMsg.remove();

      let listItem = document.createElement("div");
          listItem.className = 'task-item';

      let inputValue = document.createTextNode(theInput.value);
      listItem.appendChild(inputValue);

      let deleteButton = document.createElement("button");
          deleteButton.className = 'delete';
          deleteButton.textContent = 'Delete';
      listItem.appendChild(deleteButton);

      tasksContent.appendChild(listItem);

      tasksCount.textContent = tasksContent.querySelectorAll('.task-item').length;

      saveTasksToLocalStorage();

      theInput.value = '';
      theInput.focus();

    }

};

theAddButton.onclick = addTask();
theInput.addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        addTask();
    }
});



document.addEventListener('click', function (e){

    if (e.target.className == 'delete'){
        e.target.parentNode.remove();
        tasksCount.textContent = tasksContent.querySelectorAll('.task-item').length;
        if(tasksContent.querySelectorAll('.task-item').length === 0){tasksContent.appendChild(noTasksMsg);}
        saveTasksToLocalStorage();
    }

});

function saveTasksToLocalStorage() {
    let tasks = [];
    document.querySelectorAll('.tasks-content .task-item').forEach(task => {
        tasks.push({
            text: task.firstChild.textContent,
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (tasks.length > 0 && noTasksMsg) {
        noTasksMsg.remove();
    }
    tasks.forEach(task => {
        let listItem = document.createElement("div");
        listItem.className = 'task-item';
        
        let inputValue = document.createTextNode(task.text);
        listItem.appendChild(inputValue);

        let deleteButton = document.createElement("button");
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        listItem.appendChild(deleteButton);

        tasksContent.appendChild(listItem);
    });
    tasksCount.textContent = tasksContent.querySelectorAll('.task-item').length;
}