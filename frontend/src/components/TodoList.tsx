import { Box, Checkbox, List, ListItem, Typography, Paper } from "@mui/material";
import { TodoType } from "../types/Todo";
import { Todo as TodoComponent } from './Todo'
import styled from 'styled-components';
import { useEffect, useState } from "react";

const Layout = styled(Paper)`
	display: flex;
	justify-content: center;
	margin-top: 3rem;
	width: 70vw;
`;




type Props = {
	todos: TodoType[];
	onChecked: (id: string) => void;
	deleteTodo: (id: string) => void;
}

export const TodoList = ({ todos, onChecked, deleteTodo }: Props) => {
	const [priorityTodos, setPriorityTodos] = useState<TodoType[]>([]);
	const [normalTodos, setNormalTodos] = useState<TodoType[]>([]);
	const [completedTodos, setCompletedTodos] = useState<TodoType[]>([]);

	useEffect(() => {
		sortTodos(todos);
	}, []);
	
	const todosExist = todos.length > 0;

	
	const sortTodos = (todos: TodoType[]) => {
		todos.map((todo) => {
			if (todo.isCompleted === true) {
				setCompletedTodos([...completedTodos, todo]);
			} else if (todo.isPriority === true) {
				setPriorityTodos([...priorityTodos, todo]);
			}
		});
	}
	
	return (
		<Layout>
			{todosExist ? (
				<Box>
					<List>
						{todos.map((todo) => (
							<TodoComponent
								key={todo._id}
								todo={todo}
								onChecked={onChecked}
								deleteTodo={deleteTodo}
							/>
						))}
					</List>
				</Box>
			)
				: (
					<Typography
						variant="h4"
					>
						No items yet in list
					</Typography>
				)}
		</Layout>

	)
}