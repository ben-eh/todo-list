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

	updateTodo = async (req: Request, res: Response, next: any) => {
		try {
			const todo = req.body.updatedTodo;
			const { _id, ...updateFields } = todo;
			const oId = new ObjectId(_id);
			const updateResult = await Database.database().collection('todos').updateOne({ _id: oId }, { $set: updateFields });
			res.json(updateResult);
		} catch (error) {
			next(error);
		}
	}

	createTodo = async (req: Request, res: Response, next: any) => {
		try {
			const name = req.body.name;
			// create todo in db
			const insertResult = await Database.database().collection('todos').insertOne({ name, isCompleted: false, isPriority: false });
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