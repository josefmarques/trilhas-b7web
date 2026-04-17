import express, { type RequestHandler } from 'express';
import produtosRouter from './produtos.js';
import voosRouter from './voos.js';
import { interferir } from '../middlewares/interferir.js';


const router = express.Router();

//router.use(interferir)

router.use('/produtos', produtosRouter);
router.use('/voos', voosRouter);

router.get("/ping", (req, res) => {    
    console.log("Executou o ping!");
    res.json({ pong: true });
});


router.get('/', (req, res) => {
    console.log('PARAMS', req.params);
    console.log('QUERY', req.query);
    console.log('BODY', req.body);
    const name = "José Marques";
    const idade = 90;
    res.json({
        nome: name,
        idade: idade
    });
});



export default router;