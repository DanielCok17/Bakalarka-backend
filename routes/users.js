import express from 'express'
import {userModel as User} from '../schemas/user-schema.js'
import { check, body, validationResult } from 'express-validator'

export const router = express.Router()

//Informácie o užívateľovi
router.get('/:postId', async (req, res) => {
    try{
        const users = await User.find({_id: req.params.postId})
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

//Obľúbené inzeráty
router.get('/:postId/phone_numbers', async (req, res) => {
    try{
        const users = await User.find({_id: req.params.postId})
        if (!users.length) {
            res.status(404).json({errors: [{msg: `user ${req.params.postId} not found`}]})
        }
        else {
            console.log('som tu') 
            res.json(users[0].phone_numbers)
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

        const user = new User({
            email: req.body.email,
            password: req.body.password
        })
        
        try{
            validationResult(req).throw();
            const email = await User.findOne({email: req.body.email})

            if(email){
                return res.status(400).json({errors: [{msg: "User with this email already exists"}]})    
            }          

            await user.save()
            res.status(201).json({
                msg: 'User added successfully!'
              });

        } catch (err) {
            res.status(400).json({errors: err.message})
        }
})


//Prihlásenie používateľa
router.post('/login',  async (req, res) => {

    const users = await User.findOne({email: req.body.email})

    if (users == null) {
        return res.status(400).json({errors: [{msg: "User was not found"}]})
    }
    
    try{
        validationResult(req).throw();

        if (req.body.password == users.password) {
            res.json({id : users['_id'] })
        }
        else{
            res.status(403).json({errors: [{msg: "Unsuccessfully logged in"}]})
        }

    } catch (err) {
        res.status(400).json({errors: err.message})
    }
})

//Úprava záznamu nehody
router.put('/:id', async (req, res) => {
    try {
      const users = await User.findByIdAndUpdate(req.params.id, {
            phone_numbers: req.body.phone_numbers
      });

      res.json(users);

    } catch(err) {
        console.error(err.message);
        res.status(400).json({errors: err.message})
    }
})
