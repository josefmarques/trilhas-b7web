import express from 'express'
import helmet from 'helmet'
import router from './routes/index.js'

const server = express();

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/', router);

server.listen(3000, () => {
    console.log('Server is running: http://localhost:3000');    
});
