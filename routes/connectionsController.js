var express = require('express');
var router = express.Router({mergeParams: true});

const User = require('../db/models/User')

router.get('/new', (req, res) => {
    const userId = req.params.userId
    const effectId = req.params.effectId
  
    User.findById(userId)
      .then((user) => {
        const effect = user.effects.id(effectId)
  
        res.render('connections/new', {
          userId,
          effect,
          effectId: user.effects.id(effectId),
          pageTitle: 'new connection'
        })
      })
      .catch((err)=>{
          console.log(err)
      })
  })
  
  router.post('/', (req, res) => {
    const userId = req.params.userId
    const effectId = req.params.effectId
  
    const newEffect = req.body
  
    User.findById(userId)
      .then((user) => {
        const effect = user.effects.id(effectId)
        effect.connections.push(newEffect)
  
        return user.save()
      })
      .then(() => {
        res.redirect(`/users/${userId}/effects/${effectId}`)
      })
  })
  


module.exports = router;
