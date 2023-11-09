let listTitle = "List";
let taskList = [];

const list = document.querySelector('ul');
fakeList();

//Fake list to edit
function fakeList() {
  let i = 0;
  while (i < 10) {

    let task = (i * 3).toString();
    let isCompleted = false;
    let lineNumber = taskList.length;
    let deleteTask = false;
    let taskItem = new TaskItem(task, isCompleted, lineNumber, deleteTask);
  
    taskList.push( taskItem );

    i += 1;

  }
  renderTaskList();
}

/**
 * Supplies parameters to TaskItem() and adds it to the bottom of
 * the list.
 */
function makeTaskItem() {

  let task = prompt("What do you need to do?", "");
  let isCompleted = false;
  let lineNumber = taskList.length;
  let deleteTask = false;
  let taskItem = new TaskItem(task, isCompleted, lineNumber, deleteTask);
  
  taskList.push( taskItem );
  renderTaskList();

}

/**
 * Deletes a desired task item from the list by looking for the specified
 * task through index values and splicing it. ==I think I can do this better==
 * 
 * @param {integer} lineSelection 
 */
function deleteTaskItem(lineSelection) {

  taskList.forEach(element => {
    if (element.lineNumber == lineSelection) {
      let itemToDelete = taskList.indexOf(element);
      taskList.splice(itemToDelete, 1);
    }
  });
  
  renderTaskList();

}

/**
 * Moves a task to a different location within the taskList array
 * 
 * @param {integer} taskToMove 
 * @param {integer} destinationIndex 
 */
function moveTask(taskToMove, destinationIndex) {

  let taskHold = taskList[taskToMove];

  if (taskToMove > destinationIndex) {

    taskList.splice((taskList.indexOf(taskList[taskToMove])), 1);
    taskList.splice(destinationIndex, 0, taskHold);

  } else {

    taskList.splice((taskList.indexOf(taskList[taskToMove])), 1);
    taskList.splice(destinationIndex, 0, taskHold);

  }
  

  renderTaskList();

}

/**
 * Sorts the taskList alpanumerically by passing
 * two task objects to the compareFn at a time using
 * the sort() function
 */
function sortTaskList() {

  taskList.sort(compareFn);

  renderTaskList();

}

/**
 * Takes two task list items and compares their task property.
 * If task a is greater than task b, returns a negative number
 * If task a is less than task b, returns a positive number
 * If both tasks are the same, returns 0
 * Comparison condition is Natural Sort's
 * 
 * @param {String} a 
 * @param {String} b 
 * @returns 
 */
function compareFn(a, b) {

  let isLessThan = a.task.localeCompare(b.task, undefined, { 
                                        numeric: true, 
                                        sensitivity: 'base'});
  return isLessThan;

}

/**
 * Allows user to change the task property of a selected taskList element
 * which is selected using its index value
 * 
 * @param {integer} taskIndex 
 */
function editTask(taskIndex) {

  let taskSelected = taskList[taskIndex];
  taskSelected.task = prompt("Edit task", `${taskSelected.task}`)

  renderTaskList();

}

/**
 * Lets user change the list title and update the html accordingly
 */
function editListTitle() {

  let listTitleNode = document.querySelector('h1');
  let newTitle = prompt("Edit title:", `${listTitle}`);

  listTitleNode.textContent = newTitle;
  listTitle = newTitle

}

/**
 * First deletes list children and then adds them back with any changes.
 * Refreshes list.
 */
function renderTaskList() {

  while (list.firstElementChild) {

    list.removeChild(list.firstElementChild);

  }

  taskList.forEach(element => {
    element.lineNumber = taskList.indexOf(element);
  })

  for (let i = 0; i < taskList.length; i++) {

    let taskText = taskList[i].task;
    const li = document.createElement("li");
    li.textContent = taskText;
    list.append( li );

  }

}

/**
 * Constructs TaskItem instance, using supplied parameters, and 
 * returns it back to call.
 * 
 * @param {string} task 
 * @param {boolean} isCompleted 
 * @param {integer} lineNumber 
 * @param {boolean} deleteTask
 */

function TaskItem(task, isCompleted, lineNumber, deleteTask) {

  this.task = task;
  this.isCompleted = isCompleted;
  this.lineNumber = lineNumber;
  this.deleteTask = deleteTask;
}