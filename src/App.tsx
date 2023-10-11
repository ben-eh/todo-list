import { Box, Paper } from '@mui/material';
import styled from 'styled-components';

const Layout = styled(Box)`
	height: 100vh;
	width: 100vw;
	background-color: #5c0c70;
`;

const Background = styled(Paper)`
	padding: 1rem;
`

const App = () => {
	return (
		<Layout>
			<header>
				<div>
					To Do
				</div>
				<div>
					Done
				</div>
			</header>
			<Background>
				<div>
					test
				</div>
			</Background>
		</Layout>
	);
}

export default App;
