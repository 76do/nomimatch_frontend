import React, {Fragment, useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signInRequest } from '../apis/signin';
import Alert from '@mui/material/Alert';
import { HTTP_STATUS_CODE } from '../constants'
import Fade from '@mui/material/Fade';
import{
	useHistory,
} from "react-router-dom";
import { useCookies } from 'react-cookie';
import {usePageTracking} from '../functions/useTracking';

export const SignIn = () => {
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

	const SignInTitle = styled('div')({
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
		paddingBottom: 30,
		paddingRight: 15,
		paddingLeft: 15,
		width: 350,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		"@media screen and (max-width:480px)":{
			width: '90%',
		},
	});


	const schema = yup.object({
		name: yup
			.string()
			.required('必須'),
		email: yup 
			.string()
			.required('必須')
			.email('正しいメールアドレスを入力してください。'),
		password: yup
			.string()
			.required('必須')
			.min(3, 'パスワードは3文字以上にしてください。'),
		passwordConfirmation: yup
			.string()
			.required('必須')
			.oneOf([yup.ref('password')], 'パスワードが一致しません。')
	})

	const { control, handleSubmit, formState: {errors} } = useForm({
		resolver: yupResolver(schema),
		reValidateMode: 'onSubmit',
	});

	const initialState = {
		isError: false,
		errorMessages: [],
	};

	const[state, setState] = useState(initialState);
	const history = useHistory()
	const cookiesArray = useCookies(["accessToken"]);
	const setCookie = cookiesArray[1]

	const onSubmit = (data) => {
		let params = { user:
						{name: data.name,
						email: data.email,
						password: data.password,
						password_confirmation: data.passwordConfirmation}
				}
		signInRequest(params)
		.then((resData)=>{
			setState({
				isError: false,
				errorMessages: [],
			})
			let cookieDate = new Date()
			cookieDate.setDate(cookieDate.getDate()+7);
			setCookie("accessToken", resData.headers['accesstoken'], {expires: cookieDate, sameSite: 'none', secure: true})
			history.push("/mypage",{loginNotice: true});
			}
		).catch((e) => {
			if(e.response.status === HTTP_STATUS_CODE.BAD_REQUEST){
				setState({
					isError: true,
					errorMessages: e.response.data.errors,
				})
			}else{
				throw e;
			}
		})
	};

	useEffect(()=> {
		window.scrollTo({ top: 0, behavior: "smooth"})
	}, [errors])

	return(
		<Fragment>
			<ThemeProvider theme={Theme}>
			<Container maxWidth='lg'>
			<MessageWrapper>
				{
					state.errorMessages.map((message, index)=>{
						return <Fade in={true}><Alert severity="error" key={index.toString}>{message}</Alert></Fade>
					})
				}
			</MessageWrapper>
				<SignInTitle>ノミマチ!に登録</SignInTitle>
					<FormWrapper>
					<Stack spacing={3} alignItems="center">
						<Controller
							name="name"
							control={control}
							defaultValue=""
							render={({field}) => (
								<TextField 
								{...field}
								fullWidth 
								required 
								label="ユーザー名"  
								error={"name" in errors}
								helperText={errors.name?.message}
								/>
							)}/>

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
								error={"email" in errors}
								helperText={errors.email?.message}
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
								error={"password" in errors}
								helperText={errors.password?.message}
								/>
							)}/>

						<Controller
							name="passwordConfirmation"
							control={control}
							defaultValue=""
							render={({field}) => (
								<TextField 
								{...field}
								fullWidth 
								required 
								label="パスワード(確認)"  
								type="password"
								error={"passwordConfirmation" in errors}
								helperText={errors.passwordConfirmation?.message}
								/>
							)}/>

						<SubmitButton
						sx={{ bgcolor: 'main.primary' }}
						variant='outlined'
						color='inherit'
						onClick={handleSubmit(onSubmit)}	
						>登録</SubmitButton>
					</Stack>
					</FormWrapper>
			</Container>
			</ThemeProvider>
		</Fragment>
	)
}
