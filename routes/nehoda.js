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
    body('mileage', 'not number').not().isEmpty().isInt(),
    body('price', 'not number').not().isEmpty().isInt(),
    async (req, res) => {

        const nehoda = new Nehoda({
            mileage: req.body.mileage,
            price: req.body.price
        })

        try{
            validationResult(req).throw();
            const savedNehoda = await nehoda.save()
            res.status(201).json(savedNehoda)

        } catch (err) {
            res.status(400).json({errors: err})
        }
})




