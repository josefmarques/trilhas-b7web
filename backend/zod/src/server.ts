import express from 'express';
import z from 'zod';
import { jsonplaceholderResponse } from './schema/jsonplaceholderResponse';


const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/ping', (req, res) => {
    res.json({ pong: true });    
})

server.post('/user', (req, res) => {
    const userSchema = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        age: z.number().min(18).max(120)
    })

    const result = userSchema.safeParse(req.body);
    if(!result.success) {
        return res.json({ error: 'Dados inválidos'})
    }
    
    const { name, email, age } = result.data;

    // Processo
    console.log('Processando...');
    console.log(name, email, age );
    
    res.status(201).json({ result: 'tudo ok!!!'});
})

server.get('/posts', async (req, res) => {
    const request = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await request.json();

    const result = jsonplaceholderResponse.safeParse(data);
    if(!result.success){
        return res.status(500).json({ error: 'Ocorreu um erro interno' });
    }

    // processar
    let totalPosts = result.data.length;
    res.json({ Total_de_posts: totalPosts});
});

server.listen(3001, () => {
    console.log('Rodando: http://localhost:3001/');
})