require('dotenv').config()
const User = require('./models/User')
const Connection = require('./models/Connection')
const Effect = require('./models/Effect')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/friend_data')

mongoose.Promise = global.Promise

const steven = new User ({
    name: 'Steven',
    username: 'stewball',
    img: 'https://vignette.wikia.nocookie.net/gemcrust/images/c/c2/Steven_Universe__With_Weapon3.png/revision/latest?cb=20160911190428',
    description: 'I am the only human crystal gem and Im ready to save my planet!',
    connections: [{ 
        connection: 'mom',
        endedWell: true,
        over: false,
        effects: [{ 
            description: 'Lion. Lion and my mother have a relationship that I discover more about everyday. I think she brought him back to life like I brought my friend Lars back to life.I love him and I be friends with him forever. Feel free to take him for a ride whenever!',
            available: false,
            destroyed: false,
            want: true,
            img: 'https://i.pinimg.com/736x/00/3f/23/003f232a702e5bc89939588419174230--steven-universe-lion.jpg',
            dontWant: false}]
    }]
})

const peri = new User ({
    name: 'Peridot',
    username: 'trust_no_clods',
    img: 'http://i0.kymcdn.com/photos/images/original/001/088/980/3ed.gif',
    description: 'An alien who decided to stay',
    connections: [{ 
        connection: 'neighbor',
        endedWell: false,
        over: false,
        effects: [{ 
            description: 'I received an odd earthling music playing machine. Its useless. Who wants it?!',
            available: true,
            destroyed: false,
            want: true,
            img: 'images/ipod.gif',
            dontWant: true}]
    }]
})

const onion = new User ({
    name: 'Onion',
    username: 'oniondestroys',
    img: 'http://vignette1.wikia.nocookie.net/stevenuniverse/images/8/89/Hes_Onion.png/revision/latest?cb=20160714080818',
    description: 'Silent. But deadly.',
    connections: [{ 
        connection: 'associate',
        endedWell: false,
        over: false,
        effects: [{ 
            description: 'Steven gave this to me. Im bored with it. You can have it.',
            available: true,
            destroyed: false,
            want: false,
            img: 'https://vignette.wikia.nocookie.net/steven-universe/images/e/ee/Ranger_Guy_-_stand.png/revision/latest?cb=20150906121158',
            dontWant: true}]
    }]
})

User.remove()
  .then(() => {
    console.log('users removed')
    return steven.save()
  })
  .then(() => {
    console.log('steven is saved')
    return onion.save()
  })
  .then(() => {
    console.log('onion is saved')
    return peri.save()
  })
  .then(()=>{
    console.log('peri is saved')
  })
  .catch(err => {
    console.log(err)
  })
  .then(()=>{
    mongoose.connection.close()
  })