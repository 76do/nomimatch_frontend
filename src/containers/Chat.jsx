import React, {Fragment, useLayoutEffect, useState, useContext, useEffect, useMemo} from 'react';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import '../assets/styles/style.css'
import {OpponentMessage} from './OpponentMessage'
import {Message} from './Message'
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { getUserRequests } from '../apis/GetRequests';
import { getCurrentUser } from '../apis/GetCurrentUserInfo';
import Alert from '@mui/material/Alert';
import { UserInfoContext } from '../providers/UserInfoProvider';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList } from 'react-window';
import MarkAsUnreadOutlinedIcon from '@mui/icons-material/MarkAsUnreadOutlined';
import { RequestHistoryDialog } from './RequestHistoryDialog';
import { useCookies } from 'react-cookie';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import{
	useLocation
} from "react-router-dom";
import {usePageTracking} from '../functions/useTracking';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ChatIcon from '@mui/icons-material/Chat';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ActionCable from 'actioncable';


export const Chat = (props) => {
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
	
	const ChatWrapper = styled('div')({
		margin: '0 auto',
		height: 500,
		width: '50%',
		"@media screen and (max-width:480px)":{
			width: '90%',
			height: 430,
			paddingBottom: 30,
		},
		paddingTop: 10,
		paddingBottom: 70,
		paddingLeft:15,
		paddingRight:15,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
	});
	
	const ChatTitle = styled('div')(({ theme }) => ({
		fontSize: 30,
		paddingTop: 20,
		paddingBottom: 20,
		"@media screen and (max-width:480px)":{
			fontSize: 27,
			paddingTop: 10,
			paddingBottom: 10,
		},
		color: theme.palette.main.primary,
		fontFamily: 'HiraKakuProN-W6',
		textAlign: 'center',
	}));
	
	const CircularWrapper = styled('div')({
		paddingTop: 60,
		display: 'flex',
		justifyContent: 'center',
	});

	const ChatsTime = styled('div')({
		fontSize: 8,
		fontFamily: 'HiraKakuProN-W6',
	});

	const MessageList = styled(List)({
		height: 400,
		marginBottom: 10,
		"@media screen and (max-width:480px)":{
			height: 300,
		},
		overflow: "auto",
	});

	const ButtonWrapper = styled('div')({
		display: 'flex',
		flexDirection: 'row-reverse',
	});

	const SendButton = styled(Button)({
		height: 20,
		width:'10%',
	});

	const initialFetchState = {
		fetching: true,
		fetched: false 
	};

	const [receivedMessage, setReceivedMessage] = useState('');
	const {userInfo, setUserInfo} = useContext(UserInfoContext);
	const [subscription, setSubscription] = useState();
	const cookies  = useCookies(['accessToken'])[0];
	const location = useLocation();
	const [messages, setMessages] = useState(location.state.messageInfo);
	const [roomId, setRoomId] = useState(location.state.roomId);
	const [message, setMessage] = useState('');
	const [userId, setUserId] = useState(Number(userInfo.id));
	const [fetchState, setFetchState] = useState(initialFetchState);
	const cable = useMemo(() => ActionCable.createConsumer(`ws://localhost:3000/cable?token=${cookies.accessToken}`),[]);

	useEffect(() => {
        const scrollArea = document.getElementById('scroll-area');
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight;
        }
    });
	
	useEffect(() => {
		window.scroll({top: document.body.scrollHeight, behavior: 'smooth'});
		const sub = cable.subscriptions.create({ channel: 'ChatChannel', room_id: roomId}, {
			received: (msg) => {
				setReceivedMessage(msg) 
			}
		});
		setSubscription(sub);
	},[cable]);

	useEffect(()=>{
		if(receivedMessage !== ''){
			const newMessage = {
				user_id: receivedMessage.user.id,
				message: receivedMessage.message,
			}
			setMessages([...messages, newMessage])
		}
	},[receivedMessage])

	useLayoutEffect(() => {
		if(userInfo.id === ''){
			getCurrentUser(cookies.accessToken)
			.then((data) => {
				setUserInfo({id: data['data'].id, name: data['data']['attributes']['name'], random_id: data['data']['attributes']['random_id'] })
				setFetchState({fetching: false, fetched: true})
			}).catch((e) => {
			})
		}else{
			setFetchState({fetching: false, fetched: true})
		}
	},[])

	let value = ''

	const onChangeInput = (e) => {
		value = e.target.value
	};

	const handleSend = () => {
		subscription.perform('chat', { body: value });
	};

	const branchMessages = (message, index) => {
		if(message.user_id === Number(userInfo.id)){
			return <Message message={message.message} key={index}/>
		}else{
			return <OpponentMessage message={message.message} key={index}/>
		}
	};

	return(
		<Fragment>
			<ThemeProvider theme={Theme}>
			<Container maxWidth='lg'>
				<ChatTitle>
				{location.state.opponentName}
				</ChatTitle>
				{
					fetchState.fetching &&
						<CircularWrapper>
							<CircularProgress 
							size={50}/>
						</CircularWrapper>
				}
				{
					fetchState.fetched &&
					<ChatWrapper>
						<MessageList id={"scroll-area"}>
						{
							messages.map((message, index) => {
								return	branchMessages(message, index)
							})
						}
						</MessageList>
						<TextField
						id="inputField"
						fullWidth
						multiline
						label="メッセージを入力"
						rows={3}
						sx={{mb:1}}
						onChange={onChangeInput}
						/>
						<ButtonWrapper>
						<SendButton 
						color='inherit'
						sx={{ bgcolor: 'main.primary' }}
						onClick={handleSend}
						variant="contained">送信</SendButton>
						</ButtonWrapper>
					</ChatWrapper>
				}
			</Container>
			</ThemeProvider>
		</Fragment>
	)
}
