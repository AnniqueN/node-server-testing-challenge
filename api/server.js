const express = require('express');
const helmet = require('helmet')
const cors = require('cors');


const studentsRouter = require('../students/student-router.js');
const authRouter = require('../auth/auth-router.js');


const server = express();


server.use(helmet());
server.use(express.json());
server.use(cors());
server.use('/api', studentsRouter);// where you url is housed
server.use('/api/auth', authRouter);//base route

module.exports = server;// remember to export!