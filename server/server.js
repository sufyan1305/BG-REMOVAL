import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/user.route.js'
import bodyParser from "body-parser"

//App Config
const PORT = process.env.PORT || 4000

const app = express()
await connectDB()

//Initialize Middlewares
app.use('/api/user/webhooks', bodyParser.raw({ type: 'application/json' }))
app.use(express.json())
app.use(cors())

// ✅ Handle Clerk webhook raw body separately

//API routes
app.get('/',(req,res)=>{
    res.send("API working")
})

app.use('/api/user/',userRouter)

app.listen(PORT,()=> console.log("Server running on port " + PORT))