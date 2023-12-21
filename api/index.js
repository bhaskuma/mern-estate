import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import userAuth from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser'
import path from 'path';
dotenv.config()

const app = express()
app.use(express.json())

app.use(cookieParser())

//connect to database
mongoose.connect(process.env.URL).then(() => {
    console.log('conntect to database')
}).catch((error) => {
    console.log(error)
})

const __dirname = path.resolve();

app.listen(3000, () => {
    console.log('server is running on 3000')
})
app.use('/api/user', userRouter)
app.use('/api/auth', userAuth)
app.use('/api/listing', listingRouter)


app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false, statusCode, message
    })
})