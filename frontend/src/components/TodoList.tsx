import { Box, Checkbox, List, ListItem, Typography, Paper } from "@mui/material";
import { TodoType } from "../types/Todo";
import { Todo as TodoComponent } from './Todo'
import styled from 'styled-components';
import { useEffect, useState } from "react";
import { SortedTodos } from "../types/SortedTodos";

const Layout = styled(Paper)`
	display: flex;
	justify-content: center;
	margin-top: 3rem;
	width: 70vw;
`;

const BoxMain = styled(Box)`
	background: orange;
	display: flex;
	justify-content: space-around;
	width: 100%;
	height: 65vh;
`;

const UndoneBox = styled(Box)`
`
	
const CompletedBox = styled(Box)`
`

const Box1 = styled(Box)`
	background: pink;
`

const Box2 = styled(Box)`
	background: blue;
`

type Props = {
	todos: TodoType[];
	sortedTodos: SortedTodos;
	onChecked: (id: string) => void;
	changePriority: (id: string) => void;
	deleteTodo: (id: string) => void;
}

export const TodoList = ({ todos, onChecked, sortedTodos, changePriority, deleteTodo }: Props) => {
	const priorityTodos = sortedTodos.priorityTodos;
	const completedTodos = sortedTodos.completedTodos;
	const normalTodos = sortedTodos.normalTodos;

	const todosExist = todos.length > 0;


	return (
		<Layout>
				<BoxMain>
					<UndoneBox>
						<Box1>
							<h3>Priorities</h3>
							<List>
								{priorityTodos && priorityTodos.map((todo) => (
									<TodoComponent
										todo={todo}
										key={todo._id}
										onChecked={onChecked}
										changePriority={changePriority}
										deleteTodo={deleteTodo}
									/>
								))}
							</List>
						</Box1>
						<Box2>
							<h3>Todos</h3>
							<List>
								{normalTodos && normalTodos.map((todo) => (
									<TodoComponent
										todo={todo}
										key={todo._id}
										onChecked={onChecked}
										changePriority={changePriority}
										deleteTodo={deleteTodo}
									/>
								))}
							</List>
						</Box2>
					</UndoneBox>
					<CompletedBox>
						<h3>completed</h3>
						<List>
								{completedTodos && completedTodos.map((todo) => (
									<TodoComponent
										todo={todo}
										key={todo._id}
										onChecked={onChecked}
										changePriority={changePriority}
										deleteTodo={deleteTodo}
									/>
								))}
							</List>
					</CompletedBox>
				</BoxMain>
		</Layout>
	)
}