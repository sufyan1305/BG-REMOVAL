import jwt from "jsonwebtoken"

//Middleware to decode jwt to get clerkId

const authUser = async (req, res, next) => {
    try {
        console.log("Auth entered...");
        
        const {token} = req.headers;

        if(!token){
            return res.json({success:false,message:"Not authorized login again"})
        }

        const token_decode = jwt.decode(token)
        console.log(token_decode);
        
        req.clerkId = token_decode.clerkId;
        next()

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

export default authUser;