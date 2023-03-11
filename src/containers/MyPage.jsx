import React, {Fragment, useState, useContext, useLayoutEffect} from 'react';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { getUserRequests } from '../apis/GetRequests';
import { getCurrentUser } from '../apis/GetCurrentUserInfo';
import Alert from '@mui/material/Alert';
import { UserInfoContext } from '../providers/UserInfoProvider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
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
import TwitterIcon from '@mui/icons-material/Twitter';
import { TwitterShareButton } from "react-share";

export const MyPage = () => {
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
			},
			secondary: {
				main: '#00bfff'
			},
			twitter: {
				main: '#1da1f2'
			}
		},
	});

	const MessageWrapper = styled('div')({
		width: '100%',
		height: 90,
		"@media screen and (max-width:480px)":{
			height: 50,
		},
	});

	const MyPageTitle = styled('div')({
		fontSize: 30,
		"@media screen and (max-width:480px)":{
			fontSize: 22,
		},
		fontFamily: 'HiraKakuProN-W6',
		textAlign: 'center',
	});

	const UserName = styled('span')(({ theme }) => ({
		color: theme.palette.main.primary,
	}));

	const MyPageWrapper = styled('div')({
		display: 'flex',
		flexFlow: 'column',
		alignItems: 'center',
		width: '50%',
		"@media screen and (max-width:480px)":{
			width: '90%',
		},
		paddingTop: 30,
		paddingBottom: 50,
		paddingLeft:15,
		paddingRight:15,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
	});

	const URLWrapper = styled('div')({
		display: 'flex',
		flexFlow: 'column',
		alignItems: 'center',
		width: '90%',
	});

	const URLTitle = styled('div')(({ theme }) =>({
		fontSize: 16,
		"@media screen and (max-width:480px)":{
			fontSize: 13,
		},
		fontFamily: 'HiraKakuProN-W6',
		color: theme.palette.text.primary,
		marginBottom: 20,
	}));

	const RequestsWrapper = styled('div')({
		marginTop: 70,
		"@media screen and (max-width:480px)":{
			marginTop: 50,
		},
		display: 'flex',
		flexFlow: 'column',
		alignItems: 'center',
		width: '90%',
	});

	const RequestsListWrapper = styled('div')(({ theme }) =>({
		paddingTop: 3,
		paddingRight: 3,
		paddingBottom: 3,
		paddingLeft: 3,
		borderRadius: 10,
		border: '3px solid',
		borderColor: theme.palette.main.primary,
		"@media screen and (max-width:480px)":{
			width: '90%',
		},
	}));

	const RequestTitleWrapper = styled('div')({
		display: 'flex',
		alignItems: 'center',
		marginBottom: 20,
	});

	const RequestsTitle = styled('div')(({ theme }) =>({
		fontSize: 20,
		"@media screen and (max-width:480px)":{
			fontSize: 17,
		},
		fontFamily: 'HiraKakuProN-W6',
		color: theme.palette.text.primary,
	}));

	const RequestsDescription = styled('div')(({ theme }) =>({
		fontSize: 18,
		paddingTop: 25,
		"@media screen and (max-width:480px)":{
			fontSize: 15,
		},
		fontFamily: 'HiraKakuProN-W6',
		color: theme.palette.text.primary,
	}));

	const ButtonWrapper = styled('div')(({theme}) => ({
		fontSize: 14,
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: theme.palette.twitter.main,
		color: 'white',
		marginTop: 10,
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 15,
		transition: '.2s',
		"&:hover": {
			backgroundColor: theme.palette.secondary.main,
		}
	}));

	function renderRow(props) {
  	const { index, style } = props;

  	return (
    	<ListItem style={style} key={index} component="div" disablePadding >
      		<ListItemButton>
        		<ListItemText 
				primary={`${requests[index]['attributes']['sender_name']} ${requests[index]['attributes']['created_at']}`}
				onClick={()=>{
					setState({...state, isOpenDialog: true});
					setDialogInfo({
						name: requests[index]['attributes']['sender_name'],
						shop: requests[index]['attributes']['shop_url'],
						time: requests[index]['attributes']['dismissal_time'],
						numberOfPeople: requests[index]['attributes']['number_of_people'],
						budget: requests[index]['attributes']['budget'],
						atmosphere: requests[index]['attributes']['atmosphere'],
						message: requests[index]['attributes']['message'],
					});
				}}
				/>
      		</ListItemButton>
    	</ListItem>
  	);
	}

	const initialState = {
		isRequestsEmpty: false,
		hasRequests: false,
		isOpenDialog: false,
	}

	const initialDialogInfo = {
		name: "",
		shop: "",
		time: "",
		numberOfPeople: "",
		budget: "",
		atmosphere: "",
		message: "",
	}

	const initialFetchState = {
		fetching: true,
		fetched: false
	}

	const cookies  = useCookies(['accessToken'])[0];
	const {userInfo, setUserInfo} = useContext(UserInfoContext);
	const [requests, setRequests] = useState([]);
	const [state, setState] = useState(initialState);
	const [dialogInfo, setDialogInfo] = useState(initialDialogInfo);
	const [fetchState, setFetchState] = useState(initialFetchState);
	const location = useLocation();

	useLayoutEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth"})
		getCurrentUser(cookies.accessToken)
		.then((data) => {
			setUserInfo({id: data['data'].id, name: data['data']['attributes']['name'], random_id: data['data']['attributes']['random_id'] })
		}).catch((e) => {
		})
		getUserRequests(cookies.accessToken)
		.then((data) => {
			setRequests(data["data"]);
			if(data["data"].length !== 0){
				setState({...state, hasRequests: true});
			}else{
				setState({...state, isRequestsEmpty: true})
			}
			setFetchState({fetching: false, fetched: true})
		}).catch((e) => {
		})
	},[])

	return(
		<Fragment>
			<ThemeProvider theme={Theme}>
			<Container maxWidth='lg'>
			<MessageWrapper>
				{
					cookies.accessToken === undefined &&
						<Fade in={true}><Alert severity="error">ログインしてください！</Alert></Fade>
				}
				{
					location.state && location.state.loginNotice &&
						<Alert severity="success">ログインしました！</Alert>
				}
			</MessageWrapper>
				{
					cookies.accessToken &&
					<Stack spacing={8} alignItems="center">	
					{
					fetchState.fetching &&
						<MyPageTitle>
							<CircularProgress/>
						</MyPageTitle>
					}
					{
					fetchState.fetched &&
						<MyPageTitle>
							<UserName>{userInfo.name}</UserName>さん、おかえりなさい！
						</MyPageTitle>
					}
					<MyPageWrapper>
					<URLWrapper>
					<URLTitle>以下URLをシェアして、飲み会依頼が届くのを待ちましょう!</URLTitle>
					{
					fetchState.fetching &&
						<CircularProgress/>
					}
					{
					fetchState.fetched &&
						<>
							<TextField
							fullWidth
							label="飲み会依頼入力URL（読み取り専用）"
							defaultValue={`https://www.nomimatch.com/users/${userInfo.random_id}/request`}	
							InputProps={{
								readOnly: true,
							}}
							sx={{ mt: 1}}
							/>
							<TwitterShareButton url={`https://www.nomimatch.com/users/${userInfo.random_id}/request`} title={`${userInfo.name}さんへの飲み会依頼は以下リンクから！`} hashtags={["ノミマチ","飲み会依頼募集中"]}>
							<ButtonWrapper>
							<TwitterIcon sx={{mr: 1}}/>
							TwitterでURLをシェア！
							</ButtonWrapper>
							</TwitterShareButton>
						</>
					}
					</URLWrapper>
					<RequestsWrapper>	
					<RequestTitleWrapper>
					<MarkAsUnreadOutlinedIcon sx={{mr: 1, color: 'main.primary', fontSize: 30,}}/>
					<RequestsTitle>
					あなた宛に届いた飲み会依頼
					</RequestsTitle>
					</RequestTitleWrapper>
						{
							fetchState.fetching &&
							<CircularProgress/>
						}
						{
							state.isRequestsEmpty && fetchState.fetched &&
							<RequestsDescription>
							飲み会依頼はまだ届いていません！<br/>
							届くまでもう少々お待ちください。
							</RequestsDescription>
						}
						{
							state.hasRequests && fetchState.fetched &&
							<RequestsListWrapper>
							<FixedSizeList
   							height={400}
   							width={360}
   							itemSize={46}
   							itemCount={requests.length}
   							overscanCount={5}
   							>
   							{renderRow}
      						</FixedSizeList>
							</RequestsListWrapper>
						}
					</RequestsWrapper>	
					</MyPageWrapper>
					</Stack>
					}
			</Container>
			{
				state.isOpenDialog &&
				<RequestHistoryDialog
				dialogInfo={dialogInfo}
				isOpen={state.isOpenDialog}
				onClose={() => setState({
					...state,
					isOpenDialog: false,
				})}
				/>
			}
			</ThemeProvider>
		</Fragment>
	)
}
