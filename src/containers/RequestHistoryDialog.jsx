import React, { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import { TIME, NUMBER_OF_PEOPLE, BUDGET } from '../constants'
import { setAtmosphere } from '../functions/setAtmosphere';


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
	
	const SenderDescription = styled('div')({
		fontSize: 18,
		paddingTop: 10,
		paddingBottom: 30,
	});

	const SenderName = styled('span')(({ theme }) => ({
		color: theme.palette.main.primary,
	}));

	const RequestWrapper = styled('div')({
		paddingTop: 15,
		paddingBottom: 20,
	});

	const RequestItemName = styled('span')({
		fontWeight: 'bold',
	});

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
		<SenderDescription>
		<SenderName>{dialogInfo.name}</SenderName>さんから以下内容で飲み会依頼が届いています！
		</SenderDescription>
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
