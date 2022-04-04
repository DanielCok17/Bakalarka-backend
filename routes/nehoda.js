import express from 'express'
import {nehodaModel as Nehoda} from '../schemas/nehoda-schema.js'
import {body, validationResult } from 'express-validator'

export const router = express.Router()

//Najnovšie/najstaršie záznamy nehôd z DB
router.get('/', async (req, res) => {
    const page = req.query.page > 0 ? req.query.page : 1
    const per_page = req.query.per_page > 0 ? req.query.per_page : 10
    const order_type = req.query.order_type == 'asc' ? 1 : -1
    
    try {
        const nehody = await Nehoda.find().sort({ created_at: order_type }).limit(Number(per_page)).skip((page - 1) * per_page)
        res.json(nehody)
    } catch (err) {
        res.status(500).json({errors: err.message})
    }
})

//Ukladanie nehody do DB
router.post('/', 
    body('latitude', 'not number').not().isEmpty(),
    body('longitude', 'not number').not().isEmpty(),
    body('vin', 'not number').not().isEmpty().isString(),
    body('fuel_type', 'not number').not().isEmpty().isInt(),
    body('fuel_amount', 'not number').not().isEmpty().isInt(),
    body('pedal_position', 'not number').not().isEmpty().isInt(),
    body('speed', 'not number').not().isEmpty().isInt(),
    body('acceleration', 'not number').not().isEmpty(),
    body('rotation', 'not number').not().isEmpty(),
    body('occupied_seats', 'not number').not().isEmpty().isInt(),

    async (req, res) => {

        const nehoda = new Nehoda({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            vin: req.body.vin,
            fuel_type: req.body.fuel_type,
            fuel_amount: req.body.fuel_amount,
            pedal_position: req.body.pedal_position,
            speed: req.body.speed,
            acceleration: req.body.acceleration,
            rotation: req.body.rotation,
            occupied_seats: req.body.occupied_seats

        })

        try{
            validationResult(req).throw();
            const savedNehoda = await nehoda.save()
            res.status(201).json(savedNehoda)

        } catch (err) {
            res.status(400).json({errors: err})
        }
})




