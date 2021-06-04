// ; Are optional in JS dont forget.
var form = document.querySelector('#task-form')
var tasksToDoE1 = document.querySelector('#tasks-to-do')

// pass the event arguement into the function,then prevent default action to stop browser from auto refreshing.
var createTaskHandler = function(event){
    event.preventDefault()

    var listItemE1 = document.createElement('li')
    listItemE1.className = 'task-item'
    listItemE1.textContent = 'this is a new task'
    tasksToDoE1.appendChild(listItemE1)
}

form.addEventListener("submit",createTaskHandler)
