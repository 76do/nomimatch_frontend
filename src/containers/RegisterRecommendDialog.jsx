import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import{
	useHistory,
	useLocation
} from "react-router-dom";

export const RegisterRecommendDialog = ({
	receivername,
	open,
	onClose,
}) => {

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

	const DialogWrapper = styled('div')({
		fontSize: 20,
		fontFamily: 'HiraKakuProN-W6',
		textAlign: 'center',
		paddingBottom: 20,
		"@media screen and (max-width:480px)":{
			fontSize: 12,
		},
	});

	const ReceiverName = styled('span')(({ theme }) => ({
		color: theme.palette.main.primary,
	}));

	const EmphasizedButton = styled(Button)(({ theme }) => ({
		width: 200,
		fontSize: 15,
		color: theme.palette.text.primary,
		fontFamily: 'HiraKakuProN-W6',
		borderRadius: 50,
		marginBottom: 20,
		"@media screen and (max-width:480px)":{
			fontSize: 10,
		},
	}));

	const NormalButton = styled(Button)(({ theme }) => ({
		width: 330,
		fontSize: 15,
		color: theme.palette.text.primary,
		fontFamily: 'HiraKakuProN-W6',
		borderRadius: 50,
		marginBottom: 20,
		"@media screen and (max-width:480px)":{
			width: 350,
			fontSize: 8,
		},
	}));
	
	const ButtonWrapperTop = styled('div')({
		display: 'flex',
		justifyContent: 'center',
		paddingTop: 20,
	});

	const WrapperMedium = styled('div')({
		display: 'flex',
		justifyContent: 'center',
		marginBottom: 20,
		fontSize: 20,
		"@media screen and (max-width:480px)":{
			fontSize: 15,
		},
	});

	const ButtonWrapperButtom = styled('div')({
		display: 'flex',
		justifyContent: 'center',
	});

	const location = useLocation();
	const history = useHistory();

	return (
		<ThemeProvider theme={Theme}>
		<Dialog
		open = {open}
		onClose = {onClose}		
		>
		<DialogContent>
			<DialogWrapper>
			ログインした後に依頼を送信すると<br/>
			あとで<ReceiverName>{receivername}</ReceiverName>さんとチャットすることができます！
			</DialogWrapper>
			<ButtonWrapperTop>
			<EmphasizedButton
			sx={{ mr: 1, bgcolor: 'main.primary' }}
			variant='outlined'
			color='inherit'
			onClick={()=>{
				history.push("/signin", {redirectUrl: location.pathname });
			}}
			>
			新規登録
			</EmphasizedButton>
			<EmphasizedButton
			sx={{ ml: 1, bgcolor: 'main.primary' }}
			variant='outlined'
			color='inherit'
			onClick={()=>{
				history.push("/login", {redirectUrl: location.pathname});
			}}
			>
			ログイン
			</EmphasizedButton>
			</ButtonWrapperTop>
			<WrapperMedium>
			or
			</WrapperMedium>
			<ButtonWrapperButtom>
			<NormalButton
			variant='outlined'
			color='inherit'
			onClick={
				onClose
			}
			>
			チャット機能なしで飲み会依頼を送る！
			</NormalButton>
			</ButtonWrapperButtom>
		</DialogContent>
		</Dialog>
		</ThemeProvider>
	)
}
