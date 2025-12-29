import express, { Request, Response } from "express";

const app = express()


const PORT = process.env.PORT

app.get(`/`, (req: Request, res: Response) => {
    return res.status(200).json(`
        Server Started`)
})

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`)
})