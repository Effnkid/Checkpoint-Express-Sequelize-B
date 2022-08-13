const express = require('express');
const router = express.Router();
const todos = require('../models/express-models/todos');
module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.
router.get('/', (req, res) => {
  res.send(todos.listPeople());
});

router
  .get('/:name/tasks', async (req, res, next) => {
    try {
      const name = await todos.list(req.params.name);
      if (req.query.status) {
        if (req.query.status === 'complete') {
          const complete = name.filter((ele) => ele.complete === true);
          res.send(complete);
        } else {
          const incomplete = name.filter((ele) => ele.complete === false);
          res.send(incomplete);
        }
      } else {
        if (!name) {
          res.send(404);
        }
        res.send(name);
      }
    } catch (e) {
      next(e);
    }
  })
  .post('/:name/tasks', async (req, res, next) => {
    try {
      const body = await req.body;
      if (body.content === '') {
        res.send(400);
      } else {
        todos.add(req.params.name, body);

        return res.status(201).send(todos.list(req.params.name)[0]);
      }
    } catch (e) {
      next(e);
    }
  });

router
  .put('/:name/tasks/:index', (req, res, next) => {
    try {
      const index = req.params.index;
      const name = req.params.name;
      const complete = todos.complete(name, index);
      res.send(complete);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:name/tasks/:index', (req, res, next) => {
    try {
      const name = req.params.name;
      const index = req.params.index;
      // let x = todos.list(name).length

      todos.remove(name, index);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  });
