
var http = require('http');
var url = require('url');
var fs = require('fs');
let Todo = require('./controller');
let { getReqData } = require('./utils');
// const { json } = require('node:stream/consumers');
// const { json } = require('stream/consumers');


http.createServer(async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET,PUT",
    "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers too */
  };
  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end('working??');
    return;
  }
  if (req.url === "/api/todos" && req.method === "GET") {
    const tODo = await new Todo().getTodos();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(tODo));
    res.end();
  } else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
    try {
      const id = req.url.split("/")[3];
      const toDo = await new Todo().getTodo(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(toDo));
      res.end();
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ 'message': 'error' }));
    }
  } else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'DELETE') {
    const id = req.url.split("/")[3];
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader(("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS"))
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
    res.writeHead(200, { "Content-Type": "application/json" });
    await new Todo().deleteTodo(id);
    let toDo = res.write(JSON.stringify(toDo));
    res.end('completed');
  } else if (req.url === "/api/todos" && req.method === "POST") {
    let todo_Data = await getReqData(req);
    let todo = await new Todo().createTodo(todo_Data);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end();
  }
  else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "PUT") {
    //  let todoId=req.url.split("/")[3];
    res.setHeader("Content-Type", "application/json");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT,OPTIONS')
    res.setHeader('Access-Control-Max-Age', '86400');
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    let todo_Data = await getReqData(req);
    let todo = await new Todo().updateTodo(todo_Data);
    res.writeHead(200,
      {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin" : "http://localhost:5173",
        // "Access-Control-Allow-Credentials" : "true",
        // "Access-Control-Allow-Methods" : "PUT, OPTIONS",
        // "Access-Control-Allow-Headers" : "Origin, Content-Type, Accept"
      }
    );
    res.end(JSON.stringify(todo));
  }
  else {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ 'message': 'error' }));
  }

}).listen(8080);



