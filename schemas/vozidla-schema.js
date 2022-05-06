import mongoose from 'mongoose'

const vozidlaSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    num: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
})

//module.exports = mongoose.model('users', userSchema)
export const vozidlaModel = mongoose.model('vozidla', vozidlaSchema)