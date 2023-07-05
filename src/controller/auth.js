import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


import { createError } from "../expection/expection.js"

export const signup = async (req, res, next) => {
    try {
        let newUser = new User(req.body)
        const salt = bcrypt.genSaltSync(10)
        newUser.password = bcrypt.hashSync(newUser.password, salt)
        await newUser.save()
        res.status(201).send("User has been created!")
    } catch (err) {
        next(err)
    }
}

export const signin = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) return next(createError(404, "User not found!"))
        let pass = bcrypt.compareSync(req.body.password, user.password)
        if (!pass) return next(createError(404, "wrong Credentials!"))
        const { password, ...users } = user._doc
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email
        },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "3d"
            })
          res.cookie("access_token",token,{
            httpOnly:true
          }).status(200)
          .json(users) 
    } catch (err) {
        next(err)
    }
}