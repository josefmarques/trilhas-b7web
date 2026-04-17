import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import bcrypt from 'bcrypt';
import { users, categories, products, moves } from './schema/index.js';
import { eq } from 'drizzle-orm';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
}

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

const daysAgo = (n: number) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

async function seed() {
    console.log('🌱 Iniciando seed...');

    // Verifica se já foi populado
    const existingAdmin = await db.select().from(users).where(eq(users.email, 'admin@b7estoque.com')).limit(1);
    if (existingAdmin.length > 0) {
        console.log('✅ Banco já populado. Pulando seed.');
        await client.end();
        return;
    }

    // Usuários
    const passwordHash = await bcrypt.hash('123456', 10);

    const [admin] = await db.insert(users).values([
        {
            name: 'Admin',
            email: 'admin@b7estoque.com',
            password: passwordHash,
            isAdmin: true,
        },
        {
            name: 'Usuário',
            email: 'usuario@b7estoque.com',
            password: passwordHash,
            isAdmin: false,
        },
    ]).returning();

    console.log('✅ Usuários criados');

    // Categorias
    const [catAlimentos, catBebidas, catHigiene, catLimpeza] = await db.insert(categories).values([
        { name: 'Alimentos' },
        { name: 'Bebidas' },
        { name: 'Higiene e Beleza' },
        { name: 'Limpeza' },
    ]).returning();

    console.log('✅ Categorias criadas');

    // Produtos
    // quantity = estoque inicial (entrada)
    // outTotal = total de saídas → quantidade final = quantity - outTotal
    //
    // Estoque baixo (quantity final <= minimumQuantity * 1.1):
    //   idx 1 — Feijão:      final=4,  min=5  → 4 <= 5.5  ✓
    //   idx 3 — Refrigerante: final=9,  min=12 → 9 <= 13.2 ✓
    //   idx 6 — Detergente:  final=11, min=15 → 11 <= 16.5 ✓
    //
    // Estagnados (sem nenhuma saída):
    //   idx 5 — Shampoo 400ml
    //   idx 7 — Água Sanitária 1L
    const produtosData = [
        // idx 0 — normal
        { name: 'Arroz 5kg',          categoryId: catAlimentos.id, unitPrice: 2490, unitType: 'un' as const, quantity: '50',  minimumQuantity: '10', maximumQuantity: '100', outTotal: 15 },
        // idx 1 — estoque baixo
        { name: 'Feijão 1kg',         categoryId: catAlimentos.id, unitPrice: 799,  unitType: 'un' as const, quantity: '30',  minimumQuantity: '5',  maximumQuantity: '60',  outTotal: 26 },
        // idx 2 — normal
        { name: 'Água Mineral 500ml', categoryId: catBebidas.id,   unitPrice: 150,  unitType: 'un' as const, quantity: '120', minimumQuantity: '24', maximumQuantity: '200', outTotal: 30 },
        // idx 3 — estoque baixo
        { name: 'Refrigerante 2L',    categoryId: catBebidas.id,   unitPrice: 699,  unitType: 'un' as const, quantity: '48',  minimumQuantity: '12', maximumQuantity: '100', outTotal: 39 },
        // idx 4 — normal
        { name: 'Sabonete em Barra',  categoryId: catHigiene.id,   unitPrice: 299,  unitType: 'un' as const, quantity: '80',  minimumQuantity: '20', maximumQuantity: '150', outTotal: 20 },
        // idx 5 — estagnado (sem saídas)
        { name: 'Shampoo 400ml',      categoryId: catHigiene.id,   unitPrice: 1290, unitType: 'un' as const, quantity: '25',  minimumQuantity: '10', maximumQuantity: '60',  outTotal: 0  },
        // idx 6 — estoque baixo
        { name: 'Detergente 500ml',   categoryId: catLimpeza.id,   unitPrice: 249,  unitType: 'un' as const, quantity: '60',  minimumQuantity: '15', maximumQuantity: '120', outTotal: 49 },
        // idx 7 — estagnado (sem saídas)
        { name: 'Água Sanitária 1L',  categoryId: catLimpeza.id,   unitPrice: 399,  unitType: 'un' as const, quantity: '20',  minimumQuantity: '8',  maximumQuantity: '50',  outTotal: 0  },
    ];

    // Insere produtos com a quantidade final (inicial - saídas)
    const produtosCriados = await db.insert(products).values(
        produtosData.map(({ outTotal, ...p }) => ({
            ...p,
            quantity: String(Number(p.quantity) - outTotal),
        }))
    ).returning();

    console.log('✅ Produtos criados');

    // Entradas iniciais (30 dias atrás)
    await db.insert(moves).values(
        produtosData.map((p, i) => ({
            productId: produtosCriados[i].id,
            userId: admin.id,
            type: 'in' as const,
            quantity: p.quantity,
            unitPrice: produtosCriados[i].unitPrice,
            createdAt: daysAgo(30),
        }))
    );

    console.log('✅ Entradas iniciais criadas');

    // Saídas espalhadas pelos últimos 28 dias
    // idx 5 (Shampoo) e idx 7 (Água Sanitária) sem saídas → aparecerão como estagnados
    // [produtoIndex, quantidade, diasAtras]
    const saidasSpec: [number, number, number][] = [
        [0, 3, 28], [2,  8, 28],
        [1, 8, 25], [3, 10, 25],
        [4, 7, 22], [6, 13, 22],
        [0, 4, 19],
        [2,10, 16], [3, 10, 16],
        [1, 8, 13], [6, 13, 10],
        [4, 8, 10],
        [0, 5,  8],
        [2,12,  6], [3, 10,  6],
        [1, 8,  4], [4,  5,  4],
        [6,13,  3],
        [0, 3,  2],
        [1, 2,  1], [3,  9,  1], [6, 10, 1],
    ];

    await db.insert(moves).values(
        saidasSpec.map(([idx, qty, dias]) => ({
            productId: produtosCriados[idx].id,
            userId: admin.id,
            type: 'out' as const,
            quantity: String(qty),
            unitPrice: produtosCriados[idx].unitPrice,
            createdAt: daysAgo(dias),
        }))
    );

    console.log('✅ Saídas criadas');
    console.log('');
    console.log('🎉 Seed concluído!');
    console.log('   Admin:   admin@b7estoque.com   / 123456');
    console.log('   Usuário: usuario@b7estoque.com / 123456');
    console.log('');
    console.log('   Estoque baixo:  Feijão 1kg, Refrigerante 2L, Detergente 500ml');
    console.log('   Estagnados:     Shampoo 400ml, Água Sanitária 1L');

    await client.end();
}

seed().catch((err) => {
    console.error('Erro no seed:', err);
    process.exit(1);
});
