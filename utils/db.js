// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-serverless';
// import * as schema from './schema';

// const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
// export const db = drizzle( sql ,{schema});
import { drizzle } from "drizzle-orm/neon-serverless";  
import { Pool } from "@neondatabase/serverless";  

// Initialize the NeonDB client
const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,  // Connection string from NeonDB
});

// Initialize Drizzle ORM with the NeonDB client
export const db = drizzle(pool);
console.log(pool.query);

