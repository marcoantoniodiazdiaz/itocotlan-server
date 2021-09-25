import Server from './classes/server';
// 
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

// Childs
import router from './routes/router';
import activities from './routes/activities.routes';
import admins from './routes/admins.routes';
import careers from './routes/careers.routes';
import categories from './routes/categories.routes';
import inscriptions from './routes/inscriptions.routes';
import programs from './routes/programs.routes';
import students from './routes/students.routes';

// Server instance
const server = Server.instance;

// BodyParser 
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({ origin: true, credentials: true }));

server.app.use('/', (express.static('public', { redirect: false })));

// Rutas de servicios
server.app.use('/api', router);
server.app.use('/api', activities);
server.app.use('/api', admins);
server.app.use('/api', careers);
server.app.use('/api', categories);
server.app.use('/api', inscriptions);
server.app.use('/api', programs);
server.app.use('/api', students);

server.start(() => {
    console.log(`✅  Server online in port ${server.port}`);
});


