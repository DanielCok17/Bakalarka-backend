import express from 'express'
import {vozidlaModel as Vozidla} from '../schemas/vozidla-schema.js'
import { check, body, validationResult } from 'express-validator'

export const router = express.Router()

//Vozidla
router.get('/', async (req, res) => {
    const page = req.query.page > 0 ? req.query.page : 1
    const per_page = req.query.per_page > 0 ? req.query.per_page : 10
    const order_type = req.query.order_type == 'asc' ? 1 : -1
    
    try {
        const nehody = await Vozidla.find().sort({ created_at: order_type }).limit(Number(per_page)).skip((page - 1) * per_page)
        res.json(nehody)
    } catch (err) {
        res.status(500).json({errors: err.message})
    }
})


//Registrácia pužívateľa
router.post('/', 
    async (req, res) => {
        const user = new Vozidla({
            type: req.body.type,
            id: req.body.id,
            availability: req.body.availability
        })        
        try{
            validationResult(req).throw();

            await user.save()
            res.status(201).json({
                msg: 'User added successfully!'
              });

        } catch (err) {
            res.status(400).json({errors: err.array()})
        }
})



//Úprava jednotliveho vozidla
router.put('/:id', async (req, res) => {
    try {
      const users = await Vozidla.findByIdAndUpdate(req.params.id, {
            type: req.body.type,
            id: req.body.id,
            availability: req.body.availability
      });

      res.json(users);

    } catch(err) {
        console.error(err.message);
        res.status(400).json({errors: err.message})
    }
})
