import './App.css';
import{
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import React, { useEffect, useState, useLayoutEffect } from 'react';
import {Top} from './containers/Top.jsx';
import {SignIn} from './containers/SignIn.jsx';
import {LogIn} from './containers/LogIn.jsx';
import {RequestForm} from './containers/RequestForm.jsx';
import {MyPage} from './containers/MyPage.jsx';
import {Header} from './containers/Header.jsx';
import {LoginHeader} from './containers/LoginHeader.jsx';
import {LoginHeaderSP} from './containers/LoginHeaderSP.jsx';
import {Footer} from './containers/Footer.jsx';
import {LoginFooterSP} from './containers/LoginFooterSP.jsx';
import {Chats} from './containers/Chats.jsx';
import {Chat} from './containers/Chat.jsx';
import {Setting} from './containers/Setting.jsx';
import {SettingSP} from './containers/SettingSP.jsx';
import {PrivacyPolicy} from './containers/PrivacyPolicy.jsx';
import {TermsOfService} from './containers/TermsOfService.jsx';
import {styled, ThemeProvider, createTheme} from '@mui/system';
import { getCurrentUser } from './apis/GetCurrentUserInfo';
import {useCookies} from 'react-cookie';

function App() {
	const Theme = createTheme({
		palette: {
			primary: {
				main: '#F5F5F5',
			},
		},
	});
	
	const BaseComponent = styled('div')(({theme}) => ({
		minHeight:'80vh',
		backgroundColor: theme.palette.primary.main,
	}));

	const cookies = useCookies(['accessToken'])[0];
	const removeCookie = useCookies(['accessToken'])[2];
	const [dimension, setDimension] = useState({width: window.innerWidth});
	const [isLoginUser, setIsLoginUser] = useState(true);

	useEffect(() => {
		setDimension({width: window.innerWidth})
	},[])

	useLayoutEffect(() => {
		if(cookies.accessToken !== undefined){
			getCurrentUser(cookies.accessToken)
			.then((data) => {
				setIsLoginUser(true);	
			}).catch((e) => {
				setIsLoginUser(false);
				removeCookie('accessToken', {path: '/'});
			})
		}
	})

  	return (
	  	<Router>
			{
				cookies.accessToken && isLoginUser && (dimension.width <= 480) &&
				<LoginHeaderSP/>
			}
			{
				cookies.accessToken && isLoginUser && (dimension.width > 480) &&
				<LoginHeader/>
			}
			{
				(!cookies.accessToken || !isLoginUser) && 
				<Header/>

			}
				<ThemeProvider theme={Theme}>
					<BaseComponent>
	  					<Switch>
	  						<Route exact path="/">
								<Top/>
							</Route>
	  						<Route exact path="/signin">
	  							<SignIn/>
	  						</Route>
	  						<Route exact path="/login">
	  							<LogIn/>
	  						</Route>
	  						<Route exact path="/users/:userRandomId/request"
	  								render={({match}) => 
										<RequestForm
											match={match}
										/>
									}
	  						/>
	  						<Route exact path="/mypage">
	  							<MyPage loginNotice={false}/>
	  						</Route>
	  						<Route exact path="/chats">
	  							<Chats/>
	  						</Route>
	  						<Route exact path="/chat">
	  							<Chat
								room_id={1}	
								/>
	  						</Route>
	  						<Route path="/settingsp">
	  							<SettingSP />
	  						</Route>
	  						<Route path="/setting">
	  							<Setting/>
	  						</Route>
	  						<Route path="/privacypolicy">
	  							<PrivacyPolicy/>
	  						</Route>
	  						<Route path="/termsofservice">
	  							<TermsOfService/>
	  						</Route>
	  					</Switch>
					</BaseComponent>
				</ThemeProvider>
			{
				cookies.accessToken && isLoginUser && (dimension.width <= 480) &&
				<LoginFooterSP/>
			}
			{
				!(cookies.accessToken && isLoginUser && (dimension.width <= 480)) &&
				<Footer/>
			}
	  	</Router>
  );
}

export default App;
