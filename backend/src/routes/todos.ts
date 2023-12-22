import express from 'express';
import TodosController from '../controllers/todos';
import cors from 'cors';

const router = express.Router();
const controller = new TodosController();

router.options('*', cors());
router.use(cors());

// Get all todos
// GET /api/todos
router.get('/', controller.getAllTodos);

// Create a todo
// POST /api/todos
router.post('/', controller.createTodo);

// Update a todo
// PATCH /api/todos/:id
router.patch('/:id', controller.updateTodo);

// Delete a todo
// DELETE /api/todos/:id
router.delete('/:id', controller.deleteTodo);

export default router;