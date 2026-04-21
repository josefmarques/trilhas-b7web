import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma"
import { start } from "repl";

export const createUser = async (data: Prisma.UserCreateInput) => {
    try {
        return await prisma.user.upsert({ 
            where: {
                email: data.email
            },
            update: {},
            create: data
        });
    } catch (error) {           
        return false;
    }   
}

export const createUsers = async (users: Prisma.UserCreateInput[]) => {
    try {
        return await prisma.user.createMany({
            data: users,
            skipDuplicates: true
        });
    } catch (error) {
        return false;
    }    
}

export const getAllUsers = async () => {
    let page = 5;
        let skip = page * 2;
    const users = await prisma.user.findMany({        
        skip: skip,
        take: 2
        // ordenado:
        // orderBy: {
        //     name: 'asc'
        // }

        // outro tipo de retorno:
        // where: {
        //     OR: [
        //         {
        //             email: {
        //                 endsWith: '@gmail.com'
        //             }
        //         },
        //         {
        //             name: {
        //                 startsWith: 'João'
        //             }
        //         }
        //     ]
        // },
        // select: {
        //     id: true,
        //     name: true,
        //     email: true,
        //     status: true
        // }
    });
    return users;
}

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            name: true
        }
    });
    return user;
}

export const updateUser = async () => {
    const updateUser = await prisma.user.update({
        where: {
            email: 'magda.marques@gmail.com'
        },
        data: {
            role: 'ADMIN'
        }
    })
    return updateUser;
}

export const deleteUser = async () => {
    const emailToDelete = 'murilo2@gmail.com';

    // 1. Deletamos todos os posts vinculados a esse e-mail primeiro
    await prisma.post.deleteMany({
        where: {
            author: { // Supondo que a relação no seu schema se chame 'author' ou 'user'
                email: emailToDelete
            }
        }
    });

    // 2. Agora o usuário está "livre" para ser deletado
    return await prisma.user.deleteMany({
        where: {
            email: emailToDelete
        }
    });
}














































