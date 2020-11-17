import express from 'express';
import http from 'http';

import router from './router';

const app: express.Application = express();
const port: string | number = process.env.PORT || 3000;

app.use('/', router);

var server = http.createServer(app);

server.listen(port, () => {
    console.log('Server is starting = ' + port);
});