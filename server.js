import mongoose from "mongoose"
import app from "./src/app/app.js"

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("DB is connet"))
.catch(err =>console.log(err.message))

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "Something went wrong!"
    return res.status(status).json({
        success:false,
        status,
        message,
    })
})

app.listen(process.env.PORT,()=>console.log("Connect at",process.env.PORT))