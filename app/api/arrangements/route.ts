import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!process.env.TURSO_DATABASE_URL) {
    return Response.json([]);
  }

  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS arrangements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price_label TEXT NOT NULL,
        image_gradient TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `);

    const { rows } = await db.execute('SELECT * FROM arrangements ORDER BY created_at DESC');

    if (rows.length === 0) {
      const defaultArrangements = [
        {
          name: 'Elegancia Clásica',
          description: 'Rosas rojas, lirios blancos y follaje verde',
          price_label: 'Desde $89.000',
          image_gradient: 'from-rose-200 via-red-100 to-green-100',
        },
        {
          name: 'Primavera Moderna',
          description: 'Peonías coral, ranúnculos y gramíneas',
          price_label: 'Desde $125.000',
          image_gradient: 'from-pink-200 via-coral-100 to-amber-100',
        },
        {
          name: 'Pasión Tropical',
          description: 'Heliconias, orquídeas y hojas de palmera',
          price_label: 'Desde $98.000',
          image_gradient: 'from-orange-200 via-yellow-100 to-green-200',
        },
        {
          name: 'Serenidad Blanca',
          description: 'Rosas blancas, hortensias y eucalipto',
          price_label: 'Desde $110.000',
          image_gradient: 'from-gray-100 via-white to-green-50',
        },
        {
          name: 'Romance de Jardín',
          description: 'Mix de flores silvestres y lavanda',
          price_label: 'Desde $85.000',
          image_gradient: 'from-purple-100 via-pink-100 to-violet-100',
        },
        {
          name: 'Atardecer Dorado',
          description: 'Girasoles, crisantemos y solidago',
          price_label: 'Desde $92.000',
          image_gradient: 'from-yellow-200 via-amber-100 to-orange-100',
        },
      ];

      for (const arr of defaultArrangements) {
        await db.execute({
          sql: 'INSERT INTO arrangements (name, description, price_label, image_gradient) VALUES (?, ?, ?, ?)',
          args: [arr.name, arr.description, arr.price_label, arr.image_gradient],
        });
      }

      const { rows: newRows } = await db.execute('SELECT * FROM arrangements ORDER BY created_at DESC');
      return Response.json(newRows);
    }

    return Response.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ error: 'Failed to fetch arrangements' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!process.env.TURSO_DATABASE_URL) {
    return Response.json({ error: 'Database not configured' }, { status: 503 });
  }

  try {
    const body = await req.json();

    await db.execute({
      sql: 'INSERT INTO arrangements (name, description, price_label, image_gradient) VALUES (?, ?, ?, ?)',
      args: [body.name, body.description ?? null, body.price_label, body.image_gradient ?? null],
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ error: 'Failed to create arrangement' }, { status: 500 });
  }
}
