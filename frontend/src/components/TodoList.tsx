import { Checkbox, List, ListItem, Typography, Paper } from "@mui/material";
import { Todo } from "../types/Todo";
import styled from 'styled-components';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const Layout = styled(Paper)`
	display: flex;
	justify-content: center;
	margin-top: 3rem;
	width: 70vw;
`;

const TrashIcon = styled(DeleteOutlineRoundedIcon)`
	cursor: pointer;
`;

type Props = {
	todos: Todo[];
	onChecked: (id: string) => void;
	deleteTodo: (id: string) => void;
}

export const TodoList = ({todos, onChecked, deleteTodo}: Props ) => {
	const todosExist = todos.length > 0;
	return (
		<Layout>
			{todosExist ? (
			<List>
			{todos.map((item) => (
				<ListItem key={item._id}>
					<Checkbox
						checked={item.isCompleted}
						onChange={() => onChecked(item._id)}
					/>
					<Typography>
						{item.name}
					</Typography>
					<TrashIcon
						onClick={() => deleteTodo(item._id)}
					/>
					<EditRoundedIcon />
				</ListItem>
			))}
			</List>
			) : (
			<Typography
				variant="h4"
			>
				No items yet in list
			</Typography>
			)}
		</Layout>

	)
}