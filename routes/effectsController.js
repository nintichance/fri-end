const express = require('express')
const router = express.Router()

const User = require('../db/models/User')

router.get('/new', (req, res)=>{
    userId = req.params.userId
    res.render('effects/new', {
        userId, 
        title: 'effects'
    })
})

router.get('/new', (request, response) => {
    const userId = request.params.userId
  
    response.render('stores/new', {
      userId,
      pageTitle: 'New_Store'
    })
  })













module.exports = router
