import express, { Request, Response } from "express";
import { PORT } from "./config/DotenvConfig.js";
import { AppConnect } from "./config/AppConfig.js";
const app = express()


app.get(`/`, (req: Request, res: Response) => {
    return res.status(200).json({
        "message": `Server Started at Port ${PORT}`
    })
})

AppConnect(app)