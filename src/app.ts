import cors from 'cors';
import express, { Application } from 'express';
const app: Application = express();

//import router
import globalErrorHandler from './app/middleware/globalErrorHandler';
import routes from './app/routes';

/* Middleware */
app.use(cors());
/* parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use('/api/v1', routes);

//global error handler
app.use(globalErrorHandler);

export default app;
