let tasks = {}; //

/*
  tasks (defined above) will be a place to store tasks by person;
  example:
  {
    person1: [{task object 1}, {task object 2}, etc.],
    person2: [{task object 1}, {task object 2}, etc.],
    etc.
  }
*/

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },

  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all people for whom tasks exist

    if (Object.values(tasks)) {
      return Object.keys(tasks);
    }
    return [];
  },

  add: function (name, task) {
    // saves a task for a given person
    let { content, complete } = task;

    if (tasks[name]) {
      complete = false;
      tasks[name].push({ content, complete });
    } else {
      tasks[name] = [];
      if (!complete) {
        complete = false;
        tasks[name].push({ content, complete });
      } else {
        tasks[name].push({ content, complete });
      }
    }
  },

  list: function (name) {
    // returns tasks for specified person

    return tasks[name];
  },

  complete: function (name, idx) {
    // marks a task complete

    tasks[name][idx].complete = true;
  },

  remove: function (name, idx) {
    // removes a tasks
    idx = parseInt(idx);
    tasks[name] = tasks[name].filter((ele, index) => {
      if (index !== idx) {
        return ele;
      }
    });
  },
};
