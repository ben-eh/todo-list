import express from 'express';
import TodosRouter from './src/routes/todos';

const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Use your todos router for requests to /api/todos
app.use('/api/todos', TodosRouter);

// Start the server
app.listen(port, () => {
		console.log(`Server running on http://localhost:${port}`);
});

export default app;