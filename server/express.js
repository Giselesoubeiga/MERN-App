import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'
import Template from './../template'
import userRoutes from './routes/user.routes'



const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())


app.use('/', userRoutes)



app.listen(config.port, (err) => {
 if (err) {
 console.log(err)
 }
 console.info('Server started on port %s.', config.port)
})


app.get('/', (req, res) => {
    res.status(200).send(Template())
   })
   
   



mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true,
 useCreateIndex: true,
 useUnifiedTopology: true } )
mongoose.connection.on('error', () => {
 throw new Error(`unable to connect to database: ${mongoUri}`)
})


export default app
