import { ListItem, Checkbox, Typography } from "@mui/material";
import styled from 'styled-components';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { TodoType } from "../types/Todo";

const TrashIcon = styled(DeleteOutlineRoundedIcon)`
	cursor: pointer;
`;

type Props = {
	todo: TodoType;
	onChecked: (id: string) => void;
	deleteTodo: (id: string) => void;
}

export const Todo = ({ todo, onChecked, deleteTodo }: Props) => {
	return (
		<ListItem>
			<Checkbox
				checked={todo.isCompleted}
				onChange={() => onChecked(todo._id)}
			/>
			<Typography>
				{todo.name}
			</Typography>
			<TrashIcon
				onClick={() => deleteTodo(todo._id)}
			/>
		</ListItem>
	)
}