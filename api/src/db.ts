import { Pool } from 'pg';
import ENV from './env';

const db = new Pool({
  connectionString: ENV.DB_URL,
});

export default db;

