const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const EffectSchema = new Schema({
    description: {
        type: String
    },
    available: {
        type: Boolean,
        required: true
    },
    destroyed: {
        type: Boolean,
        required: true
    },
    img: {
        type: String,
        default: '/Users/nintichance/ga_wdi/projects/fri-end/public/images/placeholder.jpg'
    },
    want: {
        type: String
    },
    dontWant: {
        type: String
    }
})

const ConnectionSchema = new Schema({
    connection: {
        type: String
    },
    endedWell: {
        type: Boolean
    },
    over: {
        type: Boolean
    },
    effects: [EffectSchema]

},
{
    timestamps: {},
    usePushEach: true
})

const UserSchema = new Schema(
    {
        name: {
            type: String
        },
        username: {
            type: String,
            required: true
        },
        img: {
            type: String,
            default: '/Users/nintichance/ga_wdi/projects/fri-end/public/images/placeholder.jpg'
        },
        description: {
            type: String,
            required: true
        },
        connections: [ConnectionSchema]
    },
    {
        timestamps: {},
        usePushEach: true
    }
)

module.exports = {
    UserSchema,
    ConnectionSchema,
    EffectSchema
}
