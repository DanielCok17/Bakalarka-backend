import mongoose from 'mongoose'

const nehodaSchema = mongoose.Schema({      
    mileage: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
})


export const nehodaModel = mongoose.model('nehoda', nehodaSchema)
