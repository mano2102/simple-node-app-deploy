const express = require("express")
const app = express()
require("dotenv").config()
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const connectDB = require("../config/db")


connectDB()
app.use(express.json());
app.use((err,req, res, next) => {
    console.error(`${req.method} ${req.url}`)
    console.log(`Error: ${err}`)
    next()
})
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/auth", authRoutes)


const PORT = process.env.PORT | 3000;

const LOCALHOSTURL = process.env.LOCALHOST_URL

app.listen(PORT, () => {
    console.log(`App is running in the URL: ${LOCALHOSTURL}`)
})