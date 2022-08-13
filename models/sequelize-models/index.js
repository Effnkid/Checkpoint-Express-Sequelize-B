const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: Sequelize.DATE,
});

const Owner = db.define('Owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Task.belongsTo(Owner);
Owner.hasMany(Task);

Task.clearCompleted = async function () {
  await this.destroy({
    where: { complete: true },
  });
};
Task.completeAll = async function () {
  await this.update({ complete: true }, { where: { complete: false } });
};

Task.prototype.getTimeRemaining = function () {
  if (!this.due) {
    return Infinity;
  } else {
    return (this.due = this.due - Date.now());
  }
};
Task.prototype.isOverdue = function () {
  const dueDate = (this.due = this.due - Date.now());
  if (dueDate < 0 && this.complete === true) {
    return false;
  } else if (dueDate < 0) {
    return true;
  }
  return false;
};

Task.prototype.assignOwner = function (owner) {
  return this.setOwner(owner);
};

Owner.getOwnersAndTasks = async function () {
  return await Owner.findAll({ include: Task });
};

Owner.prototype.getIncompleteTasks = async function () {
  return await Task.findAll({ where: { complete: false }, include: Owner });
};

Owner.beforeDestroy((dont) => {
  if (dont.id === 1) {
    throw new Error(`Instance can't be null `);
  }
});
//---------^^^---------  your code above  ---------^^^----------

module.exports = {
  Task,
  Owner,
};
