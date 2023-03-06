import React, {Fragment, useState} from 'react';
import Button from '@mui/material/Button';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from 'react-hook-form';
import { LogInRequest } from '../apis/LogIn';
import Alert from '@mui/material/Alert';
import { HTTP_STATUS_CODE } from '../constants'
import{
	useHistory,
} from "react-router-dom";
import { useCookies } from 'react-cookie';
import Fade from '@mui/material/Fade';
import {usePageTracking} from '../functions/useTracking';

export const LogIn = () => {
	usePageTracking();
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

	const MessageWrapper = styled('div')({
		width: '100%',
		height: 90,
		"@media screen and (max-width:480px)":{
			height: 50,
		},
	});

	const LogInTitle = styled('div')({
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
		"@media screen and (max-width:480px)":{
			width: 150,
			fontSize: 12,
		},
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
		"@media screen and (max-width:480px)":{
			width: '90%',
		},
	});

	const { control, handleSubmit} = useForm({
	});

	const initialState = {
		errorMessages: [],
	};

	const[state, setState] = useState(initialState);

	const history = useHistory();

	const cookiesArray = useCookies(["accessToken"]);
	const cookies = cookiesArray[0]
	const setCookie = cookiesArray[1]

	const onSubmit = (data) => {
		let params = { 
						email: data.email,
						password: data.password,
					 }
		LogInRequest(params)
		.then((resData)=>{
			let cookieDate = new Date()
			cookieDate.setDate(cookieDate.getDate()+7);
			setCookie("accessToken", resData.headers['accesstoken'], {expires: cookieDate, sameSite: 'none', secure: true})
			history.push("/mypage",{loginNotice: true});
		}).catch((e) => {
			if(e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED){
				setState({
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
				<MessageWrapper>
				{
					cookies['accessToken'] !== undefined &&
						<Fade in={true}><Alert severity="warning">既にログインしています。</Alert></Fade>
				}
				{
					state.errorMessages.map((message, index)=>{
					return <Fade in={true}><Alert severity="error" key={index.toString}>{message}</Alert></Fade>
				})
				}
				</MessageWrapper>
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

