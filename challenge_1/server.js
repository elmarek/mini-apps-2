const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");

const router = jsonServer.router(path.join(__dirname, "./data/db.json"));

const static = path.join(__dirname, "/public/index.html");

const middlewares = jsonServer.defaults([static]);
server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});
