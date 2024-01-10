import { ListItem, Checkbox, Typography } from "@mui/material";
import styled from 'styled-components';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import { TodoType } from "../types/Todo";

const PrioritizeIcon = styled(MilitaryTechRoundedIcon)`
	cursor: pointer;
`;


const TrashIcon = styled(DeleteOutlineRoundedIcon)`
	cursor: pointer;
`;

type Props = {
	todo: TodoType;
	onChecked: (id: string) => void;
	changePriority: (id: string) => void;
	deleteTodo: (id: string) => void;
}

export const Todo = ({ todo, onChecked, changePriority, deleteTodo }: Props) => {
	return (
		<ListItem>
			<Checkbox
				checked={todo.isCompleted}
				onChange={() => onChecked(todo._id)}
			/>
			<Typography>
				{todo.name}
			</Typography>
			{!todo.isCompleted && (
				<PrioritizeIcon
					onClick={() => changePriority(todo._id)}
				/>
			)}
			<TrashIcon
				onClick={() => deleteTodo(todo._id)}
			/>
		</ListItem>
	)
}