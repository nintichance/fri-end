const express = require('express')
const router = express.Router({mergeParams: true})

const User = require('../db/models/User')

router.get('/', (req, res)=>{
    const userId = req.params.userId
    User.findById(userId)
        .then((user)=>{
            res.render('effects/index', {
                userId,
                effects: user.effects,
                username: user.username,
                img: user.effects.img,
                title: 'effects'
            })
        })
        .catch((err)=>{
            console.log(err)
        })
})

router.get('/new', (req, res)=>{
    userId = req.params.userId
    res.render('effects/new', {
        userId, 
        title: 'effects'
    })
})

router.get('/:effectId', (req, res) => {
    const userId = req.params.userId
    const effectId = req.params.effectId
  
    User.findById(userId)
      .then((user) => {
        const effect = user.effects.id(effectId)
        res.render('effects/show', {
          userId,
          effect,
          effectId: user.effects._id,
          img: 'https://imgur.com/QKCVUFz',
          description: user.effects.description,
          username: user.username,
          pageTitle: 'effects'
        })
      })
      .catch((error) => {
        console.log(error)
      })
  })

  router.post('/', (req, res)=>{
    const userId = req.params.userId
    const newEffect = req.body
    console.log(userId)
    User.findById(userId)
        .then((user)=>{
            user.effects.push(newEffect)
            return user.save()
        })
        .then(()=>{
            res.redirect(`/users/${userId}/effects`)
        })
        .catch((err)=>{
            console.log(err)
        })
})

  router.get('/:effectId/delete', (req, res)=>{
    const userId = req.params.userId
    const effectId = req.params.effectId
    console.log(userId)
        User.findById(userId)
            .then((user)=>{
                user.effects.id(effectId).remove()
                return user.save()
            })
            .then(()=>{
                res.redirect(`/users/${userId}/effects`)
            })
            .catch((err)=>{
                console.log(err)
            })
  })



module.exports = router
