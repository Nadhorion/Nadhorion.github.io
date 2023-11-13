import { makeTaskItem } from "./features";
import { TaskItem } from "./features";
import { fakeList } from "./features";
import { renderTaskList } from "./features";

let makeTaskItemBtn = document.getElementById('addTask');
let fakeListBtn = document.getElementById('randomList')

makeTaskItemBtn.onclick = makeTaskItem;
