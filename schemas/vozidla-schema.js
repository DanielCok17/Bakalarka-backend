import mongoose from 'mongoose'

const vozidlaSchema = mongoose.Schema({
    type: {
        type: String,
        required: false
    },
    id: {
        type: Number,
        required: false
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