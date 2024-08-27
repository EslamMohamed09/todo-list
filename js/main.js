let theInput = document.querySelector(".todo-container .add-task input");
    theAddButton = document.querySelector(".todo-container .add-task .plus");
    tasksContainer = document.querySelector(".tasks-content");
    noTasksMsg = document.querySelector(".no-tasks-message");
    tasksCount = document.querySelector(".tasks-count span");
    tasksComplete = document.querySelector(".tasks-completed span");

window.onload = function () {
    theInput.focus();
    loadTasksFromLocalStorage();
};

theAddButton.onclick = function () {

    if(theInput.value === ''){

       console.log("No value");

    } else {

      noTasksMsg.remove();

      let listItem = document.createElement("div");
          listItem.className = 'task-box';

      let inputValue = document.createTextNode(theInput.value);
      listItem.appendChild(inputValue);

      let deleteButton = document.createElement("button");
          deleteButton.className = 'delete';
          deleteButton.textContent = 'Delete';
      listItem.appendChild(deleteButton);

      tasksContainer.appendChild(listItem);

      tasksCount.textContent = tasksContainer.children.length;

      saveTasksToLocalStorage();

      theInput.value = '';
      theInput.focus();

    }

};

document.addEventListener('click', function (e){

    if (e.target.className == 'delete'){
        e.target.parentNode.remove();
        tasksCount.textContent = tasksContainer.children.length;
        saveTasksToLocalStorage();
    }

    if (e.target.classList.contains('task-box')){
        e.target.classList.toggle("finished");
        saveTasksToLocalStorage();
    }

});

function saveTasksToLocalStorage() {
    let tasks = [];
    document.querySelectorAll('.tasks-content .task-box').forEach(task => {
        tasks.push({
            text: task.firstChild.textContent,
            finished: task.classList.contains('finished')
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
        listItem.className = 'task-box';
        if (task.finished) {
            listItem.classList.add('finished');
        }
        let inputValue = document.createTextNode(task.text);
        listItem.appendChild(inputValue);

        let deleteButton = document.createElement("button");
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        listItem.appendChild(deleteButton);

        tasksContainer.appendChild(listItem);
    });
    tasksCount.textContent = tasksContainer.children.length;
}