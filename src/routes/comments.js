import express  from "express"
import { test } from "../controller/comment.js"

const router = express.Router()

router.get("/comment",test)

export default router