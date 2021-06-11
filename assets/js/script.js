// ; Are optional in JS dont forget.
var form = document.querySelector('#task-form')
var tasksToDoE1 = document.querySelector('#tasks-to-do')
var taskIdCounter=0
var pageContent= document.querySelector('#page-content')
var tasksInProgressEl = document.querySelector("#tasks-in-progress")
var tasksCompletedEl = document.querySelector("#tasks-completed")
// pass the event arguement into the function,then prevent default action to stop browser from auto refreshing.
// this function is ran every time user hits submit
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

var isEdit = form.hasAttribute('data-task-id')
// package data as object
if (isEdit){
    // changes task id to current seletected task id
    var taskId = form.getAttribute("data-task-id")
    completeEditTask(taskNameInput,taskTypeInput,taskId)
}
else{
var taskDataObj ={
    name:taskNameInput,
    type:taskTypeInput
}
// send as arguement to createTaskEl
createTaskEl(taskDataObj)}

}

var createTaskEl = function(taskDataObj){
// Use console.dir() to make the console display data as a JavaScript object.
var listItemE1 = document.createElement('li')
// add className for css styling to apply.
listItemE1.className = 'task-item'
// add task id as a custom attribute
listItemE1.setAttribute("data-task-id",taskIdCounter)
//add html and reassign text content to taskNameInput 
var taskInfoE1 = document.createElement('div')
taskInfoE1.className="task-info"
// add html content to div
taskInfoE1.innerHTML = "<h3 class='task-name'>"+taskDataObj.name + "</h3><span class='task-type'>"+ taskDataObj.type+ "</span>"
listItemE1.appendChild(taskInfoE1)
var taskActionsEl = createTaskActions(taskIdCounter)
listItemE1.appendChild(taskActionsEl)
// add entire list item to list
tasksToDoE1.appendChild(listItemE1)
// increase task counter for next unique id
taskIdCounter++
}

createTaskActions = function(taskID){
    // creates container div for buttons and dropdowns
    var actionContainerEl = document.createElement('div')
    actionContainerEl.className='task-actions'
    // create edit button
    var editButtonEl = document.createElement('button')
    editButtonEl.textContent='Edit'
    editButtonEl.className='btn edit-btn'
    editButtonEl.setAttribute('data-task-id',taskID)
    // add edit button to container div
    actionContainerEl.appendChild(editButtonEl)
    // create delete button
    var deleteButtonEl= document.createElement('button')
    deleteButtonEl.textContent='Delete'
    deleteButtonEl.className=' btn delete-btn'
    deleteButtonEl.setAttribute('data-task-id',taskID)
    // adds Delete button to container div
    actionContainerEl.appendChild(deleteButtonEl)
    // makes a select drop down and appends it to container div
    var statusSelectEl = document.createElement('select')
    statusSelectEl.className = 'select-status'
    statusSelectEl.setAttribute('name','status-change')
    statusSelectEl.setAttribute('data-task-id',taskID)
    actionContainerEl.appendChild(statusSelectEl)

    var statusChoices =['To Do', 'In Progress','Completed']
    // statusChoices.length keeps the for loop running by checking the iterator against number of items in the array.Length is the property returing the number of items
    for (var i = 0;i<statusChoices.length;i++){
        // create option element
        var statusOptionEl = document.createElement('option')
        // statusChoices[i] returns the value of the array at the given index(When i=0,or statusChoices[0],we get the first item)
        statusOptionEl.textContent = statusChoices[i]
        statusOptionEl.setAttribute('value',statusChoices[i])
        // append to select 
        statusSelectEl.appendChild(statusOptionEl)
    }
    return actionContainerEl
}
var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;
  
    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      editTask(taskId);
    } 
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      deleteTask(taskId);
    }
  };

var editTask = function(taskId){
    // get task list item
    var taskSelected= document.querySelector(".task-item[data-task-id='"+taskId+"']")
    // get content from task name and type
    var taskName=taskSelected.querySelector('h3.task-name').textContent
    var taskType =taskSelected.querySelector('span.task-type').textContent

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector('#save-task').textContent = "Save Task"
    console.log(taskType)
    document.querySelector("#save-task").textContent = "Save Task";
    form.setAttribute("data-task-id", taskId)
}

var completeEditTask= function(taskName,taskType,taskId){
    // grabs current selected task by ID
    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']")
    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName
    taskSelected.querySelector("span.task-type").textContent=taskType
    alert("Task Updated!")
    // reset form
    form.removeAttribute('data-task-id')
    document.querySelector('#save-task').textContent="Add Task"
}

var deleteTask=function(taskId){
    // selecting a list item using .task-item[data-task-id] attribute(using no spaces in between) meaning both properties are on the same element.
    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId + "']")
    taskSelected.remove()
}

var taskStatusChangeHandler = function(event){
// get task items id
var taskId=(event.target.getAttribute("data-task-id"))
// get current selected option value and make it lowercase
var statusValue= event.target.value.toLowerCase()
// find parent task item element based on the id
var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']")
if (statusValue === 'to do'){
    tasksToDoE1.appendChild(taskSelected)
}else if(statusValue === 'in progress'){
    tasksInProgressEl.appendChild(taskSelected)
}else if (statusValue === 'completed'){
    tasksCompletedEl.appendChild(taskSelected)
}
}

pageContent.addEventListener("change",taskStatusChangeHandler)
pageContent.addEventListener('click',taskButtonHandler)
form.addEventListener("submit",taskFormHandler)
