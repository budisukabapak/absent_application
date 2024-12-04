import * as fs from 'fs';
import * as path from 'path';
import { createConnection } from 'mysql2/promise';

async function runMigration() {
  const connection = await createConnection({
    host: 'localhost',
    user: 'absence_user',
    password: 'password',
    database: 'absence_db',
  });

  const adminMigrationPath = path.resolve(__dirname, '001-create-admin-schema.sql');
  const userMigrationPath = path.resolve(__dirname, '002-create-user-schema.sql');
  const absentMigrationPath = path.resolve(__dirname, '003-create-absent-schema.sql');
  const adminMigrationSQL = fs.readFileSync(adminMigrationPath, 'utf-8');
  const userMigrationSQL = fs.readFileSync(userMigrationPath, 'utf-8');
  const absentMigrationSQL = fs.readFileSync(absentMigrationPath, 'utf-8');

  try {
    await connection.query(adminMigrationSQL);
    await connection.query(userMigrationSQL);
    await connection.query(absentMigrationSQL);
    console.log('Migration executed successfully!');
  } catch (error) {
    console.error('Error executing migration:', error);
  } finally {
    await connection.end();
  }
}

runMigration();
