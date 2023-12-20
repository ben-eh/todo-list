import { Box, Paper, List, ListItem } from '@mui/material';
import styled from 'styled-components';
import { Header } from './components/Header';
import { AddTodoForm } from './components/AddTodoForm';
import React, { useEffect, useState } from 'react';
import { Todo as TodoType } from "./types/Todo";
import { TodoList } from './components/TodoList';
import axios from 'axios';

const MainPage = styled(Box)`
	box-sizing: border-box;
	padding: 2rem;
	height: 100vh;
	width: 100vw;
	background-color: #583461;
	display: flex;
	flex-direction: column;
	margin: 0;
	align-items: center;
`;

const App = () => {
	const BASE_URL = 'http://localhost:3001';
	const [todos, setTodos] = useState<TodoType[]>([]);

	useEffect(() => {
		fetchTodos();
	}, []);
	
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
			setTodos([...todos, { name, isCompleted: false, _id: todo.data.oId }]);
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

	// const createTodo = (name: string): TodoType => {
	// 	const newTodo = {
	// 		_id: uuidv4(),
	// 		name: name,
	// 		isCompleted: false
	// 	}
	// 	return newTodo;
	// }

	const updateTodoList = () => {

	}

	const updateTodoCheck = (id: string) => {
		try {
			const todo = todos.filter((todo) => todo._id === id)[0];
			todo.isCompleted = !todo.isCompleted;
			const newTodos = [...todos];
			const index = todos.indexOf(todo);
			newTodos[index] = todo;
			setTodos(newTodos);
		} catch (err) {
			alert('Could not update todo');
		}
	}

	return (
		<MainPage>
			<Header />
			<AddTodoForm addItem={addItem} />
			<TodoList
				todos={todos}
				onChecked={updateTodoCheck}
				deleteTodo={deleteTodo}
			/>
		</MainPage>
	);
}

export default App;