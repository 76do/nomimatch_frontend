import React, { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Cheers from '../images/Beer Celebration-rafiki.png';
import { TIME, NUMBER_OF_PEOPLE, BUDGET } from '../constants'
import { setAtmosphere } from '../functions/setAtmosphere';
import { useCookies } from 'react-cookie';
import{
	useHistory,
} from "react-router-dom";


export const RequestDialog = ({
	isSent,
	sendRequest,
	request,
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
		},
	});

	const TitleWrapper = styled('div')({
		fontSize: 25,
		fontFamily: 'HiraKakuProN-W6',
		textAlign: 'center',
		paddingBottom: 20,
	});
	
	const ContentWrapper = styled('div')({
		paddingRight: 15,
		paddingLeft: 15,
		border: 'solid 1px #333',
		borderRadius: 10,
	});
	
	const ReceiverName = styled('div')({
		fontSize: 20,
		paddingTop: 10,
		paddingBottom: 30,
	});

	const SenderName = styled('span')(({ theme }) => ({
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

	const SubmitButton = styled(Button)(({ theme }) => ({
		width: 200,
		fontSize: 15,
		color: theme.palette.text.primary,
		fontFamily: 'HiraKakuProN-W6',
		borderRadius: 50,
		marginBottom: 20,
	}));

	const ImageWrapper = styled('div')({
		textAlign: 'center',
	});

	const RequestFinishImage = styled('img')({
		width: '70%',
	});
	
	const ButtonWrapper = styled('div')({
		textAlign: 'center',
		marginTop: 30,
	});

	const history = useHistory();
	const cookiesArray = useCookies(["accessToken"]);
	const cookies = cookiesArray[0]

	return (
		<ThemeProvider theme={Theme}>
		<Dialog
		open = {isOpen}
		onClose = {onClose}
		>
		{ !isSent &&
			<Fragment>
		<DialogTitle>
			<TitleWrapper>
			??????????????????????????????
			</TitleWrapper>
		</DialogTitle>
		<DialogContent>
		<ContentWrapper>
		<ReceiverName>
		{request.receiverName}??????<br/>
		</ReceiverName>
		<SenderName>{request.name}</SenderName>??????????????????????????????????????????????????????????????????<br/>
		<RequestWrapper>
		<div>
		??????????????????
		</div>
		{ request.shop && <br/>}
		{ request.shop && <p><RequestItemName>??????????????????: </RequestItemName>{request.shop}</p>}
		{ <p><RequestItemName>??????????????????: </RequestItemName>{TIME[request.time]}</p>}
		{ <p><RequestItemName>????????????: </RequestItemName>{NUMBER_OF_PEOPLE[request.numberOfPeople]}</p>}
		{ <p><RequestItemName>??????: </RequestItemName>{BUDGET[request.budget]}</p>}
		{ request.atmosphere && <p><RequestItemName>?????????????????????: </RequestItemName>{setAtmosphere(request.atmosphere)}</p>}
		{ request.message && <p><RequestItemName>???????????????: </RequestItemName>{request.message}</p>}
		</RequestWrapper>
		</ContentWrapper>
		</DialogContent>
		<DialogActions>
		<ActionsWrapper>
		<SubmitButton
		sx={{ bgcolor: 'main.primary' }}
		variant='outlined'
		color='inherit'
		onClick={sendRequest}
		>
		????????????
		</SubmitButton>
		</ActionsWrapper>
		</DialogActions>
			</Fragment>
		}

		{
			isSent &&
			<DialogContent>
				<ImageWrapper>
					<RequestFinishImage src={Cheers}>
					</RequestFinishImage>
				</ImageWrapper>
				<TitleWrapper>
				????????????!
				</TitleWrapper>
				<ButtonWrapper>
				{
					cookies.accessToken &&
					<SubmitButton
					sx={{ bgcolor: 'main.primary' }}
					variant='outlined'
					color='inherit'
					onClick={()=>{
						history.push("/mypage", {loginNotice: false});
					}}
					>
					??????????????????
					</SubmitButton>
				}
				{
					!cookies.accessToken &&
					<SubmitButton
					sx={{ bgcolor: 'main.primary' }}
					variant='outlined'
					color='inherit'
					onClick={()=>{
						history.push("/", {logoutNotice: false});
					}}
					>
					?????????????????????
					</SubmitButton>
				}
				</ButtonWrapper>
			</DialogContent>
		}
		</Dialog>
		</ThemeProvider>
	)
}
