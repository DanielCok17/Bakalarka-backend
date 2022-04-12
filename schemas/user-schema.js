import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: false
    },
    phone_numbers: {
        type: Array,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
})

//module.exports = mongoose.model('users', userSchema)
export const userModel = mongoose.model('users', userSchema)