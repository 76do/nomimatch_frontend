import React, {Fragment, useState, useContext, useEffect, useLayoutEffect} from 'react';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { getUserRequests } from '../apis/GetRequests';
import { getCurrentUser } from '../apis/GetCurrentUserInfo';
import { getChats } from '../apis/GetChats';
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
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import{
	useHistory,
} from "react-router-dom";

export const Setting = () => {
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
	const {userInfo, setUserInfo} = useContext(UserInfoContext);

	const SettingTitle = styled('div')({
		paddingTop: 85,
		marginBottom: 65,
		fontSize: 30,
		fontFamily: 'HiraKakuProN-W6',
		textAlign: 'center',
	})

	const SettingWrapper = styled('div')({
		display: 'flex',
		flexFlow: 'column',
		alignItems: 'center',
		width: '50%',
		"@media screen and (max-width:480px)":{
			width: '90%',
		},
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

	const SubmitButton = styled(Button)(({ theme, props }) => ({
		width: 200,
		fontSize: 15,
		color: theme.palette.text.primary,
		fontFamily: 'HiraKakuProN-W6',
		borderRadius: 50,
		"@media screen and (max-width:480px)":{
			width: 150,
			fontSize: 12,
		},
	}));

	const schema = yup.object({
		name: yup
			.string()
			.required('必須'),
	})

	const { control, handleSubmit, formState: {errors} } = useForm({
		resolver: yupResolver(schema),
		reValidateMode: 'onSubmit',
	});

	const onSubmit = (data) => {
		console.log(data)
	};

	useLayoutEffect(() => {
		if((cookies.accessToken) && (userInfo.id === '')){
			getCurrentUser(cookies.accessToken)
			.then((data) => {
				setUserInfo({id: data['data'].id, name: data['data']['attributes']['name'], random_id: data['data']['attributes']['random_id'] })
			}).catch((e) => {
			})
		}
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
						<Stack alignItems="center">
						<SettingTitle>
						設定
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
								label="ユーザー名"
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
						更新
						</SubmitButton>
						</SettingWrapper>
						</Stack>
				}
			</Container>
			</ThemeProvider>
		</Fragment>
	)
}
