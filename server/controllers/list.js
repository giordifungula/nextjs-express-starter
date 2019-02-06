const List = require('../models/list');

//
// Create
//
module.exports.create = async (req, res) => {
  const list = req.body;

  const listCreated = new List({
    name: list.name,
    user_id: list.userId
  });
  listCreated.save(function (err) {
    if (err) return console.log(err);
    // saved!
  })

  return res.status(200).send(listCreated);
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

  List
    .find()
    .skip(skip)
    .sort(sort)
    .limit(size)
    .then(function(todos) {
      return res.status(200).send(todos);
    });
}



//
// Find One
//
module.exports.findOne = (req, res) => {
  List.findById(req.query.list_id, (err, response) => {
    if (err) return reject(err)

    return res.status(200).send(response);
  })
}


//
// Update
//
module.exports.update = (req, res) => {
  const list = req.body;

  List.updateOne(list, (err, response) => {
    if (err) return reject(err)

    // Mongo Client automatically adds an id to an inserted object, but
    // if using a work-a-like we may need to add it from the response.
    if (!list._id && response._id) list._id = response._id

    return res.status(200).send(list);
  })
}


//
// Delete
//
module.exports.delete = (req, res) => {
  const list = req.body;

  // List.updateOne(list, (err, response) => {
  //   if (err) return reject(err)

  //   // Mongo Client automatically adds an id to an inserted object, but
  //   // if using a work-a-like we may need to add it from the response.
  //   if (!list._id && response._id) list._id = response._id

  //   return res.status(200).send(list);
  //   // return resolve(list)
  // })
}
