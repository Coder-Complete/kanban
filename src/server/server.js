import http from "http";

import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  try {
    const client = new pg.Client({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    });

    await client.connect();
    const res = await client.query("SELECT * FROM tasks");
    console.log(res);
    await client.end();
  } catch (error) {
    console.log(error);
  }
};

connectDb();

const hostname = "127.0.0.1";
const port = 5000;

const server = http.createServer((req, res) => {
  console.log("req received");
  console.log(req.url);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  if (req.url === "/" && req.method === "GET") {
    console.log("matched route");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "This is the home page" }));
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
