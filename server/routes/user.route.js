import express from "express"
import { clerkWebhooks, userCredits } from "../controllers/user.controller.js"
import authUser from "../middlewares/auth.middleware.js"

const userRouter = express.Router()

userRouter.post('/webhooks',clerkWebhooks)
userRouter.get('/credits',authUser,userCredits)

export default userRouter;