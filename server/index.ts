require('dotenv').config()
import express from 'express' 
import cors from 'cors' 
import bodyParser from 'body-parser'
import connectDB from './config/db'
import router from './routes/index' 
import { limiter } from './config/ratelimiter'

const PORT = process.env.PORT || 5000 

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/api', router)
app.use(limiter)

const start = async () => {
    try {
        connectDB();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()