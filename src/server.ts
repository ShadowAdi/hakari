import express, { Request, Response } from "express";
import "./db/db.js";
const app = express()


const PORT = process.env.PORT

app.get(`/`, (req: Request, res: Response) => {
    return res.status(200).json({
        "message": `Server Started`
    })
})

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`)
})