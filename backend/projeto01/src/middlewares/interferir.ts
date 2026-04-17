import type { RequestHandler } from "express";


export const interferir: RequestHandler = (req, res, next) => {
    let logged = true;

    if (logged) {
        next();
    } else {
        res.status(403).json({ error: "Middleware não permitiu a requisição" });
    }    
}