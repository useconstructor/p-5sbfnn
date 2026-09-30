import { createClient, Client } from '@libsql/client';

let _db: Client | null = null;

export const db = {
  get client() {
    if (!_db) {
      const url = process.env.TURSO_DATABASE_URL;
      const authToken = process.env.TURSO_AUTH_TOKEN;

      if (!url) {
        throw new Error('TURSO_DATABASE_URL is not set');
      }

      _db = createClient({
        url,
        authToken,
      });
    }
    return _db;
  },

  execute: async (query: string | { sql: string; args: unknown[] }) => {
    return db.client.execute(query as Parameters<Client['execute']>[0]);
  },
};
