import React, { Fragment, useState, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Cheers from '../images/Beer Celebration-rafiki.png';
import { Request } from '../apis/Request';
import { HTTP_STATUS_CODE, TIME, NUMBER_OF_PEOPLE, BUDGET } from '../constants'
import { setAtmosphere } from '../functions/setAtmosphere';
import { UserInfoContext } from '../providers/UserInfoProvider';


export const RequestHistoryDialog = ({
	dialogInfo,
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
	
	const {userInfo} = useContext(UserInfoContext);

	return (
		<ThemeProvider theme={Theme}>
		<Dialog
		open = {isOpen}
		onClose = {onClose}
		>
			<Fragment>
		<DialogTitle>
			<TitleWrapper>
			飲み会依頼メッセージ
			</TitleWrapper>
		</DialogTitle>
		<DialogContent>
		<ContentWrapper>
		<ReceiverName>
		{userInfo.name}さん<br/>
		</ReceiverName>
		<SenderName>{dialogInfo.name}</SenderName>さんから以下内容で飲み会依頼が届いています！<br/>
		<RequestWrapper>
		<div>
		■飲み会依頼
		</div>
		{ dialogInfo.shop && <br/>}
		{ dialogInfo.shop && <p><RequestItemName>行きたいお店: </RequestItemName>{dialogInfo.shop}</p>}
		{ <p><RequestItemName>希望解散時間: </RequestItemName>{TIME[dialogInfo.time]}</p>}
		{ <p><RequestItemName>希望人数: </RequestItemName>{NUMBER_OF_PEOPLE[dialogInfo.numberOfPeople]}</p>}
		{ <p><RequestItemName>予算: </RequestItemName>{BUDGET[dialogInfo.budget]}</p>}
		{ dialogInfo.atmosphere && <p><RequestItemName>飲み会の雰囲気: </RequestItemName>{setAtmosphere(dialogInfo.atmosphere)}</p>}
		{ dialogInfo.message && <p><RequestItemName>メッセージ: </RequestItemName>{dialogInfo.message}</p>}
		</RequestWrapper>
		</ContentWrapper>
		</DialogContent>
		</Fragment>
		</Dialog>
		</ThemeProvider>
	)
}