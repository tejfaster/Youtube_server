import { createError } from "../expection/expection.js"
import User from "../models/User.js"
import Video from "../models/Video.js"

export const addVideo = async (req, res, next) => {
    try {
        const newVideo = new Video({ userId: req.user.id, ...req.body })
        const savedVideo = await newVideo.save()
        res.status(200).json(savedVideo)
    } catch (err) {
        next(err)
    }
}
export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "Video not found!"))
        if (req.user.id === video.userId) {
            const updateVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true }
            )
            res.status(200).json(updateVideo)
        } else {
            return next(createError(434, "You can update only your video!"))
        }
    } catch (err) {
        next(err)
    }
}
export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "Video not found!"))
        if (req.user.id === video.userId) {
            await Video.findByIdAndUpdate(req.params.id)
            res.status(200).json("the video has been deleted")
        } else {
            return next(createError(434, "You can delete only your video!"))
        }
    } catch (err) {
        next(err)
    }
}
export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (err) {
        next(err)
    }
}
export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.i, {
            $inc: { views: 1 }
        })
        res.status(200).json("The view has been increased")
    } catch (err) {
        next(err)
    }
}
export const randomVideo = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }])
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}
export const trendVideo = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 })
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}
export const subscribeVideo = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const subncribedchannels = user.subscribedUsers
        const list = Promise.all(
            subncribedchannels.map(channelId => {
                return Video.find({ userId: channelId })
            })
        )
        res.status(200).json(list.flat()).sort((a,b)=>b.createdAt - a.createdAt)
    } catch (err) {
        next(err)
    }
}
export const getByTags = async (req, res, next) => {
    const tags = req.query.tags.split(",")
    try {
        const videos = await Video.find({tags:{$in:tags}}).limit(20)
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}
export const search = async (req, res, next) => {
    const query = req.query.q
    try {
        const videos = await Video.find({title:{$regex:query,$options:"i"}}).limit(40)
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}