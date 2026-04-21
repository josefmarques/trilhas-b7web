// Criar funções para:
// adicionar um novo contato
// listar todos os contatos
// pegar um contato específico
// deletar todos os contatos
import * as ContactModel from '../models/contact';

export const getContacts = async () => {
    const list = await ContactModel.getContacts();
    return list;
}

export const createContact = async (name: string) => {
    await ContactModel.createContact(name);
}

export const deleteContact = async (name: string) => {
    await ContactModel.deleteContact(name);
}
