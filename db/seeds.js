require('dotenv').config()
const User = require('./models/User')
const Connection = require('./models/Connection')
const Effect = require('./models/Effect')
const mongoose = require('mongoose')


// connect to database
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.once('open', () => {
  console.log(`Mongoose has connected to MongoDB`)
})

mongoose.connection.on('error', (error) => {
  console.error(`
    MongoDB connection error!!! 
    ${error}
  `)
  process.exit(-1)
})

mongoose.Promise = global.Promise

// Delete all users, then add some fake ones
User.remove({}).then(() => {
  const steven = new User({
    name: 'Steven',
    username: 'stewball',
    img: '../images/placeholder.jpg',
    description: 'I am the only human crystal gem and Im ready to save my planet!'
  })

  const lion = new Effect({
    description: 'Lion. Lion and my mother have a relationship that I discover more about everyday. I think she brought him back to life like I brought my friend Lars back to life.I love him and I be friends with him forever. Feel free to take him for a ride whenever!',
    available: false,
    destroyed: false,
    want: true,
    img: 'https://i.pinimg.com/736x/00/3f/23/003f232a702e5bc89939588419174230--steven-universe-lion.jpg',
    dontWant: false
  })
  const mom = new Connection({
        connection: 'mom',
        endedWell: true,
        over: false
  })

  steven.effects.push(lion)
  return steven.save()
})
    .then(() => {
        return User.create({
            name: 'Peridot',
            username: 'trust_no_clods',
            img: '../images/placeholder.jpg',
            description: 'An alien who decided to stay'
    })
})
    .then((peri) => {
        const ipod = new Effect({
            description: 'I received an odd earthling music playing machine. Its useless. Who wants it?!',
            available: true,
            destroyed: false,
            want: true,
            img: '../../images/ipod.gif',
            dontWant: true
  })
      const neighbor = new Connection ({
        onnection: 'neighbor',
        endedWell: false,
        over: false
      })
  
  peri.effects.push(ipod)
  return peri.save()

})

.then(() => {
  return User.create({
    name: 'Onion',
    username: 'oniondestroys',
    img: '../../images/placeholder.jpg',
    description: 'Silent. But deadly.'
})
})
.then((onion) => {
  const rangerGuy = new Effect({
    description: 'Steven gave this to me. Im bored with it. You can have it.',
    available: true,
    destroyed: false,
    want: false,
    img: 'https://vignette.wikia.nocookie.net/steven-universe/images/e/ee/Ranger_Guy_-_stand.png/revision/latest?cb=20150906121158',
    dontWant: true
})
const stevenU = new Connection ({
  onnection: 'associate',
  endedWell: false,
  over: false
})
onion.effects.push(rangerGuy)
return onion.save()

})
    .catch((error) => {
        console.log('!!!!! ERROR SAVING SEEDED DATA !!!!!')
        console.log(error)
})
    .then(() => {
        mongoose.connection.close()
        console.log(`
            Finished seeding database...
      
            Disconnected from MongoDB
        `)
})