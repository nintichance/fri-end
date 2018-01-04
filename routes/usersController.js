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

module.exports = router
