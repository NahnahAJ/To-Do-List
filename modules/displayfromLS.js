import populate from './populateFunction.js';

const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('store_now'));
  if (tasks) {
    tasks.forEach((element) => {
      populate(element);
    });
  }
};

export default loadTasks;