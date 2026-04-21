import { RequestHandler } from 'express';
import { ping } from '../services/ping';

export const pingController: RequestHandler = async (req, res) => {
    const result = ping();
    res.json(result);
}
