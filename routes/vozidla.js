import express from 'express'
import {vozidlaModel as Vozidla} from '../schemas/vozidla-schema.js'
import { check, body, validationResult } from 'express-validator'

export const router = express.Router()

//Vozidla
router.get('/', async (req, res) => {   

    try {
        const nehody = await Vozidla.find()
        res.json(nehody)
    } catch (err) {
        res.status(500).json({errors: err.message})
    }
})

router.get('/:postId', async (req, res) => {
    try{
        const users = await Vozidla.find({_id: req.params.postId})
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


//Registrácia pužívateľa
router.post('/', 
    async (req, res) => {
        const user = new Vozidla({
            type: req.body.type,
            num: req.body.num,
            availability: req.body.availability
        })        
        try{
            validationResult(req).throw();

            await user.save()
            res.status(201).json({
                msg: 'Vehicle added successfully!'
              });

        } catch (err) {            
            console.error(err.message);
            res.status(400).json({errors: err.message})
        }
})

//Odstránenie inzerátu
router.delete('/:postId', async (req, res) => {
    try{
        var removeCar = await Vozidla.deleteOne({_id: req.params.postId})
        
        if (removeCar.deletedCount) {
            removeCar = []
            return res.status(200).json(removeCar)
        }
        else {
            return res.status(404).json({errors: [{msg: `Car ${req.params.postId} not found`}]})
        }
    } catch(err) {
        res.status(500).json({errors: err.message})
    }
})

//Úprava jednotliveho vozidla
router.put('/:id', async (req, res) => {
    try {
      const users = await Vozidla.findByIdAndUpdate(req.params.id, {
            type: req.body.type,
            num: req.body.num,
            availability: req.body.availability
      });

      res.json(users);

    } catch(err) {
        console.error(err.message);
        res.status(400).json({errors: err.message})
    }
})
