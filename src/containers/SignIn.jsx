import React, {Fragment} from 'react';
import Button from '@mui/material/Button';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const SignIn = () => {

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

	const SignInTitle = styled('div')({
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
		height: 400,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
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

	const { register, handleSubmit, formState: {errors} } = useForm({
		resolver: yupResolver(schema),
		reValidateMode: 'onSubmit',
	});

	const onSubmit = (data) => {
		console.log(data.email);
	};

	return(
		<Fragment>
			<ThemeProvider theme={Theme}>
			<Container maxWidth='lg'>
				<SignInTitle>ノミマチ!に登録</SignInTitle>
					<FormWrapper>
					<Stack spacing={3} alignItems="center">
						<TextField 
						fullWidth 
						required 
						label="ユーザー名"  
						type="name"
						{...register('name')}
						error={"name" in errors}
						helperText={errors.name?.message}
						/>

						<TextField 
						fullWidth 
						required 
						label="メールアドレス"  
						type="email"
						{...register('email')}
						error={"email" in errors}
						helperText={errors.email?.message}
						/>

						<TextField 
						fullWidth 
						required 
						label="パスワード" 
						type="password"
						{...register('password')}
						error={"password" in errors}
						helperText={errors.password?.message}
						/>

						<TextField 
						fullWidth 
						required 
						label="パスワード(確認)" 
						type="password"
						{...register('passwordConfirmation')}
						error={"passwordConfirmation" in errors}
						helperText={errors.passwordConfirmation?.message}
						/>

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
