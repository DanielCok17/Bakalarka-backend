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

//Registrácia pužívateľa
router.post('/', 
    body('email', 'not string').not().isEmpty().isEmail(),
    body('password', 'not string').not().isEmpty().isString(),
    async (req, res) => {

        const user = new Dataset({
            email: req.body.email,
            password: req.body.password
        })
        
        try{
            validationResult(req).throw();
            const email = await Dataset.findOne({email: req.body.email})
            const password = await Dataset.findOne({password: req.body.password})

            if(email){
                return res.status(400).json({errors: [{msg: "User with this email already exists"}]})    
            }

            if(password){
                return res.status(400).json({errors: [{msg: "Password already used"}]})    
            }

            await user.save()
            res.status(201).json({
                msg: 'User added successfully!'
              });

        } catch (err) {
            res.status(400).json({errors: err.array()})
        }
})

