const express = require('express')
const router = express.Router({ mergeParams: true })

const User = require('../db/models/User')

// GET (Read) Effects Index
router.get('/', (req, res) => {
    const userId = req.params.userId
    User.findById(userId)
        .then((user) => {
            res.render('effects/index', {
                userId,
                effects: user.effects,
                username: user.username,
                img: user.effects.img,
                title: 'effects'
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

// GET (Read) New Effect
router.get('/new', (req, res) => {
    userId = req.params.userId
    res.render('effects/new', {
        userId,
        title: 'effects'
    })
})

//GET (Read) Effect
router.get('/:effectId', (req, res) => {
    const userId = req.params.userId
    const effectId = req.params.effectId

    User.findById(userId)
        .then((user) => {
            const effect = user.effects.id(effectId)
            console.log(`EFFECT${effect}`)
            console.log(`USER EFFECTS ${user.effects}`)
            res.render('effects/show', {
                userId,
                effect,
                username: user.username,
                title: 'effects'
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

//POST (Create) New Effect
router.post('/', (req, res) => {
    const userId = req.params.userId
    const newEffect = req.body
    console.log(userId)
    User.findById(userId)
        .then((user) => {
            user.effects.push(newEffect)
            return user.save()
        })
        .then(() => {
            res.redirect(`/users/${userId}/effects`)
        })
        .catch((err) => {
            console.log(err)
        })
})

//DELETE (Delete) Effect
router.get('/:effectId/delete', (req, res) => {
    const userId = req.params.userId
    const effectId = req.params.effectId
    console.log(userId)
    User.findById(userId)
        .then((user) => {
            user.effects.id(effectId).remove()
            return user.save()
        })
        .then(() => {
            res.redirect(`/users/${userId}`)
        })
        .catch((err) => {
            console.log(err)
        })
})


module.exports = router
