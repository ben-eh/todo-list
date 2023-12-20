import { Box, Button, Paper, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from "react";
import styled, { ThemeProvider } from 'styled-components';

const EditedBox = styled(Paper)`
	display: flex;
	justify-content: center;
	width: 90vw;
	padding: 1rem;
`

const HeaderLeft = styled(Typography)`
	flex: 1;
`

const HeaderTitle = styled(Typography)`
	display: flex;
	flex: 2;
	justify-content: center;
`

const HeaderRight = styled(Typography)`
	display: flex;
	flex: 1;
	justify-content: flex-end;
`

export const Header = () => {

	return (
		<EditedBox elevation={24}>
			<HeaderLeft></HeaderLeft>
			<HeaderTitle variant="h4">
				Todo List
			</HeaderTitle>
			<HeaderRight>
				<Button>
					Login
				</Button>
				<Button>
					Sign up
				</Button>
			</HeaderRight>
		</EditedBox>
	)
}