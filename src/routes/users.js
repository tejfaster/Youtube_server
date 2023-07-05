import express  from "express"
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, updateUser } from "../controller/user.js"
import { verifyToken } from "../utils/verifyToken.js"

const router = express.Router()

// update user
router.put("/:id",verifyToken,updateUser)
// delete user
router.delete("/:id",verifyToken,deleteUser)
// get a user
router.get("/find/:id",getUser)
// subscribe a user
router.put("/sub/:id",verifyToken,subscribe)
// unsubscribe a user
router.put("/unsub/:id",verifyToken,unsubscribe)
// like a user
router.put("/like/:id",verifyToken,like)
// dislike a user
router.put("/dislike/:id",verifyToken,dislike)

export default router