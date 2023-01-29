import React, {Fragment, useState} from 'react';
import Button from '@mui/material/Button';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LogInRequest } from '../apis/LogIn';
import Alert from '@mui/material/Alert';
import { HTTP_STATUS_CODE } from '../constants'

export const LogIn = () => {

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

	const LogInTitle = styled('div')({
		paddingTop: 70,
		marginBottom: 50,
		fontSize: 30,
		fontFamily: 'HiraKakuProN-W6',
		textAlign: 'center',
	});

	const SubmitButton = styled(Button)(({ theme, props }) => ({
		width: 200,
		fontSize: 15,
		color: theme.palette.text.primary,
		fontFamily: 'HiraKakuProN-W6',
		borderRadius: 50,
	}));

	const FormWrapper = styled('div')({
		margin:'0 auto',
		paddingTop: 30,
		paddingRight: 15,
		paddingLeft: 15,
		width: 350,
		height: 300,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
	});

	const { control, register, handleSubmit} = useForm({
	});

	const initialState = {
		isError: false,
		errorMessages: [],
	};

	const[state, setState] = useState(initialState);

	const onSubmit = (data) => {
		let params = { 
						email: data.email,
						password: data.password,
					 }
		LogInRequest(params)
		.then((resData)=>
			console.log(resData)
		).catch((e) => {
			if(e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED){
				setState({
					isError: true,
					errorMessages: e.response.data.errors,
				})
			}else{
				throw e;
			}
		})
	};


	return(
		<Fragment>
			<ThemeProvider theme={Theme}>
			<Container maxWidth='lg'>
				{
					state.errorMessages.map((message, index)=>{
						return <Alert severity="error" key={index.toString}>{message}</Alert>
					})
				}
				<LogInTitle>ログイン</LogInTitle>
					<FormWrapper>
					<Stack spacing={3} alignItems="center">
						<Controller
							name="email"
							control={control}
							defaultValue=""
							render={({field}) => (
								<TextField 
								{...field}
								fullWidth 
								required 
								label="メールアドレス"  
								type="email"
								/>
							)}/>

						<Controller
							name="password"
							control={control}
							defaultValue=""
							render={({field}) => (
								<TextField 
								{...field}
								fullWidth 
								required 
								label="パスワード"  
								type="password"
								/>
							)}/>

						<SubmitButton
						sx={{ bgcolor: 'main.primary' }}
						variant='outlined'
						color='inherit'
						onClick={handleSubmit(onSubmit)}
						>ログイン</SubmitButton>
					</Stack>
					</FormWrapper>
			</Container>
			</ThemeProvider>
		</Fragment>
	)
}

