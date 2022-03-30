import express from 'express'
import mongoose from 'mongoose'
import {router as nehodaRouter} from './routes/nehoda.js'
import {createRequire } from "module";
const require = createRequire(import.meta.url);

const app = express()
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
console.log(PORT)
mongoose.connect(process.env.MONGODB_URI, () => console.log("connected to db"))

app.use(express.json())

app.use('/api/bakalarka/nehoda', nehodaRouter);

app.listen(PORT)
