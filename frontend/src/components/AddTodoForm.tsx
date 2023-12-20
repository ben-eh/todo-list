import { Paper, Box, Button, TextField, styled } from "@mui/material"
import React, { useState } from "react"

const Container = styled(Paper)`
	display: flex;
	max-width: 700px;
	margin-top: 3rem;
	padding: 1rem;
`

const InputBox = styled(Box)`
	display: flex;
	flex-grow: 1;
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
		<Container>
			<InputBox>
				<Input
					label="Add task"
					value={text}
					onChange={(event) => setText(event.target.value)}
				/>
				<Button
					variant="contained"
					sx={{ padding: "0 3rem" }}
					onClick={handleClick}
				>
					add
				</Button>
			</InputBox>
		</Container>
	)
}