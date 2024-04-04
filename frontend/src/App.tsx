import { Box, Paper, List, ListItem, Grid } from '@mui/material';
import styled from 'styled-components';
import { Header } from './components/Header';
import { AddTodoForm } from './components/AddTodoForm';
import React, { useEffect, useState } from 'react';
import { TodoType } from "./types/Todo";
import { TodoList } from './components/TodoList';
import axios from 'axios';
import { SortedTodos } from './types/SortedTodos';
import { getBaseURL } from './getBaseURL'

const BASE_URL = getBaseURL();

const App = () => {
	// const BASE_URL = 'http://localhost:3001';
	const [todos, setTodos] = useState<TodoType[]>([]);
	const [sortedTodos, setSortedTodos] = useState<SortedTodos>({} as SortedTodos);

	useEffect(() => {
		fetchTodos();
	}, []);

	useEffect(() => {
		setSortedTodos({
			priorityTodos: todos.filter((todo) => todo.isPriority === true && !todo.isCompleted),
			normalTodos: todos.filter((todo) => todo.isPriority === false && !todo.isCompleted),
			completedTodos: todos.filter((todo) => todo.isCompleted)
		});
	}, [todos]);

	const fetchTodos = async () => {
		try {
			const response = await axios.get(`${BASE_URL}/api/todos`);
			setTodos(response.data.todos);
		} catch (err) {
			alert("Could not fetch todos...");
		}
	}

	const addItem = async (name: string) => {
		try {
			const todo = await axios.post(`${BASE_URL}/api/todos`, { name }, {
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-store'
				}
			});
			setTodos([...todos, { name, isCompleted: false, isPriority: false, _id: todo.data.oId }]);
		} catch (err) {
			alert("Could not create todo...");
		}
	};

	const deleteTodo = async (id: string) => {
		try {
			await axios.delete(`${BASE_URL}/api/todos/${id}`);
			const newTodos = todos.filter((todo) => todo._id !== id);
			setTodos(newTodos);
		} catch (err) {
			alert('Could not delete todo');
		}
	}

	const updateTodoPriority = async (id: string) => {
		try {
			const todo = todos.filter((todo) => todo._id === id)[0];
			todo.isPriority = !todo.isPriority;
			const newTodos = [...todos];
			const index = todos.indexOf(todo);
			newTodos[index] = todo;
			setTodos(newTodos);
			backendUpdateTodo(id, todo);
		} catch (err) {
			alert('Could not update todo');
		}
	}

	const updateTodoCheck = async (id: string) => {
		try {
			const todo = todos.filter((todo) => todo._id === id)[0];
			todo.isCompleted = !todo.isCompleted;
			const newTodos = [...todos];
			const index = todos.indexOf(todo);
			newTodos[index] = todo;
			setTodos(newTodos);
			backendUpdateTodo(id, todo);
		} catch (err) {
			alert('Could not update todo');
		}
	}

	const backendUpdateTodo = async (id: string, todo: TodoType) => {
		try {
			const updatedTodo = todos.filter((todo) => todo._id === id)[0];
			const todoID = await axios.patch(`${BASE_URL}/api/todos/${id}`, { updatedTodo }, {
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-store'
				}
			});
		} catch (err) {
			alert('Could not update todo');
		}
	}

	// const setIsEditing = async (todo: TodoType, updatedName: string) => {
	//   if (editingTodo) {
	//     const newTodo: TodoType = {
	//       ...todo,
	//       name: updatedName,
	//     };
	//     await updateTodoList(newTodo);
	//     setEditingTodo(undefined);
	//     return;
	//   }
	//   setEditingTodo(todo);
	// };

	// const updateTodoList = async (newTodo: TodoType) => {
	//   const found = todos.filter((todo) => todo._id === newTodo._id)[0];
	//   const updatedTodo = await updateTodo(newTodo._id, newTodo);
	//   const index = todos.indexOf(found);
	//   const newTodos = [...todos];
	//   newTodos[index] = updatedTodo;
	//   setTodos(newTodos);
	// };

	return (
		<Grid
			container
			direction="column"
			style={{ backgroundColor: 'blue', minHeight: '100vh' }}
		>
			{/* this would be the navbar */}
			<Grid
				container
				justifyContent="center"
				style={{ backgroundColor: 'orange' }}
			>
				<Grid
					item
					xs={4}
					style={{ backgroundColor: 'brown' }}
				>
					<div></div>
				</Grid>
				<Grid
					item
					xs={4}
					style={{ backgroundColor: 'purple' }}
				>
					<div>TODO APP</div>
				</Grid>
				<Grid
					item
					xs={4}
					style={{ backgroundColor: 'green' }}
				>
					<div>testing</div>
				</Grid>
			</Grid>
			{/* add item - not full size but needs to be on its own */}
			<Grid
				container
				justifyContent="center"
				style={{ backgroundColor: 'pink' }}
			>
				<Grid
					item
					xs={12}
					sm={6}
					lg={4}
					xl={3}
					style={{ backgroundColor: 'beige' }}
				>
					<AddTodoForm addItem={addItem} />
				</Grid>
			</Grid>
			{/* container for all todos */}
			<Grid
				container
				style={{ backgroundColor: 'green' }}
				justifyContent="center"
			>
				{/* priorities and normal todos TOGETHER- not full size except mobile */}
				<Grid
					container
					item
					direction="column"
					// alignItems="center"
					xs={12}
					sm={5}
					md={6}
					lg={4}
					style={{ backgroundColor: 'cyan' }}
				>
					<Grid
					item
					>
						<TodoList
							header={'Priorities'}
							todos={todos.filter((todo) => todo.isPriority === true && todo.isCompleted === false)}
							onChecked={updateTodoCheck}
							changePriority={updateTodoPriority}
							deleteTodo={deleteTodo}
						/>
					</Grid>
					<Grid item>
						<TodoList
							header={'Todos'}
							todos={todos.filter((todo) => todo.isPriority === false && todo.isCompleted === false)}
							onChecked={updateTodoCheck}
							changePriority={updateTodoPriority}
							deleteTodo={deleteTodo}
						/>
					</Grid>
				</Grid>
				<Grid
					container
					item
					direction="column"
					// alignItems="center"
					xs={12}
					sm={5}
					md={6}
					lg={4}
					style={{ backgroundColor: 'brown' }}
				>
					<Grid
						item
					>
						<TodoList
							header={'Completed'}
							todos={todos.filter((todo) => todo.isCompleted === true)}
							onChecked={updateTodoCheck}
							changePriority={updateTodoPriority}
							deleteTodo={deleteTodo}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default App;