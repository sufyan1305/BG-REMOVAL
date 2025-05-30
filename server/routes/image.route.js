import express from "express"
import { removeBgImage } from "../controllers/image.controller.js"
import upload from "../middlewares/multer.middleware.js"
import authUser from "../middlewares/auth.middleware.js"

const imageRouter = express.Router()

imageRouter.post('/remove-bg',upload.single('image'),authUser,removeBgImage)

export default imageRouter