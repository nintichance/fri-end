const express = require('express')
const router = express.Router({ mergeParams: true })

const User = require('../db/models/User')

// GET (Read) New Connection
router.get('/new', (req, res) => {
    const userId = req.params.userId
    const effectId = req.params.effectId

    User.findById(userId)
        .then((user) => {
            const effect = user.effects.id(effectId)

            res.render('connections/new', {
                userId,
                effect,
                title: 'connections'
            })
        })
})

//POST (Create) New Connection
router.post('/', (req, res) => {
    const userId = req.params.userId
    const effectId = req.params.effectId

    const newConnection = req.body
    console.log(req.body)
    User.findById(userId)
        .then((user) => {
            const effect = user.effects.id(effectId)
            effect.connections.push(newConnection)

            return user.save()
        })
        .then(() => {
            res.redirect(`/users/${userId}/effects/${effectId}`)
        })
})

//GET (Read) Connection
router.get('/:connectionId', (req, res) => {
    const userId = req.params.userId
    const effectId = req.params.effectId
    const connectionId = req.params.connectionId

    User.findById(userId)
        .then((user) => {
            const effect = user.effects.id(effectId)
            const connection = effect.connections.id(connectionId)
            console.log(connection)
            res.render('connections/show', {
                userId,
                effect,
                username: user.username,
                connection,
                title: 'connections'
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

//DELETE (Delete) Connection
router.get('/:connectionId/delete', (req, res) => {
    const userId = req.params.userId
    const effectId = req.params.effectId
    const connectionId = req.params.connectionId

    User.findById(userId)
        .then((user) => {
            const effect = user.effects.id(effectId)
            effect.connections.id(connectionId).remove()

            return user.save()
        })
        .then(() => {
            res.redirect(`/users/${userId}/effects/${effectId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})







module.exports = router
