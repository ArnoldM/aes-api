import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection } from 'typeorm';

// remove test database before each test
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {}
});

// shut down db connection as db has been removed
global.afterEach(async () => {
  const conn = await getConnection();
  await conn.close();
});
