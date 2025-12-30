import express, { Request, Response } from "express";
import "./db/db.js";
import { PORT } from "./config/DotenvConfig.js";
const app = express()


app.get(`/`, (req: Request, res: Response) => {
    return res.status(200).json({
        "message": `Server Started at Port ${PORT}`
    })
})

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`)
})