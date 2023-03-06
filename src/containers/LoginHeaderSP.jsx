import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SportsBarIcon from '@mui/icons-material/SportsBarOutlined';
import Container from '@mui/material/Container';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import{
	useHistory,
} from "react-router-dom";
import { LogOut } from '../apis/LogOut';
import { useCookies } from 'react-cookie';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const LoginHeaderSP = () => {

	const Theme = createTheme({
		palette: {
			background: {
				primary: '#F5F5F5',
			},
			text: {
				primary: '#263238',
			},
			main: {
				primary: '#ffa500',
				secondary: '#ffd700',
			},
		},
	});

	const history = useHistory();
	const cookiesArray = useCookies(["accessToken"]);
	const cookies = cookiesArray[0]
	const removeCookie = cookiesArray[2]

	const NomimatchAppBar = styled(AppBar)(({ theme }) => ({
		backgroundColor: theme.palette.background.primary,
	}));

	const HeaderButton = styled(Button)(({ theme, props }) => ({
		width: 100,
		fontSize: 10,
		color: theme.palette.text.primary,
		fontFamily: 'HiraKakuProN-W6',
		borderRadius: 50,
	}));

	const logout = () => {
		if(window.confirm('ログアウトしますか？')){
		LogOut(cookies["accessToken"])
		.then(() => {
			removeCookie('accessToken')
			history.push("/",{logoutNotice: true})
		}).catch(
		)}
	};


  	return (
	  	<ThemeProvider theme={Theme}>
    		<Box sx={{ flexGrow: 1 }}>
      			<NomimatchAppBar position="static">
	  				<Container maxWidth="lg">
        				<Toolbar>
							<IconButton
            				size="large"
            				edge="start"
            				color="inherit"
            				aria-label="menu"
            				sx={{ mr: 2 }}
							onClick={()=>{
								history.push("/", {logoutNotice: false});
							}}
          					>
	  							<SportsBarIcon 
								sx={{fontSize: 40, color: 'main.primary'}}/>
          					</IconButton>
	  						<div style={{flexGrow: 1}}></div>
          					<HeaderButton
							variant='outlined'
							color='inherit'
							onClick={logout}
							>ログアウト</HeaderButton>
							<IconButton
            				size="large"
            				edge="start"
            				color="inherit"
            				aria-label="menu"
							onClick={()=>{
								history.push("/notready");
							}}
          					>
	  							<SettingsOutlinedIcon 
								sx={{fontSize: 30, pl: 1, color: 'black'}}/>
          					</IconButton>
        				</Toolbar>
	  				</Container>
      			</NomimatchAppBar>
    		</Box>
	  	</ThemeProvider>
  );
}
