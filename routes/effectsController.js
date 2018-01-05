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

// router.post('/', (req, res)=>{
//     const userId = req.params.userId
//     const newEffect = req.body

//     User.findById(userId)
//         .then((user)=>{
//             user.effects.push(newEffect)
//             return user.save()
//         })
//         .then(()=>{
//             res.redirect(`users/${userId}/effects`)
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
// })


module.exports = router
