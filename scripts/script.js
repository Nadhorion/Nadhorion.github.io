let listTitle = "New List";
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
  
  // let arrA = taskList.slice(0, taskToMove.lineNumber);
  // let taskHanger = taskToMove;
  // let arrB = taskList.slice(taskToMove.lineNumber + 1, destinationIndex + 1 );
  // let arrC = taskList.slice(destinationIndex + 1 );
  
  // taskList = [...arrA, ...arrB, taskHanger, ...arrC];

  taskList.splice(destinationIndex, 0, taskList[taskToMove]);
  taskList.splice(taskList.indexOf(taskList[taskToMove]), 1);

  renderTaskList();

}


/**
 * Sorts the taskList alpanumerically by passing
 * two tasks to the compareFn at a time
 */
function sortTaskList() {

  let i = 0;

  while (i < taskList.length) {

    let doSorting = compareFn(taskList[i].task, taskList[(i + 1)].task, 0);

    if (doSorting === true) {

      moveTask(taskList[i + 1], i);

      i += 1;

      renderTaskList();
    }

    i += 1;

  }

  renderTaskList();

}

/**
 * Compares two tasks or Strings and returns true if they need to be sorted 
 * or false otherwise
 * 
 * @param {String} taskItemA 
 * @param {String} taskItemB 
 * @param {integer} recursionAddon 
 * @returns 
 */
function compareFn(taskItemA, taskItemB, recursionAddon) {
  
  let i = 0;
  let j = 0;

  if (recursionAddon >= 0) {
    j += recursionAddon;
  }

  let charA = taskItemA.charAt(j);
  let charB = taskItemB.charAt(j);

  if (charA === undefined || charB === undefined) {

    renderTaskList();
    return;
    
  }


  if (charA > charB) {

    return false;
    //Dont move any task or maybe return 0 / False

  } else if (charA < charB) {

    return true;
    //Move taskItemB to before TaskItemA or maybe return 1 / True

  } else {

    compareFn(taskItemA, taskItemB, (j + 1))
    //return 2 or do recursion and move to the next charAt for comparison. 
    //if no more char's, leave them as is I guess. (aka return False eventually)
  }
}

function editTask() {

}

function editTitle() {

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