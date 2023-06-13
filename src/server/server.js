import http from "http";

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

const hostname = "127.0.0.1";
const port = 5000;

const server = http.createServer(async (req, res) => {
  console.log("req received");
  console.log(req.url);
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "*"); // https://stackoverflow.com/questions/9459949/access-control-allow-origin-not-working
  if (req.url === "/" && req.method === "GET") {
    console.log("matched route");
    let rows = await queryDb("select * from tasks;");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(rows));
    res.end();
  } else if (req.url === "/api" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "This is the API" }));
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
