import { Paper, Box, Button, TextField, styled, Grid } from "@mui/material"
import React, { useState } from "react"

const Container = styled(Paper)`
	display: flex;
	max-width: 700px;
	margin-top: 3rem;
	padding: 1rem;
`

const InputBox = styled(Paper)`
	display: flex;
	flex-grow: 1;
	padding: 10px;
`

const Input = styled(TextField)`
	display: flex;
	flex-grow: 1;
	margin-right: 2rem;
`

type Props = {
  addItem: (name: string) => void;
};

export const AddTodoForm = ( { addItem }: Props ) => {
	const [ text, setText ] = useState<string>('');

	const handleClick = () => {
		text && text?.length > 0 && addItem(text);
		setText('');
	};
	
	return(
		<Grid
		item
		xs={12}
		>
			<InputBox
			elevation={5}
			>
				<Input
					label="Add task"
					value={text}
					onChange={(event) => setText(event.target.value)}
					// style={{ marginLeft:  '10px' }}
				/>
				<Button
					variant="contained"
					sx={{ padding: "0 2rem" }}
					onClick={handleClick}
					// style={{ marginRight: '10px' }}
				>
					add
				</Button>
			</InputBox>
		</Grid>
	)
}