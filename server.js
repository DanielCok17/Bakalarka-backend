import express from 'express'
import mongoose from 'mongoose'
import {router as nehodaRouter} from './routes/nehoda.js'
import {router as usersRouter} from './routes/users.js'
import {router as datasetRouter} from './routes/dataset.js'
import {router as vozidlaRouter} from './routes/vozidla.js'
import {router as zaznamRouter} from './routes/zaznam.js'
import {createRequire } from "module";
import cors from 'cors';
const require = createRequire(import.meta.url);

const app = express()
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, () => console.log("connected to db"))

app.use(express.json())
app.use(cors())

app.use('/api/bakalarka/vozidla', vozidlaRouter);
app.use('/api/bakalarka/nehoda', nehodaRouter);
app.use('/api/bakalarka/users', usersRouter);
app.use('/api/bakalarka/dataset', datasetRouter);
app.use('/api/bakalarka/zaznam', zaznamRouter);

app.listen(PORT)
