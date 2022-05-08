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

//Ukladanie nehody do DB
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

        const nehoda = new Nehoda({
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

        })

        try{
            validationResult(req).throw();
            const savedNehoda = await nehoda.save()
            res.status(201).json(savedNehoda)

        } catch (err) {
            res.status(400).json({errors: err})
        }
})

//Odstránenie všetkých nehod
router.delete('/vsetky', async (req, res) => {
    try{
        var removeCar = await Nehoda.deleteMany({})
        console.log(removeCar)
        if (removeCar.deletedCount) {
            removeCar = []
            return res.status(200).json(removeCar)
        }
        else {
            return res.status(404).json({errors: [{msg:  "not found"}]})
        }
    } catch(err) {
        res.status(500).json({errors: err.message})
    }
})

//Úprava záznamu nehody
router.put('/:id', async (req, res) => {
    try {
      const car = await Nehoda.findByIdAndUpdate(req.params.id, {
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
      });

      res.json(car);

    } catch(err) {
        console.error(err.message);
        res.status(400).json({errors: err.message})
    }
});

//Úprava záznamu nehody
router.put('/:id/edit', async (req, res) => {
    try {
      const car = await Nehoda.findByIdAndUpdate(req.params.id, {
            status: req.body.status
      });
      res.json(car);

    } catch(err) {
        console.error(err.message);
        res.status(400).json({errors: err.message})
    }
});


