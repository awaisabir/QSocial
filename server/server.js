import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import passport from 'passport'
import jwt from 'express-jwt'
import DBConfig from './config/db'

const PORT = process.env.PORT || 4200
const app = express()

app.use(express.static('../client/build'))
/** Middleware(s) */
app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())


/** Mongoose */
mongoose.connect(DBConfig.address)

mongoose.connection.on('error', () => {
    console.log('Something went wrong with the db ...')
})

mongoose.connection.on('connected', () => {
    console.log('You are now connected to the db!')
})


app.get('*', (req, res) => {
    res.sendFile('/index.html')
})


app.listen(PORT, () => console.log(`App listening on ${PORT}`))