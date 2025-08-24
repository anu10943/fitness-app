import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const sqlPath = path.join(__dirname, '..', '..', 'migrations', 'init.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  console.log('Running migration...');
  await query(sql);
  console.log('Migration complete.');
  process.exit(0);
}
run().catch(err => {
  console.error(err);
  process.exit(1);
});
