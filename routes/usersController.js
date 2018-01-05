const express = require('express')
const router = express.Router()

const User = require('../db/models/User')


/* GET users listing. */
router.get('/', (req, res) => {
  User.find()
  .then((users)=>{
    res.render('users/index', {
      users,
      title: 'dot.end users'
    })
  })
  .catch((err)=>{
    console.log(err)
  })
})


router.get('/new', (req, res) => {
  res.render('users/new')
})


router.post('/', (req, res) => {
  const newUser = new User ({
    name: req.body.name,
    username: req.body.username,
    img: req.body.img,
    description: req.body.description
  })
  newUser.save()
  .then((user)=>{
    console.log(`${newUser.name} saved to database`)
    res.redirect('/users')
  })
  .catch((err)=>{
    console.log(err) 
  })
})

router.get('/:userId', (req, res)=>{
  const userId = req.params.userId
  User.findById(userId)
    .then((user)=>{
      res.render('users/show', {
        user
      })
    })
    .catch((err)=>{
      console.log(err)
    })
})

router.get('/:userId/delete', (req, res)=>{
  const userId = req.params.userId
  User.findByIdAndRemove(userId)
    .then(()=>{
      res.redirect('/users')
    })
    .catch((err)=>{
      console.log(err)
    })
})

router.get('/:userId/edit', (req, res)=>{
  const userId = req.params.userId
  User.findById(userId)
  .then((user)=>{
    res.render('users/edit', {
      user
    })
  })
})

router.put('/:userId', (req, res)=>{
  const userId = req.params.userId
  const updatedUser = req.body
  User.findByIdAndUpdate(userId, updatedUser)
    .then(()=>{
      res.redirect(`/users/${userId}`)
    })
    .catch((err)=>{
      console.log(err)
    })
})

module.exports = router
