import { makeTaskItem } from "./features.js";
import { fakeList } from "./features.js";
import { sortTaskList } from "./features.js";
import { deleteTaskItem }  from "./features.js";


let makeTaskItemBtn = document.getElementById('addTask');
let fakeListBtn = document.getElementById('randomList')
let sortTaskListBtn = document.getElementById('sortList')
//let deleteTaskItemBtn = document.getElementById()

makeTaskItemBtn.onclick = makeTaskItem;
fakeListBtn.onclick = fakeList;
sortTaskListBtn.onclick = sortTaskList;




//window.deleteTaskItem = deleteTaskItem;