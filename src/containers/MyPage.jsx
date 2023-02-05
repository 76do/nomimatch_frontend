import React, {Fragment, useState, useContext, useEffect} from 'react';
import Button from '@mui/material/Button';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LogInRequest } from '../apis/LogIn';
import { getUserRequests } from '../apis/GetRequests';
import Alert from '@mui/material/Alert';
import { HTTP_STATUS_CODE } from '../constants';
import { LoginFlagContext } from '../providers/LoginFlagProvider';
import { UserInfoContext } from '../providers/UserInfoProvider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import MarkAsUnreadOutlinedIcon from '@mui/icons-material/MarkAsUnreadOutlined';
import { RequestHistoryDialog } from './RequestHistoryDialog';

export const MyPage = () => {
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

	const MyPageTitle = styled('div')({
		paddingTop: 70,
		fontSize: 30,
		"@media screen and (max-width:480px)":{
			fontSize: 27,
		},
		fontFamily: 'HiraKakuProN-W6',
		textAlign: 'center',
	});

	const UserName = styled('span')(({ theme }) => ({
		color: theme.palette.main.primary,
	}));

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
		height: 300,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
	});

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
	
	const loginInfo = useContext(LoginFlagContext);
	const {userInfo, setUserInfo} = useContext(UserInfoContext);
	const [requests, setRequests] = useState([]);
	const [state, setState] = useState(initialState);
	const [dialogInfo, setDialogInfo] = useState(initialDialogInfo);

	useEffect(() => {
		getUserRequests(loginInfo['accessToken'])	
		.then((data) => {
			setRequests(data["data"]);
			console.log(data["data"].length)
			console.log(data["data"].length !== 0)
			if(data["data"].length !== 0){
				setState({...state, hasRequests: true});
			}else{
				setState({...state, isRequestsEmpty: true})
			}
		}).catch((e) => {
		})
	}, [])

	useEffect(() => {
		console.log(state.isRequestEmpty)
	}, [state]);

	return(
		<Fragment>
			<ThemeProvider theme={Theme}>
			<Container maxWidth='lg'>
				<Stack spacing={8} alignItems="center">	
				<MyPageTitle><UserName>{userInfo.name}</UserName>さん、おかえりなさい！</MyPageTitle>
				<MyPageWrapper>
				<URLWrapper>
				<URLTitle>以下URLをシェアして、飲み会依頼が届くのを待ちましょう!</URLTitle>
				<TextField
				fullWidth
				label="飲み会依頼入力URL（読み取り専用）"
				defaultValue={`https://nomimatch.com/users/${userInfo.random_id}/request`}	
				InputProps={{
					readOnly: true,
				}}
				sx={{ mt: 1}}
				/>
				</URLWrapper>
				<RequestsWrapper>	
				<RequestTitleWrapper>
				<MarkAsUnreadOutlinedIcon sx={{mr: 1, color: 'main.primary', fontSize: 30,}}/>
				<RequestsTitle>
				あなた宛に届いた飲み会依頼
				</RequestsTitle>
				</RequestTitleWrapper>
				{
					state.isRequestsEmpty &&
					<RequestsDescription>
					飲み会依頼はまだ届いていません！<br/>
					届くまでもう少々お待ちください。
					</RequestsDescription>
				}
				{
					state.hasRequests &&
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
