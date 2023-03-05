import React, {Fragment, useState, useContext, useEffect, useMemo} from 'react';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import '../assets/styles/style.css'
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

	const [receivedMessage, setReceivedMessage] = useState();
	const [text, setText] = useState('');
	const [input, setInput] = useState('');
	const [subscription, setSubscription] = useState();
	const cookies  = useCookies(['accessToken'])[0];
	const location = useLocation();
	const cable = useMemo(() => ActionCable.createConsumer(`ws://localhost:3000/cable?token=${cookies.accessToken}`),[]);

	useEffect(() => {
        const scrollArea = document.getElementById('scroll-area');
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight;
        }
    },[]);
	
	useEffect(() => {
		const sub = cable.subscriptions.create({ channel: 'ChatChannel', room_id: props.room_id}, {
			received: (msg) => console.log(msg) 
		});
		setSubscription(sub);
	},[cable]);

	useEffect(()=>{
		console.log(receivedMessage)
	},[receivedMessage])

	const handleSend = () => {
		subscription?.perform('chat', {body: input})
		setInput('');
	};

	const onChangeInput = (e) => {
		setInput(e.currentTarget.value);
	};

	return(
		<Fragment>
			<ThemeProvider theme={Theme}>
			<Container maxWidth='lg'>
		{
			console.log(location.state.roomId)
		}
		{
			console.log(location.state.messageInfo)
		}
				<ChatTitle>
				やまーだ	
				</ChatTitle>
				<ChatWrapper>
					<MessageList id={"scroll-area"}>
						<Message/>
					</MessageList>
					<TextField
          			id="outlined-multiline-static"
					fullWidth
          			multiline
					label="メッセージを入力"
          			rows={3}
					sx={{mb:1}}
					onChange={onChangeInput}
					value={input}
        			/>
					<ButtonWrapper>
					<SendButton 
					color='inherit'
					sx={{ bgcolor: 'main.primary' }}
					onClick={handleSend}
					disabled={input === ''}
					variant="contained">送信</SendButton>
					</ButtonWrapper>
				</ChatWrapper>
			</Container>
			</ThemeProvider>
		</Fragment>
	)
}
