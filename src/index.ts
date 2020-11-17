import express from 'express';
import http from 'http';

const app: express.Application = express();
const port: string | number = process.env.PORT || 3000;

app.get('/', (req: express.Request, res: express.Response) => {
    res.send("Hello");
});

var server = http.createServer(app);

server.listen(port, () => {
    console.log('Server is starting = ' + port);
});