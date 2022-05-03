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
        type: Array,
        required: true
    },
    on_roof: {
        type: Boolean,
        required: true
    },
    rotation_count: {
        type: Number,
        required: true
    },
    inpack_site: {
        type: Number,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    gforce: {
        type: Number,
        required: true
    },
    status: {
        type: Number,        
        default: 0
    },         
    created_at: {
        type: Date,
        default: Date.now
    },
})


export const nehodaModel = mongoose.model('nehoda', nehodaSchema)
