import express from 'express'
import {zaznamModel as Zaznam} from '../schemas/zaznam-schema.js'
import { check, body, validationResult } from 'express-validator'

export const router = express.Router()

//Zaznam
router.get('/', async (req, res) => {   

    try {
        const nehody = await Zaznam.find()
        res.json(nehody)
    } catch (err) {
        res.status(500).json({errors: err.message})
    }
})

router.get('/:postId', async (req, res) => {
    try{
        const users = await Zaznam.find({_id: req.params.postId})
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
        const user = new Zaznam({
            id_nehody: req.body.id_nehody,
            vehicle: req.body.vehicle,
            resolved: req.body.resolved,
            updated_at: req.body.updated_at
        })
        
        const users = await Zaznam.findOne({id_nehody: req.body.id_nehody})

        if(users != null){
            return res.status(400).json({errors: [{msg: "Nehoda už riešená"}]})
        }
        
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
        var removeCar = await Zaznam.deleteOne({_id: req.params.postId})
        
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

//Úprava jednotliveho Zaznam
router.put('/:id', async (req, res) => {
    try {
      const users = await Zaznam.findByIdAndUpdate(req.params.id, {
            id_nehody: req.body.id_nehody,
            vehicle: req.body.vehicle,
            resolved: req.body.resolved,
            updated_at: req.body.updated_at
      });

      res.json(users);

    } catch(err) {
        console.error(err.message);
        res.status(400).json({errors: err.message})
    }
})


