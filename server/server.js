import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/user.route.js'
import bodyParser from "body-parser"
import imageRouter from './routes/image.route.js'

//App Config
const PORT = process.env.PORT || 4000

const app = express()
await connectDB()

//Initialize Middlewares
// ✅ Handle Clerk webhook raw body separately
app.use('/api/user/webhooks', bodyParser.raw({ type: 'application/json' }))
app.use(express.json())
app.use(cors())


//API routes
app.get('/',(req,res)=>{
    res.send("API working")
})

app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)

app.listen(PORT,()=> console.log("Server running on port " + PORT))