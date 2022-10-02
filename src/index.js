import './style.css';
import populate from '../modules/populateFunction.js';
import tasks from '../modules/objects.js';
import loadTasks from '../modules/displayfromLS.js';

const newList = document.querySelector('[data-new-list]');
const newInput = document.querySelector('[data-new-input]');
const clear = document.querySelector('.clear');
// const holder = document.getElementById('list-holder');

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

const allClear = document.querySelector('#clearAll');
// Function to clear all checked boxes
clear.addEventListener('click', () => {
  const tasksAll = JSON.parse(localStorage.getItem('store_now'));
  // const completedItem = document.querySelectorAll('.completed');
  // completedItem.forEach((val) => val.parentElement.remove());
  const filteredList = tasksAll.filter((obj) => obj.completed !== true);
  localStorage.setItem('store_now', JSON.stringify(filteredList));
  window.location.reload();
});
