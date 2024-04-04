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
	background: white;
	/* width: 100%; */
`

const CompletedBox = styled(Box)`
	background: white;
`

const Box1 = styled(Box)`
	/* background: pink; */
`

const Box2 = styled(Box)`
	background: blue;
`

type Props = {
	todos: TodoType[];
	header: string;
	onChecked: (id: string) => void;
	changePriority: (id: string) => void;
	deleteTodo: (id: string) => void;
}

export const TodoList = ({ todos, header, onChecked, changePriority, deleteTodo }: Props) => {
	if (!todos.length) return null;
	return (
		<Box1>
			<h3>{header}</h3>
			<List>
				{todos.map((todo) => (
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
	)
}