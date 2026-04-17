

// // Validations, Transformations

// const pattern = z.object({
//     name: z.string().toUpperCase(),
//     email: z.string().email(),
//     description: z.string().trim()
// });

// const result = pattern.parse({
//     name: "José",
//     email: "jose@gmail.com",
//     description: "  Alguma descrição com espaços para serem corrigidas com a função trim     "   
// });

// const resNum = z.object({
//     age: z.number().gte(18)
// })

// const result_num = resNum.parse({
//     age: 19
// })
// console.log(result_num);

import { intersection, z } from "zod";

// const pattern = z.object({
//     age: z.number({
//         error: 'Idade é obrigatória',
//         error: 'Idade precisa ser um número'
//     }).gte(18, 'Precisa ser maior de idade')
// });

// const result = pattern.parse({
//     age: 15
// });

// console.log(result);

//  ----- Intersection -------

// const person = z.object({
//     name: z.string(),
//     age: z.number()
// });

// const employee = z.object({
//     role: z.string()
// });

// const employePerson = person.and(employee);// ou assim: intersection(person, employee);

// const result = employePerson.parse({
//     name: "José Marques",
//     age: 90,
//     role: "DevOps"
// })
// console.log(result)


// ---- Union ----

const pattern = z.object({
    age: z.union([z.string(), z.number()]) // ou assim: z.string().or(z.number())
});

const result = pattern.parse({
    age: 90
})
console.log(result)
