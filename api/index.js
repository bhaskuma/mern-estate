import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import userAuth from './routes/auth.route.js'
dotenv.config()

const app = express()
app.use(express.json())



//connect to database
mongoose.connect(process.env.URL).then(() => {
    console.log('conntect to database')
}).catch((error) => {
    console.log(error)
})

app.listen(3000, () => {
    console.log('server is running on 3000')
})
app.use('/api/user', userRouter)
app.use('/api/auth', userAuth)