import { Router } from 'express';
import { petsTable, postsTable, usersTable } from '../db/schema.js';
import { db } from '../libs/drizzle.js';
import { eq, sql, like, desc, name } from 'drizzle-orm';
import { PgColumn } from 'drizzle-orm/pg-core';
import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';
import { email } from 'zod';

const router = Router();

router.get('/ping', (req, res) => {
    res.json({ pong: true });
});

router.post('/post', async (req, res) => {
    await db.insert(postsTable).values({
        title: 'Título de teste',
        body: 'Corpo de teste',
        ownerId: 2
    })
    res.status(201).json({ error: null });
})

router.get('/user', async (req, res) => {
    const users = await db
        // .select({
        //     name: usersTable.name,
        //     email: usersTable.email,
        //     id: usersTable.id
        // })
        // .from(usersTable)
        // .orderBy(desc(usersTable.name))

        .select({
            id: usersTable.id,
            name: usersTable.name,
            petName: petsTable.name,
            petId: petsTable.id
        })
        .from(usersTable)
        .innerJoin(petsTable, eq(usersTable.id, petsTable.ownerId))

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
            name: 'Murilo César',
            email: 'murilo@gmail.com',
            age: 20
        },
        {
            name: 'Magda Marques',
            email: 'magda@gmail.com',
            age: 80
        },
        {
            name: 'Daniel Souza',
            email: 'daniel.souza@hotmail.com',
            age: 90
        },
        {
            name: 'Joaquina Maria',
            email: 'joaquina@outlook.com',
            age: 50
        },
        {
            name: 'Carlos Marques',
            email: 'murilo.marques@ig.com',
            age: 20
        },
        {
            name: 'Joana Alves',
            email: 'joana.alves@terra.com',
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
            email: 'carlos@ig.com'
        })
        .where(eq(usersTable.email, 'murilo.marques@ig.com'));
    res.json({ error: null });
})

router.delete('/user', async (req, res) => {
    await db
        .delete(usersTable)
        .where(eq(usersTable.id, 1))
    res.json({ error: null });
});

const transfer = async (valor: number, userFrom: number, userTo: number) => {
    await db.transaction(async (tx) => {
        const [ account ] = await tx
        .select({ balance: usersTable.balance })
        .from(usersTable)
        .where(eq(usersTable.id, userFrom));
    
    if(account.balance && account.balance < valor) {
        tx.rollback();        
    }

    await tx
        .update(usersTable)
        .set({ balance: sql`${usersTable.balance} - ${valor}` })
        .where(eq(usersTable.id, userFrom))
    await tx
        .update(usersTable)
        .set({ balance: sql`${usersTable.balance} + ${valor}` })
        .where(eq(usersTable.id, userTo))
    })
    
}

router.post('/deposit', async (req, res) => {
    await transfer(35, 14, 16);
    res.json({ error: null });
});


export default router;
