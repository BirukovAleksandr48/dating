const express = require ('express');
const router = require('./server/router/index');
const cors = require ('cors');
const moment = require ('moment');
const errorHandler = require('./server/utils/errorHandler');
import http from 'http';
import socketServer from './socketServer'

const PORT = process.env.PORT || 3000;
const app = express();
const httpServer = http.createServer(app);

require("./server/config/mongoose");

app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use('/public', express.static('./src/public/img/'));
app.use(errorHandler);

process.env.NODE_ENV === 'development' && app.get('/images/*', (req, res) => {
    res.sendFile(`/var/www/html/${req.path}`);
});

httpServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

socketServer.listen(httpServer);
