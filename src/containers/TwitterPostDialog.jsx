import React, { Fragment, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Cheers from '../images/Beer Celebration-rafiki.png';
import { TIME, NUMBER_OF_PEOPLE, BUDGET } from '../constants'
import { setAtmosphere } from '../functions/setAtmosphere';
import{
	useHistory,
	useLocation
} from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TwitterIcon from '@mui/icons-material/Twitter';
import { TwitterAuth } from '../apis/TwitterAuth';

export const TwitterPostDialog = ({
	accessToken,
	isOpen,
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
			secondary: {
				main: '#00bfff'
			},
			twitter: {
				main: '#1da1f2'
			}
		},
	});

	const DialogWrapper = styled('div')({
		fontSize: 22,
		fontFamily: 'HiraKakuProN-W6',
		textAlign: 'center',
		paddingBottom: 20,
		"@media screen and (max-width:480px)":{
			fontSize: 17,
		},
	});
	
	const DialogDescription = styled('div')({
		fontSize: 15,
		fontFamily: 'HiraKakuProN-W6',
		textAlign: 'center',
		paddingBottom: 20,
		"@media screen and (max-width:480px)":{
			fontSize: 12,
		},
	});

	const ContentWrapper = styled('div')({
		paddingRight: 15,
		paddingLeft: 15,
		border: 'solid 1px #333',
		borderRadius: 10,
	});

	const ReceiverName = styled('span')(({ theme }) => ({
		color: theme.palette.main.primary,
	}));

	const RequestWrapper = styled('div')({
		paddingTop: 30,
		paddingBottom: 20,
	});

	const RequestItemName = styled('span')({
		fontWeight: 'bold',
	});

	const  ActionsWrapper = styled('div')({
		margin: '0 auto',
	});

	const CheckBoxWrapper = styled('div')({
		display: 'flex',
		justifyContent: 'center',
	});

	const EmphasizedButton = styled(Button)(({ theme }) => ({
		width: 200,
		fontSize: 18,
		color: theme.palette.text.primary,
		fontFamily: 'HiraKakuProN-W6',
		borderRadius: 50,
		marginBottom: 20,
		"@media screen and (max-width:480px)":{
			fontSize: 12,
		},
	}));

	
	const TitleSpan = styled('span')(({ theme }) => ({
		color: theme.palette.main.primary,
	}));

	const PostButton = styled(Button)(({ theme }) => ({
		width: 200,
		fontSize: 12,
		fontFamily: 'HiraKakuProN-W6',
		textTransform: 'none',
		borderRadius: 50,
		marginTop: 15,
		"@media screen and (max-width:480px)":{
			width: 150,
			fontSize: 10,
		},
	}));

	const ImageWrapper = styled('div')({
		textAlign: 'center',
	});

	const RequestFinishImage = styled('img')({
		width: '70%',
	});
	
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

	const ButtonWrapper = styled('div')({
		display: 'flex',
		justifyContent: 'center',
	});

	const CheckBoxLabel = styled('div')({
		fontSize: 12,
		fontFamily: 'HiraKakuProN-W6',
		"@media screen and (max-width:480px)":{
			fontSize: 10,
		},
	});

	const location = useLocation();
	const history = useHistory();
	const [isAutoPost, setIsAutoPost] = useState(true);

	const handleChange = () => {
		setIsAutoPost(!isAutoPost);
	};

	const handleSend = () => {
		TwitterAuth(accessToken)
		.then(()=>{
		}).catch((e) => {
			console.log(e)
		})
	};

	return (
		<ThemeProvider theme={Theme}>
		<Dialog
		open = {isOpen}
		onClose = {onClose}		
		>
		<DialogContent>
			<DialogWrapper>
			<TitleSpan>定期投稿</TitleSpan>しますか？
			</DialogWrapper>
			<DialogDescription>
			定期投稿ありにすると、1週間に1度<br/>
			あなたのURLをTwitterに自動投稿します。<br/>
			</DialogDescription>
			<CheckBoxWrapper>
				<FormControlLabel control={<Checkbox checked={isAutoPost} onChange={handleChange}/>} label={
					<CheckBoxLabel>
					定期投稿あり
					</CheckBoxLabel>
				}/>
				<FormControlLabel control={<Checkbox checked={!isAutoPost} onChange={handleChange}/>} label={
					<CheckBoxLabel>
					定期投稿なし
					</CheckBoxLabel>
				}/>
			</CheckBoxWrapper>
			<ButtonWrapper>
			<PostButton
			variant='contained'
			color='secondary'
			startIcon={<TwitterIcon/ >}
			sx={{ color: 'white', bgcolor: 'twitter.main'}}
			onClick={handleSend}
			>
			Twitterでシェア！
			</PostButton>
			</ButtonWrapper>
		</DialogContent>
		</Dialog>
		</ThemeProvider>
	)
}
