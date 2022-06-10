import { Client, Pool } from 'pg';
import * as db from 'zapatos/db';

const con = new Pool({
  user: "root",
  port: +process.env.__TESTCONTAINERS_COCKROACH_PORT_26257__,
  host: process.env.__TESTCONTAINERS_COCKROACH_IP__,
  database: "defaultdb",

  log: console.log,
  min: 3,
  max: 3,
  // testOnReturn: false,
  connectionTimeoutMillis: 1000 * 60 * 10,
  idleTimeoutMillis: 1000 * 60 * 10,
  application_name: 'test name',
})

describe('Demonstrate transaction failure', () => {
  beforeAll(async () => {
  });

  afterAll(async () => {
    await con.end();
  });

  test('should run multiple separate statements on a single connection', async () => {
    // Insert some records into the table
    const records = [...new Array(10)].map((_, i) => ({
      id: i,
      name: `name-${i}`,
    }));
    const varString = records.map(r => `(${r.id}, '${r.name}')`).join(', ');
    const insert = `-- INSERT INTO test_table (id, name) VALUES `;
    await db.sql`insert into test_table (id, name) values (${db.param(1)}, ${db.param('test')})`.run(con)



    // Try to run an export
    await db.sql`export into csv 'userfile:///test.csv' from select * from test_table where name = ${db.param('test')};`.run(con);
  })
})
