import express, { Request, Response } from "express";
import { AppConnect } from "./config/AppConfig.js";
const app = express()


app.get(`/`, (req: Request, res: Response) => {
    return res.status(200).json({
        "message": `Server Started`
    })
})

AppConnect(app)