import express from 'express'
import {datasetModel as Dataset} from '../schemas/dataset-schema.js'
import { check, body, validationResult } from 'express-validator'

export const router = express.Router()

//Informácie o užívateľovi
router.get('/:postId', async (req, res) => {
    try{
        const users = await Dataset.find({_id: req.params.postId})
        if (!users.length) {
            return res.status(404).json({errors: [{msg: `User ${req.params.postId} not found`}]})
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

