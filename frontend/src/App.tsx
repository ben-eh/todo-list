import { Box, Paper, List, ListItem } from '@mui/material';
import styled from 'styled-components';
import { Header } from './components/Header';
import { AddTodoForm } from './components/AddTodoForm';
import React, { useEffect, useState } from 'react';
import { TodoType } from "./types/Todo";
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
			setTodos([...todos, { name, isCompleted: false, isPriority: false,_id: todo.data.oId }]);
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
			backendUpdateTodo (id, todo);
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
			backendUpdateTodo (id, todo);
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
		<MainPage>
			<Header />
			<AddTodoForm addItem={addItem} />
			<TodoList
				todos={todos}
				onChecked={updateTodoCheck}
				changePriority={updateTodoPriority}
				deleteTodo={deleteTodo}
			/>
		</MainPage>
	);
}

export default App;