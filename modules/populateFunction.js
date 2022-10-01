const removeList = (element) => {
  const tasks = Array.from(JSON.parse(localStorage.getItem('store_now')));
  tasks.forEach((task) => {
    // delete task
    tasks.splice(tasks.indexOf(task), 1);
  });
  element.target.parentElement.parentElement.remove();
  localStorage.setItem('store_now', JSON.stringify(tasks));
};

const populate = (item) => {
  const holder = document.getElementById('list-holder');
  const add = document.createElement('div');
  add.classList.add('list-items');

  const container = document.createElement('div');
  container.className = 'container';
  container.id = `${item.index}`;

  const input = document.createElement('input');
  input.type = 'checkbox';

  const input2 = document.createElement('input');
  input2.value = `${item.description}`;
  input2.setAttribute('readonly', 'readonly');
  input2.id = `sec_${item.index}`;
  input2.className = 'todo';

  const div2 = document.createElement('div');

  const paragraph = document.createElement('p');
  paragraph.innerText = `${item.completed ? 'completed' : 'not completed'}`;

  const buttonMenu = document.createElement('button');
  buttonMenu.id = `menu_${item.index}`;
  buttonMenu.className = 'menu';

  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-ellipsis-vertical';

  const buttonDelete = document.createElement('button');
  buttonDelete.id = `delete_${item.index}`;
  buttonDelete.className = 'swap-btn';
  buttonDelete.addEventListener('click', removeList);

  const icon2 = document.createElement('i');
  icon2.className = 'fa-solid fa-trash';

  const buttonEdit = document.createElement('button');
  buttonEdit.id = `edit${item.index}`;
  buttonEdit.className = 'edit';
  buttonEdit.innerText = 'EDIT';

  buttonEdit.addEventListener('click', () => {
    const input = document.querySelector(`#sec_${item.index}`);
    input.removeAttribute('readonly');
    input.focus();
    input.addEventListener('blur', (e) => {
      input.setAttribute('readonly', true);
      input.value = e.target.value;
      buttonDelete.style.display = 'none';
      buttonEdit.style.display = 'none';
      buttonMenu.style.display = 'block';
    });
  });

  buttonMenu.addEventListener('click', () => {
    buttonDelete.style.display = 'block';
    buttonEdit.style.display = 'block';
    buttonMenu.style.display = 'none';
  });

  const hrLine = document.createElement('hr');
  holder.appendChild(add);
  add.appendChild(container);
  add.appendChild(hrLine);

  div2.appendChild(paragraph);
  buttonMenu.appendChild(icon);
  buttonDelete.appendChild(icon2);

  container.appendChild(input);
  container.appendChild(input2);
  container.appendChild(div2);
  container.appendChild(buttonEdit);
  container.appendChild(buttonMenu);
  container.appendChild(buttonDelete);
};
export default populate;