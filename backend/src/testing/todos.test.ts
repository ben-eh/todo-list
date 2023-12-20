import request from 'supertest';
import express from 'express';
import router from '../routes/todos'; // replace with the path to your todos.ts file

const app = express();
app.use(express.json());
app.use('/api/todos', router);

describe('POST /api/todos', () => {
  it('should create a new todo', async () => {
    const newTodo = { title: 'Test todo', completed: false };

    const res = await request(app)
      .post('/api/todos')
      .send(newTodo);

    expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveProperty('title', newTodo.title);
    // expect(res.body).toHaveProperty('completed', newTodo.completed);
		expect(res.body).toHaveProperty('oId');
  });
});