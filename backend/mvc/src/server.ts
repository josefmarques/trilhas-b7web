import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import router from './routes';
import passport from 'passport';
import { localStrategy } from './libs/passport-local';
import { bearerStrategy } from './libs/passport-bearer';
import { jwtStrategy } from './libs/passport-jwt';

const server = express();

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

passport.use(localStrategy);
passport.use(bearerStrategy);
passport.use(jwtStrategy);
server.use(passport.initialize());

server.use('/', router);

server.listen(3000, () => {
    console.log('Servidor rodando: http://localhost:3000/');
});