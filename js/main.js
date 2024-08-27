let theInput = document.querySelector(".add-task input");
    theAddButton = document.querySelector(".add-task .plus");
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

      let mainSpan = document.createElement("span");

      let deleteElement = document.createElement("span");

      let text = document.createTextNode(theInput.value);

      let deleteText = document.createTextNode("Delete");

      mainSpan.appendChild(text);

      mainSpan.className = 'task-box';

      deleteElement.appendChild(deleteText);

      deleteElement.className = 'delete';

      mainSpan.appendChild(deleteElement);

      tasksContainer.appendChild(mainSpan);

      theInput.value = '';

      theInput.focus();

    }

};

document.addEventListener('click', function (e){

    if (e.target.className == 'delete'){
        e.target.parentNode.remove();
    }

    if (e.target.classList.contains('task-box')){
        e.target.classList.toggle("finished");
    }

});