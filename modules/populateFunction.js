import tasks from './objects.js';

const holder = document.getElementById('list-holder');

const populate = () => {
  tasks.forEach((element) => {
    const add = document.createElement('div');
    add.dataset.elementid = element.id;
    add.innerHTML = `
  <div class="container">
  <span><input type='checkbox'>${element.string}</span>
  <div><i class="fa-solid fa-ellipsis-vertical"></i></div>
  </div><hr>
  `;
    add.classList.add('list-items');
    holder.appendChild(add);
  });
};
export default populate();