import { Router } from 'express';
import { createUser, createUsers, deleteUser, getAllUsers, getUserByEmail, updateUser } from '../services/user';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.get("/test", (req, res) => {
    res.json({ testado: true })
})

mainRouter.post("/user", async (req, res) => {

    // validar os dados recebidos

    const user = await createUser({
        name: 'Murilo2',
        email: 'murilo2@gmail.com',
        posts: {
            create: {
                title: 'Titulo de teste do Murilo',
                body: 'Corpo de teste do post do Murilo'
            }
        }
    });
    if (user) {
        res.status(201).json( { user });
    } else {
        res.status(500).json({ error: 'E-mail já cadastrado.'})
    }   
});

mainRouter.post('/users', async (requestAnimationFrame, res) => {
    const result = await createUsers([
        { name: 'João', email: 'joao@hotmail.com'},
        { name: 'João 2', email: 'joao@hotmail.com'},
        { name: 'Fulano', email: 'fulano@gmail.com'},
        { name: 'Ciclano', email: 'ciclano@hotmail.com'}
    ]);
    res.json({ count: result });
})

mainRouter.get('/users', async (req, res) => {
    const result = await getAllUsers();
    res.json({ result })
})

mainRouter.get('/user', async (req, res) => {
    const result = await getUserByEmail('magda.marques@gmail.com');
    res.json({ result})
})

mainRouter.put('/user', async (req, res) => {
    const result = await updateUser();
    res.json( result )
})

mainRouter.delete('/user', async (req, res) => {
    const result        = await deleteUser();
    res.json( result )
})