import { Webhook } from "svix"
import userModel from "../models/user.model.js";
// API controller function to manage clerk user with db
// http://localhost:4000/api/user/webhooks

const clerkWebhooks = async (req, res) => {
    try {
        console.log("🛎️ Clerk webhook triggered")
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        const evt = await whook.verify(req.body.toString("utf8"), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        const { data, type } = evt;

        switch (type) {
            case "user.created": {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }
                await userModel.create(userData)
                res.json({ message: "Successfully created..." })
                break;
            }

            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }
                await userModel.findOneAndUpdate(
                    { clerkId: data.id },
                    userData
                )
                res.json({ message: "Successfully updated..." })

                break;
            }

            case "user.deleted": {
                await userModel.findOneAndDelete({ clerkId: data.id })
                res.json({ message: "Successfully deleted..." })

                break;
            }


            default:
                break;
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

export { clerkWebhooks }