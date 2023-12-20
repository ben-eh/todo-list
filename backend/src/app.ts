import express, { json } from 'express';
// import cors from 'cors';
import todoRouter from './routes/todos';

const cors = require('cors');
const app = express();

// Middleware
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(json());

// Routes
app.use('/api/todos', todoRouter);

// Export to use
export default app;