import { Router } from 'express';
import { usersTable } from '../db/schema.js';
import { db } from '../libs/drizzle.js';
import { eq, like } from 'drizzle-orm';
import { PgColumn } from 'drizzle-orm/pg-core';
import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';

const router = Router();

router.get('/ping', (req, res) => {
    res.json({ pong: true });
});

router.get('/user', async (req, res) => {
    const users = await db
    .select()
    .from(usersTable)
    .where(
        like(usersTable.email, 'murilo%')
    )

    res.json({ users });
})

router.post('/user', async (req, res) => {
    type UserInsert = typeof usersTable.$inferInsert;

    const newUser: UserInsert[] = [
        {
            name: 'José Marques',
            email: 'jmarques@gmail.com',
            age: 90
        },
        {
            name: 'Ana Marques',
            email: 'ana@gmail.com',
            age: 50
        },
        {
            name: 'JMarques',
            email: 'murilo@gmail.com',
            age: 20
        },
        {
            name: 'Magda Marques',
            email: 'magda@gmail.com',
            age: 80
        }
    ]        

    await db.insert(usersTable)
        .values(newUser)
        .onConflictDoNothing({ target: usersTable.email });

    
    // await db.insert(usersTable)
    //     .values(newUsers)
    //     .onConflictDoNothing({ target: usersTable.email });

    res.status(201).json({ error: null });
});

router.put('/user', async (req, res) => {
    //UPDATE tabela SET campo = valor WHERE id = 1
    await db
        .update(usersTable)
        .set({
            name: 'Ana Maria',
            age: 40
        })    
        .where(eq(usersTable.email, 'ana@gmail.com'));
    res.json({ error: null });
})

router.delete('/user', async (req, res) => {
    await db
        .delete(usersTable)
        .where(eq(usersTable.id, 1))
    res.json({ error: null });
});

export default router;
