import express from 'express';


const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/ping', (req, res) => {
    res.json({ pong: true });    
})

server.post('/user', (req, res) => {
    const { name, email, age } = req.body;

    // Processo
    console.log('Processando...');
    console.log(name, email, age );
    
    res.status(201).json({ result: 'tudo ok!!!'});
})

server.listen(3001, () => {
    console.log('Rodando: http://localhost:3001/');
})