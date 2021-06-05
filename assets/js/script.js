// ; Are optional in JS dont forget.
var form = document.querySelector('#task-form')
var tasksToDoE1 = document.querySelector('#tasks-to-do')

// pass the event arguement into the function,then prevent default action to stop browser from auto refreshing.
var taskFormHandler = function(event){
    event.preventDefault()
var taskNameInput = document.querySelector("input[name='task-name']").value
var taskTypeInput= document.querySelector("select[name='task-type']").value

// error handling,improved usability.Doesnt allow for null form fields,resets them on submission
if(!taskNameInput|| !taskTypeInput){
    alert("You need to fill out the task form!")
    return false
}
form.reset()


// package data as object
var taskDataObj ={
    name:taskNameInput,
    type:taskTypeInput
}
// send as arguement to createTaskEl
createTaskEl(taskDataObj)
}

var createTaskEl = function(taskDataObj){
// Use console.dir() to make the console display data as a JavaScript object.
var listItemE1 = document.createElement('li')
// add className for css styling to carry over.
listItemE1.className = 'task-item'
//add html and reassign text content to taskNameInput 
var taskInfoE1 = document.createElement('div')
taskInfoE1.className="task-info"
// add html content to div
taskInfoE1.innerHTML = "<h3 class='task-name'>"+taskDataObj.name + "</h3><span class='task-type'>"+ taskDataObj.type+ "</span>"
listItemE1.appendChild(taskInfoE1)
// add entire list item to list
tasksToDoE1.appendChild(listItemE1)
}

form.addEventListener("submit",taskFormHandler)
