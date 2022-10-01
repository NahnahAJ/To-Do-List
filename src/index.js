import './style.css';
import populate from '../modules/populateFunction.js';
import tasks from '../modules/objects.js';
import loadTasks from '../modules/displayfromLS.js';

const newList = document.querySelector('[data-new-list]');
const newInput = document.querySelector('[data-new-input]');

const saveToStorage = (newTask) => {
  localStorage.setItem('store_now', JSON.stringify(newTask));
};

let totaltasks = tasks.length;
const indexFunc = () => {
  totaltasks += 1;
  return totaltasks;
};

const createNewList = (name) => ({ index: indexFunc(), description: name, completed: false });

newList.addEventListener('submit', (e) => {
  e.preventDefault();
  const listValue = newInput.value;
  if (listValue === null || listValue === '') return;
  // holder.innerHTML = '';
  const list = createNewList(listValue);
  populate(list);
  tasks.push(list);
  saveToStorage(tasks);
  newList.reset();
});

// On load Display all Tasks
loadTasks();
