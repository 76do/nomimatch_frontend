import React, {Fragment, useState, useContext, useLayoutEffect} from 'react';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { getCurrentUser } from '../apis/GetCurrentUserInfo';
import { UserUpdate } from '../apis/UserUpdate';
import Alert from '@mui/material/Alert';
import { UserInfoContext } from '../providers/UserInfoProvider';
import { useCookies } from 'react-cookie';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import {usePageTracking} from '../functions/useTracking';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import{
	useHistory,
} from "react-router-dom";

export const SettingSP = () => {
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
	const cookies  = useCookies(['accessToken'])[0];
	const removeCookie = useCookies(['accessToken'])[2];
	const {userInfo, setUserInfo} = useContext(UserInfoContext);
	const initialFetchState = {
		fetching: true,
		fetched: false 
	};
	const [fetchState, setFetchState] = useState(initialFetchState);
	const initialState = {
		updateSuccess: false,
	};
	const [state, setState] = useState(initialState);
	const history = useHistory();

	const SettingTitle = styled('div')({
		marginBottom: 20,
		fontSize: 30,
		fontFamily: 'HiraKakuProN-W6',
		textAlign: 'center',
	})

	const SettingWrapper = styled('div')({
		display: 'flex',
		flexFlow: 'column',
		alignItems: 'center',
		width: '90%',
		paddingTop: 30,
		paddingBottom: 30,
		paddingLeft:15,
		paddingRight:15,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
	});

	const UserNameWrapper = styled('div')({
		height: 100,
		display: 'flex',
		flexFlow: 'column',
		alignItems: 'center',
		width: '90%',
	});

	const CircularWrapper = styled('div')({
		paddingTop: 60,
		display: 'flex',
		justifyContent: 'center',
	});

	const MessageWrapper = styled('div')({
		width: '100%',
		height: 90,
		"@media screen and (max-width:480px)":{
			height: 50,
		},
	});

	const SubmitButton = styled(Button)(({ theme, props }) => ({
		color: theme.palette.text.primary,
		fontFamily: 'HiraKakuProN-W6',
		borderRadius: 50,
		width: 150,
		fontSize: 12,
	}));

	const TransitionButton = styled(Button)(({ theme, props }) => ({
		marginTop: 15,
		color: theme.palette.text.primary,
		fontFamily: 'HiraKakuProN-W6',
		borderRadius: 50,
		width: 250,
		fontSize: 12,
	}));

	const schema = yup.object({
		name: yup
			.string()
			.required('??????'),
	})

	const { control, handleSubmit, formState: {errors} } = useForm({
		resolver: yupResolver(schema),
		reValidateMode: 'onSubmit',
	});

	const onSubmit = (data) => {
		let params = { user:
						{name: data.name}
					 }
		setFetchState({fetching: true, fetched: false})
		UserUpdate(cookies.accessToken, params)
		.then((resData) => {
			setUserInfo({id: resData['data'].id, name: resData['data']['attributes']['name'], random_id: resData['data']['attributes']['random_id'] })
			setState({...state, updateSuccess: true})
		}).catch((e) => {
		})
		setFetchState({fetching: false, fetched: true})
	};

	useLayoutEffect(() => {
		if((cookies.accessToken) && (userInfo.id === '')){
			getCurrentUser(cookies.accessToken)
			.then((data) => {
				setUserInfo({id: data['data'].id, name: data['data']['attributes']['name'], random_id: data['data']['attributes']['random_id'] })
				setFetchState({fetching: false, fetched: true})
			}).catch((e) => {
				removeCookie('accessToken', {path: '/'});
			})
		}else{
			setFetchState({fetching: false, fetched: true})
		}
	},[])


	return(
		<Fragment>
			<ThemeProvider theme={Theme}>
			<Container maxWidth='lg'>
				{
					cookies.accessToken === undefined &&
						<Fade in={true}><Alert severity="error">?????????????????????????????????</Alert></Fade>
				}
				<MessageWrapper>
				{
					state.updateSuccess &&
						<Alert severity="success">???????????????????????????????????????</Alert>
				}
				</MessageWrapper>
				{
					cookies.accessToken &&
						<Stack alignItems="center">
						{
							fetchState.fetching &&
								<CircularWrapper>
									<CircularProgress 
									size={50}/>
								</CircularWrapper>
						}
						{
							fetchState.fetched &&
							<>
							<SettingTitle>
							??????
							</SettingTitle>
							<SettingWrapper>
							<UserNameWrapper>
							<Controller
								name="name"
								control={control}
								defaultValue={userInfo.name}
								render={({field}) => (
									<TextField
									{...field}
									sx={{ mb: 3}}
									fullWidth
									required
									label="???????????????"
									error={"name" in errors}
									helperText={errors.name?.message}
									/>
								)}/>
							</UserNameWrapper>
							<SubmitButton
							sx={{ bgcolor: 'main.primary'}}
							variant='outlined'
							color='inherit'
							onClick={handleSubmit(onSubmit)}
							>
							??????
							</SubmitButton>
							</SettingWrapper>
							<TransitionButton
							variant='outlined'
							color='inherit'
							onClick={()=>{
								window.scrollTo({ top: 0, behavior: "smooth"})
								history.push('/termsofservice')
							}}
							>
							????????????
							</TransitionButton>
							<TransitionButton
							variant='outlined'
							color='inherit'
							onClick={()=>{
								window.scrollTo({ top: 0, behavior: "smooth"})
								history.push('/privacypolicy')
							}}
							>
							??????????????????????????????
							</TransitionButton>
							<TransitionButton
							variant='outlined'
							color='inherit'
							onClick={()=>{
								window.open('https://forms.gle/kiXQF4zF5hrYUzUe8');
							}}
							>
							??????????????????
							</TransitionButton>
							</>
						}
						</Stack>
				}
			</Container>
			</ThemeProvider>
		</Fragment>
	)
}
