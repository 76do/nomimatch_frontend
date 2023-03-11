import React, {Fragment, useState, useLayoutEffect} from 'react';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Container from '@mui/material/Container';
import { getChats } from '../apis/GetChats';
import Alert from '@mui/material/Alert';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList } from 'react-window';
import { useCookies } from 'react-cookie';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import {usePageTracking} from '../functions/useTracking';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ChatIcon from '@mui/icons-material/Chat';
import Grid from '@mui/material/Grid';
import{
	useHistory,
} from "react-router-dom";

export const Chats = () => {
	usePageTracking();
	const Theme = createTheme({
		palette: {
			text: {
				primary: '#263238',
			},
			main: {
				primary: '#ffa500'
			},	
			primary: {
				main: '#ffa500'
			}
		},
	});

	const ChatsTitle = styled('div')({
		fontSize: 30,
		"@media screen and (max-width:480px)":{
			fontSize: 27,
		},
		fontFamily: 'HiraKakuProN-W6',
		textAlign: 'center',
		paddingTop: 20,
		paddingBottom: 20,
	});
	
	const ChatsWrapper = styled('div')({
		margin: '0 auto',
		width: '50%',
		"@media screen and (max-width:480px)":{
			width: '90%',
		},
		paddingTop: 10,
		paddingBottom: 20,
		paddingLeft:15,
		paddingRight:15,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
	});
	
	const ChatsTime = styled('div')({
		fontSize: 8,
		fontFamily: 'HiraKakuProN-W6',
	});

	const NoChats = styled('div')(({ theme }) =>({
		fontSize: 18,
		paddingRight:'22%',
		paddingLeft:'22%',
		paddingTop: 25,
		paddingBottom: 25,
		"@media screen and (max-width:480px)":{
			fontSize: 15,
		},
		fontFamily: 'HiraKakuProN-W6',
		color: theme.palette.text.primary,
	}));

	const CircularWrapper = styled('div')({
		paddingTop: 60,
		display: 'flex',
		justifyContent: 'center',
	});

	const initialState = {
		isChatsEmpty: false,
		hasChats: false,
	}
	const cookies  = useCookies(['accessToken'])[0];
	const [state, setState] = useState(initialState);
	const [chatsInfo, setChatsInfo] = useState([]);
	const initialFetchState = {
		fetching: true,
		fetched: false,
	}
	const [fetchState, setFetchState] = useState(initialFetchState);
	const history = useHistory();
	
	function renderRow(props) {
		const { index, style } = props;
		const chat_message_length = chatsInfo[String(index)].chat_message.length
		const send_time = chatsInfo[String(index)].chat_message[String(chat_message_length - 1)].created_at.substr(0, 10).split('-').join('/')

		return (
			<ListItem style={style} index={index} component="div" disablePadding >
				<ListItemButton>
				  <ListItem alignItems="flex-start">
					<ListItemAvatar>
						<ChatIcon
							sx={{fontSize: 30, color: 'main.primary', pt: 1, pb: 1}}
						/>
					</ListItemAvatar>
					<Grid container>
						<Grid item xs={10}>
							<ListItemText
							  primary={chatsInfo[String(index)].opponent.name}
							  secondary={
								<React.Fragment>
								{chatsInfo[String(index)].chat_message[String(chat_message_length - 1)].message.substr(0, 5) + '...'}
								</React.Fragment>
							  }
						  	  onClick={()=>{
								  history.push('/chat', {opponentName: chatsInfo[String(index)].opponent.name, 
									  messageInfo: chatsInfo[String(index)].chat_message,
									  roomId: chatsInfo[String(index)].id,
								 })
							  }}
							/>
						</Grid>
						<Grid item xs={2}>
							<ChatsTime>
							{send_time}
							</ChatsTime>
						</Grid>
					</Grid>
				  </ListItem>
				</ListItemButton>
			</ListItem>
		);
	}


	useLayoutEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth"})
		getChats(cookies.accessToken)
		.then((data) => {
			setChatsInfo(data)
			if(data.length !== 0){
				setState({...state, hasChats: true});
			}else{
				setState({...state, isChatsEmpty: true});
			}
			setFetchState({fetching: false, fetched: true});
		}).catch((e) => {
		})
	},[])

	return(
		<Fragment>
			<ThemeProvider theme={Theme}>
			<Container maxWidth='lg'>
				{
					cookies.accessToken === undefined &&
						<Fade in={true}><Alert severity="error">ログインしてください！</Alert></Fade>
				}
				{
					cookies.accessToken &&
					<>
					<ChatsTitle>
					メッセージ
					</ChatsTitle>
					{
						fetchState.fetching &&
						<CircularWrapper>
							<CircularProgress size={50}/>
						</CircularWrapper>
					}
					{
						state.isChatsEmpty && fetchState.fetched &&
					<ChatsWrapper>
						<NoChats>
						メッセージはまだ届いていません！<br/>
						届くまでもう少々お待ちください。
						</NoChats>
					</ChatsWrapper>
					}
					{
						state.hasChats && fetchState.fetched &&
					<ChatsWrapper>
						<FixedSizeList
						height={480}
						width={'100%'}
						itemSize={88}
						itemCount={chatsInfo.length}
						overscanCount={5}
						>
						{renderRow}
						</FixedSizeList>
					</ChatsWrapper>
					}
					</>
				}
			</Container>
			</ThemeProvider>
		</Fragment>
	)
}
