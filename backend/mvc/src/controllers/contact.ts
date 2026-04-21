import { RequestHandler } from 'express';
import { createContact, deleteContact, getContacts } from '../services/contact';

export const getContactsController: RequestHandler = async (req, res) => {
    let list = await getContacts();
    res.json({ contatos: list });
}

export const createContactController: RequestHandler = async (req, res) => {
    const { name } = req.body;
   if(!req.file || (req.file && !req.file.mimetype.includes('image'))) {
        return res.json({ error: 'Nenhuma imagem recebida.' });
   }

    if (!name || name.length < 2) {
        return res.json({ error: 'Nome precisa ter pelo menos 2 caracteres.' });
    }

    await createContact(name);

    res.status(201).json({ contato: name, photo: req.file.filename });
}

export const deleteContactConstroller: RequestHandler = async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.json({ error: 'Precisa mandar um nome para excluir.' });
    }

    await deleteContact(name as string);

    res.json({ contato: name });
}