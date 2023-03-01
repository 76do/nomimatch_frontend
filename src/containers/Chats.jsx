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

	function renderRow(props) {
  	const { index, style } = props;

  	return (
    	<ListItem style={style} key={index} component="div" disablePadding >
      		<ListItemButton>
			  <ListItem alignItems="flex-start">
				<ListItemAvatar>
					<ChatIcon
						sx={{fontSize: 30, color: 'main.primary', pt: 1, pb: 1}}
					/ >
				</ListItemAvatar>
				<ListItemText
				  primary="たあさん"
				  secondary={
					<React.Fragment>
					  {" 飲み会依頼 ........."}
					</React.Fragment>
				  }
				/>
			  </ListItem>
      		</ListItemButton>
    	</ListItem>
  	);
	}
	return(
		<Fragment>
			<ThemeProvider theme={Theme}>
			<Container maxWidth='lg'>
				<FixedSizeList
   				height={400}
   				width={360}
   				itemSize={80}
   				itemCount={100}
   				overscanCount={5}
   				>
   				{renderRow}
      			</FixedSizeList>
			</Container>
			</ThemeProvider>
		</Fragment>
	)
}
