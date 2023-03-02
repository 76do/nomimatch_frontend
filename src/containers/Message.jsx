import React, {Fragment, useState, useContext, useLayoutEffect} from 'react';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
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

export const Message = () => {
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

	const MessageWrapper = styled('div')({
		background: '#41B6E6',
		borderRadius: 4,
    	color: '#fff',
    	fontSize: 14,
    	fontWeight: 500,
    	padding: '.5rem',
    	marginRight: '1rem',
    	maxWidth: '100%',
    	width: 'auto',
		overflowWrap: 'break-word',
	});

	const Wrapper = styled('div')({
		width: '80%',
	});

	
	const isMe = true;
	const classes = isMe ? "p-chat__reverse" : "p-chat__row";
	const messageClasses = isMe ? "p-chat__bubble_me" : "p-chat__bubble_opponent";
	
	return(
		<ListItem className={classes}>
			<div className={messageClasses}>hogehoooooooooiooooooooooooooooooooo</div>
		</ListItem>
	)
}
