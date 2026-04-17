import express from "express";
import { createContact,getContacts, deleteContact } from "../services/contacts.js";


const router = express.Router();

router.post('/contato', async (req, res) => {
    const { name } = req.body;
// teste
    if (!name || name.length < 2) {
        return res.json({ error: 'Nome precisa ter pelo menos dois caracteres'});
    }

    await createContact(name); 

    res.status(201).json({ contato: name})
});

router.get("/contatos", async (req, res) => {
    let list = await getContacts();
    res.json({ contatos: list });

});

router.delete('/contato', async (req, res) => {
    const { name } = req.query;

    if(!name) {
        return res.json({ error: 'Nome é obrigatório'});
    }

    await deleteContact(name as string);
    res.json({ contato: name });
});

export default router;