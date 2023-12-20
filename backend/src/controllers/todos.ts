import { Request, Response } from 'express';
import Database from '../database/database';
import { ObjectId } from 'mongodb';

export default class TodosController {

	getAllTodos = async (req: Request, res: Response, next: any) => {
		try {
			const todos = await Database.database().collection('todos').find({}).toArray();
			res.json({todos});
		} catch (error) {
			next(error);
		}
	}

	// createTodo = async (req: Request, res: Response, next: any) => {
	// 	try {
	// 		const { name } = req.body;
	// 		const insertResult = await Todo.create({ name });
	// 		res.json(insertResult);
	// 	}
	// }

	createTodo = async (req: Request, res: Response, next: any) => {
		try {
			const name = req.body.name;
			// create todo in db
			const insertResult = await Database.database().collection('todos').insertOne({ name, isCompleted: false });
			const eventOId = insertResult.insertedId;

			// send back event id
			res.send({ oId: eventOId })
		} catch (error) {
			next(error);
		}
	}

	deleteTodo = async (req: Request, res: Response, next: any) => {
		try {
			const oId = new ObjectId(req.params.id);
			const deleteResult = await Database.database().collection('todos').deleteOne({ _id: oId });
			res.json(deleteResult);
		} catch (error) {
			next(error);
		}
	}
	
}