const tasks = JSON.parse(localStorage.getItem('store_now'));

const createNewList = (name) => ({
  index: tasks.length + 1,
  description: name,
  completed: false,
});

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
  input.id = `${item.index}`;
  input.checked = createNewList.completed;

  if (createNewList.completed) {
    container.classList.add('completed');
  }

  input.addEventListener('change', (e) => {
    const { id } = e.target;
    const tasks = JSON.parse(localStorage.getItem('store_now'));
    const inputElement = document.querySelector(`#sec_${id}`);
    const completedElement = document.querySelector(`#com_${id}`);
    if (e.target.checked) {
      inputElement.classList.add('completed');
      completedElement.innerText = 'completed';
      // create a function that checks the id of the parent element of the checkbox.
      tasks.forEach((task) => {
        if (id === String(task.index)) {
          task.completed = true;
        }
      });
      localStorage.setItem('store_now', JSON.stringify(tasks));
    } else {
      inputElement.classList.remove('completed');
      completedElement.innerText = 'not completed';
      tasks.forEach((task) => {
        if (id === String(task.index)) {
          task.completed = false;
        }
      });
      localStorage.setItem('store_now', JSON.stringify(tasks));
    }
  });

  const input2 = document.createElement('input');
  input2.value = `${item.description}`;
  input2.setAttribute('readonly', 'readonly');
  input2.id = `sec_${item.index}`;
  input2.className = 'todo';

  input2.addEventListener('change', (e) => {
    const { id } = e.target.parentElement;
    const tasks = JSON.parse(localStorage.getItem('store_now'));
    tasks.forEach((task) => {
      if (id === String(task.index)) {
        task.description = e.target.value;
      }
    });
    localStorage.setItem('store_now', JSON.stringify(tasks));
  });

  if (item.completed) {
    input2.classList.add('completed');
    input.checked = true;
  }

  const div2 = document.createElement('div');

  const paragraph = document.createElement('p');
  paragraph.id = `com_${item.index}`;
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

  const icon3 = document.createElement('i');
  icon3.className = 'lni lni-pencil';

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
  buttonEdit.appendChild(icon3);

  container.appendChild(input);
  container.appendChild(input2);
  container.appendChild(div2);
  container.appendChild(buttonEdit);
  container.appendChild(buttonMenu);
  container.appendChild(buttonDelete);
};
export default populate;