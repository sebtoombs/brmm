const http = require("http");

const host = "127.0.0.1";
const port = +process.argv.slice(2).at(1) || 8000;

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end("My first server! " + port);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

process.on("SIGTERM", function () {
  console.log("Caught term signal");

  process.exit();
});

process.on("SIGINT", function () {
  console.log("Caught interrupt signal");

  process.exit();
});
