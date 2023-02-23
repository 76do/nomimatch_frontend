import React, {Fragment} from 'react';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Container from '@mui/material/Container';

export const NotReady = () => {

	const Theme = createTheme({
		palette: {
			text: {
				primary: '#263238',
			},
			main: {
				primary: '#ffa500'
			},	
		},
	});

	const Wrapper = styled('div')({
		paddingTop: 50,
		fontSize: 30,
		fontFamily: 'HiraKakuProN-W6',
		color: 'grey',
		textAlign: 'center',
	});

	return(
		<Fragment>
			<ThemeProvider theme={Theme}>
			<Container maxWidth='lg'>
			<Wrapper>
			準備中
			</Wrapper>
			</Container>
			</ThemeProvider>
		</Fragment>
	)
}

