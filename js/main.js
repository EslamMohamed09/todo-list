let theInput = document.querySelector(".todo-container .add-task input");
    theAddButton = document.querySelector(".todo-container .add-task .plus");
    tasksContainer = document.querySelector(".tasks-content");
    noTasksMsg = document.querySelector(".no-tasks-message");
    tasksCount = document.querySelector(".tasks-count span");
    tasksComplete = document.querySelector(".tasks-completed span");

window.onload = function () {
    theInput.focus();
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

      theInput.value = '';
      theInput.focus();

    }

};

document.addEventListener('click', function (e){

    if (e.target.className == 'delete'){
        e.target.parentNode.remove();
        tasksCount.textContent = tasksContainer.children.length;
    }

    if (e.target.classList.contains('task-box')){
        e.target.classList.toggle("finished");
    }

});