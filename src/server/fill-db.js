import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

async function queryDb(query) {
  try {
    const client = new pg.Client({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    });

    await client.connect();
    const res = await client.query(query);
    await client.end();
    return res.rows;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function populateDB() {
  await queryDb(
    "create table board (id serial primary key, name varchar, created_date timestamp with time zone default current_timestamp(0));"
  );
  await queryDb("insert into board (name) values ('test');");
}

populateDB();
