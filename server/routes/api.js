const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const TodoController = require('../controllers/todo');
const ListController = require('../controllers/list');

'use strict'

const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// const usersCollection = db.collection('users')

//
// Todos
//

// Todos - list
router.get('/todos', function(req, res) {
  return TodoController.list(req, res);
});

// Todos - new
router.post('/todo/create', function(req, res) {
  return TodoController.create(req, res);
});

// Todos - update
router.post('/todo/edit', function(req, res) {
  return TodoController.update(req, res);
});

// Todos - delete
router.post('/todo/delete', function(req, res) {
  return TodoController.delete(req, res);
});


//
// Lists
//

// Lists - list
router.get('/lists', function(req, res) {
  return ListController.list(req, res);
});

// Lists - list
router.get('/listById', function(req, res) {
  return ListController.findOne(req, res);
});

// Lists - new
router.post('/list/create', function(req, res) {
  return ListController.create(req, res);
});

// Lists - update
router.post('/list/edit', function(req, res) {
  return ListController.update(req, res);
});

// Lists - delete
router.post('/list/delete', function(req, res) {
  return ListController.delete(req, res);
});


//
// Users
//
router.get('/admin/users', (req, res) => {

  // Check user is logged in and has admin access
  if (!req.user || !req.user.admin || req.user.admin !== true)
    return res.status('403').end()

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
    users: [],
    page: page,
    size: size,
    sort: req.params.sort,
    total: 0
  }

  if (req.params.sort) response.sort = req.params.sort

  let result
  return new Promise(function(resolve, reject) {

    result = usersCollection
    .find()
    .skip(skip)
    .sort(sort)
    .limit(size)

    result.toArray((err, users) => {
      if (err) {
        reject(err)
      } else {
        resolve(users)
      }
    })
  })
  .then(users => {
    response.users = users
    return result.count()
  })
  .then(count => {
    response.total = count
    return res.json(response)
  })
  .catch(err => {
    return res.status(500).json(err)
  })
})


// Expose a route to return user profile if logged in with a session
router.get('/account/user', (req, res) => {
  if (req.user) {
    return new Promise((resolve, reject) => {
      usersCollection.findOne({ _id: req.user.id })
      .then(user => {
        if (!user) return res.status(500).json({error: 'Unable to fetch profile'})
        res.json({
          name: user.name,
          email: user.email,
          emailVerified: (user.emailVerified && user.emailVerified === true) ? true : false
        })
      })
      .catch(err => {
        return res.status(500).json({error: 'Unable to fetch profile'})
      })
    })
  } else {
    return res.status(403).json({error: 'Must be signed in to get profile'})
  }
})

// Expose a route to allow users to update their profiles (name, email)
router.post('/account/user', (req, res) => {
  // console.log('req.user: ',req.user)
  // console.log('req.body: ',req.body)

  if (req.user) {
    return new Promise((resolve, reject) => {

      usersCollection.findOne({ _id: req.user.id })
      .then(user => {

        console.log('user: ', user)

        if (!user) return res.status(500).json({error: 'Unable to fetch profile'})

        if (req.body.name) {
          user.name = req.body.name
        }

        if (req.body.email) {
          // Reset email verification field if email address has changed
          if (req.body.email && req.body.email !== user.email)
            user.emailVerified = false

          user.email = req.body.email
        }

        console.log('updated user: ', user)
        // console.log('usersCollection.updateOne: ',usersCollection.updateOne)
        return usersCollection.updateOne({
          _id: { $eq: user._id} },
          user
        )
      })
      .then(user => {
        return res.status(204).redirect('/account')
      })
      .catch(err => {
        console.log('err: ',err)
        return res.status(500).json({error: 'Unable to fetch profile'})
      })
    })
  } else {
    return res.status(403).json({error: 'Must be signed in to update profile'})
  }
})

// Expose a route to allow users to delete their profile.
router.post('/account/delete', (req, res) => {
  if (req.user) {
    return new Promise((resolve, reject) => {
      usersCollection.remove(req.user.id)
      .then(() => {
        // Destroy local session after deleting account
        req.logout()
        req.session.destroy(() => {
          // When the account has been deleted, redirect client to
          // /auth/callback to ensure the client has it's local session state
          // updated to reflect that the user is no longer logged in.
          return res.redirect(`/auth/callback?action=signout`)
        })
      })
      .catch(err => {
        return res.status(500).json({error: 'Unable to delete profile'})
      })
    })
  } else {
    return res.status(403).json({error: 'Must be signed in to delete profile'})
  }
})

// Adventures
// router.get('/adventure', function(req, res) {
//   adventureService.getById(req, res)
// });
// router.post('/create-adventure', function(req, res) {
//   adventureService.create(req, res, req.body.userId, req.body.adventure)
// });
// router.post('/delete-adventure', function(req, res) {
//   adventureService.delete(req, res, req.body.adventure_id)
// });
// router.post('/edit-adventure', function(req, res) {
//   adventureService.update(req, res, req.body.adventure)
// });
// router.post('/publish-adventure', function(req, res) {
//   adventureService.publish(req, res, req.body.adventure_id)
// });
// router.post('/unpublish-adventure', function(req, res) {
//   adventureService.unpublish(req, res, req.body.adventure_id)
// });
// router.get('/user-adventures', function(req, res) {
//   adventureService.getByAuthorId(req, res)
// });

// // User
// router.get('/user-by-username', function(req, res) {
//   userService.getByUsername(req, res)
// });
// router.get('/user-by-id', function(req, res) {
//   userService.getUserById(req, res)
// });
// router.post('/update-user', function(req, res) {
//   userService.update(req, res)
// });

// // Cloudinary
// router.post('/upload-image', function(req, res) {
//   cloudinaryService.UploadImage(req, res)
// });

// router.post('/add-image-tags', function(req, res) {
//   cloudinaryService.addImageTags(req, res)
// });


module.exports = router;
