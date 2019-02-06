const Todo = require('../models/todo');
const mongoose = require('mongoose');

//
// Create
//
module.exports.create = async (req, res) => {
  const todo = req.body;
  // console.log('controller req: ', req)

  const todoCreated = new Todo({ name: todo.name });
  todoCreated.save(function (err) {
    if (err) return console.log(err);
    // saved!
  })

  return res.status(200).send(todoCreated);
}


//
// List
//
module.exports.list = (req, res) => {
  const page = (req.query.page && parseInt(req.query.page) > 0) ? parseInt(req.query.page) : 1
  const sort = (req.query.sort) ? { [req.query.sort]: 1 } : {}

  let size = 10
  if (req.query.size
      && parseInt(req.query.size) > 0
      && parseInt(req.query.size) < 500) {
    size = parseInt(req.query.size)
  }

  const skip = (size*(page-1) > 0) ? size*(page-1) : 0

  let response = {
    todos: [],
    page: page,
    size: size,
    sort: req.params.sort,
    total: 0
  }

  if (req.params.sort) response.sort = req.params.sort

  let query = {};
  if (req.query) {
    if (req.query.list_id) {
      query.list_id = req.query.list_id
    }
  }

  Todo
    .find(query)
    .skip(skip)
    .sort(sort)
    .limit(size)
    .then(function(todos) {
      return res.status(200).send(todos);
    });
}


//
// Update
//
module.exports.update = (req, res) => {
  const todo = req.body;

  Todo.updateOne(todo, (err, response) => {
    if (err) return reject(err)

    // Mongo Client automatically adds an id to an inserted object, but
    // if using a work-a-like we may need to add it from the response.
    if (!todo._id && response._id) todo._id = response._id

    return res.status(200).send(todo);
    // return resolve(todo)
  })
}


//
// Delete
//
module.exports.delete = (req, res) => {
  const todo = req.body;

  // Todo.updateOne(todo, (err, response) => {
  //   if (err) return reject(err)

  //   // Mongo Client automatically adds an id to an inserted object, but
  //   // if using a work-a-like we may need to add it from the response.
  //   if (!todo._id && response._id) todo._id = response._id

  //   return res.status(200).send(todo);
  //   // return resolve(todo)
  // })
}
