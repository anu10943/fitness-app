import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}
