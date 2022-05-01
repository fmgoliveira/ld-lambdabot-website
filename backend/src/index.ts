import clientConnection from './client';
import './database';
import { Router } from 'express';
import apiRouter from './routes';
require('./utils/errorHandleSystem');

console.log(`Running in ${process.env.ENV} mode.`);
const router = Router();

router.use('/', apiRouter);

try {
  clientConnection.init();
} catch (err) {
  console.log(err);
}

module.exports = router;