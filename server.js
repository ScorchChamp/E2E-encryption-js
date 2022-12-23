import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 5000 });

let connections = [];

wss.on('connection', function connection(ws) {
  connections.push(ws);
  ws.on('message', (data) => {
    connections.forEach(connection => {
      connection.send(data.toString())
    })
  });
  ws.on('disconnect', () => {
    console.log("dc: " + ws)
  })
});