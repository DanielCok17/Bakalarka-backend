import mongoose from 'mongoose'
import Float from 'mongoose-float';

const FloatType = Float.loadType(mongoose,20)

var SchemaTypes = mongoose.Schema.Types;

const nehodaSchema = mongoose.Schema({ 
    latitude: {
        type: FloatType,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    vin: {
        type: String,
        required: true
    },
    fuel_type: {
        type: Number,
        required: true
    },
    fuel_amount: {
        type: Number,
        required: true
    },
    pedal_position: {
        type: Number,
        required: true
    },
    speed: {
        type: Number,
        required: true
    },
    acceleration: {
        type: Number,
        required: true
    },  
    rotation: {
        type: Number,
        required: true
    },     
    occupied_seats: {
        type: Number,
        required: true
    },         
    created_at: {
        type: Date,
        default: Date.now
    },
})



export const nehodaModel = mongoose.model('nehoda', nehodaSchema)
