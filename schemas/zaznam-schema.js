import mongoose from 'mongoose'

const zaznamSchema = mongoose.Schema({
    id_nehody: {
        type: String,
        required: true
    },
    vehicle: {
        type: Array,
        required: true
    },
    resolved: {
        type: Boolean,
        required: true
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    },
})

//module.exports = mongoose.model('users', userSchema)
export const zaznamModel = mongoose.model('zaznam', zaznamSchema)