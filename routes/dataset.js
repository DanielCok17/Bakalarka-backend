import express from 'express'
import {datasetModel as Dataset} from '../schemas/dataset-schema.js'
import { check, body, validationResult } from 'express-validator'

export const router = express.Router()

//Dataset
router.get('/', async (req, res) => {
    const page = req.query.page > 0 ? req.query.page : 1
    const per_page = req.query.per_page > 0 ? req.query.per_page : 10
    const order_type = req.query.order_type == 'asc' ? 1 : -1
    
    try {
        const nehody = await Dataset.find().sort({ created_at: order_type }).limit(Number(per_page)).skip((page - 1) * per_page)
        res.json(nehody)
    } catch (err) {
        res.status(500).json({errors: err.message})
    }
})

router.get('/:postId', async (req, res) => {
    try{
        const users = await Nehoda.find({_id: req.params.postId})
        if (!users.length) {
            return res.status(404).json({errors: [{msg: `Nehoda ${req.params.postId} not found`}]})
        }
        else {
            res.json(users)
        }
        
    } catch(err) {
        res.status(500).json({errors: err.message})
    }
})

//Zapis datasetu
router.post('/', 
    body('latitude', 'not number').not().isEmpty(),
    body('longitude', 'not number').not().isEmpty(),
    body('vin', 'not number').not().isEmpty().isString(),
    body('pedal_position', 'not number').not().isEmpty().isInt(),
    body('speed', 'not number').not().isEmpty().isInt(),
    body('acceleration', 'not number').not().isEmpty(),
    body('rotation', 'not number').not().isEmpty(),
    body('status', 'not number').not().isEmpty().isInt(),

    async (req, res) => {

        const nehoda = new Dataset({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            vin: req.body.vin,
            pedal_position: req.body.pedal_position,
            speed: req.body.speed,
            acceleration: req.body.acceleration,
            rotation: req.body.rotation,
            occupied_seats: req.body.occupied_seats,
            status: req.body.status,
            on_roof: req.body.on_roof,
            rotation_count: req.body.rotation_count,
            inpack_site: req.body.inpack_site,
            temperature: req.body.temperature,
            gforce: req.body.gforce,
            fire_cars: req.body.fire_cars,
            police_cars: req.body.police_cars,
            ambulance_cars: req.body.ambulance_cars,

        })

        try{
            validationResult(req).throw();
            const savedNehoda = await nehoda.save()
            res.status(201).json(savedNehoda)

        } catch (err) {
            res.status(400).json({errors: err})
        }
})

