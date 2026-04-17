import { z } from 'zod';

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    age: z.number().min(18).max(120),
    status: z.boolean(),
    characteristics: z.array(
        z.object({
            name: z.string(),
            value: z.number()
        })
    )
});

type User = z.infer<typeof schema>;

let data: User = {
    name: "Jose",
    email: "suporte@diariodeestudos.com.br",
    age: 80,
    status: true,
    characteristics: []
};

const result = schema.safeParse(data);
console.log(result);


