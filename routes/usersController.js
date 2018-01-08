const express = require('express')
const router = express.Router()

const User = require('../db/models/User')


// GET (Read) Users Index
router.get('/', (req, res) => {
  User.find()
    .then((users) => {
      res.render('users/index', {
        users,
        title: 'users'
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

// GET (Read) New User
router.get('/new', (req, res) => {
  res.render('users/new', {
    title: 'new user'
  })
})

//POST (Create) New User
router.post('/', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    img: req.body.img,
    description: req.body.description
  })
  newUser.save()
    .then((user) => {
      console.log(`${newUser.name} saved to database`)
      res.redirect('/users')
    })
    .catch((err) => {
      console.log(err)
    })
})

//GET (Read) User
router.get('/:userId', (req, res) => {
  const userId = req.params.userId
  User.findById(userId)
    .then((user) => {
      res.render('users/show', {
        user,
        title: "user"
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

//DELETE (Delete) User
router.get('/:userId/delete', (req, res) => {
  const userId = req.params.userId
  User.findByIdAndRemove(userId)
    .then(() => {
      res.redirect('/users')
    })
    .catch((err) => {
      console.log(err)
    })
})

//GET (Read) Edit Page for User
router.get('/:userId/edit', (req, res) => {
  const userId = req.params.userId
  User.findById(userId)
    .then((user) => {
      res.render('users/edit', {
        user,
        title: 'edit user'
      })
    })
})

//PUT (Update) User
router.put('/:userId', (req, res) => {
  const userId = req.params.userId
  const updatedUser = req.body
  User.findByIdAndUpdate(userId, updatedUser)
    .then(() => {
      res.redirect(`/users/${userId}`)
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
