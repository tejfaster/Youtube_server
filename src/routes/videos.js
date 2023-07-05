import express  from "express"
import { addVideo, addView, deleteVideo, getByTags, getVideo, randomVideo, search, subscribeVideo, trendVideo, updateVideo, } from "../controller/video.js"
import { verifyToken } from "../utils/verifyToken.js"

const router = express.Router()

// create a video
router.post("/",verifyToken,addVideo)
// get a video
router.get("/find/:id",verifyToken,getVideo)
// update a video
router.put("/:id",verifyToken,updateVideo)
// delete a video
router.delete("/:id",verifyToken,deleteVideo)
// add view to video
router.put("/view/:id",addView) 
// get trending video
router.get("/trend",trendVideo) 
// get random video
router.get("/random",randomVideo) 
// get subscribe video
router.get("/sub",verifyToken,subscribeVideo) 
// get video by tags video
router.get("/tags",getByTags) 
// get video by user search video
router.get("/search",search) 



export default router