import './App.css';
import{
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import {Top} from './containers/Top.jsx';
import {SignIn} from './containers/SignIn.jsx';
import {LogIn} from './containers/LogIn.jsx';
import {RequestForm} from './containers/RequestForm.jsx';
import {MyPage} from './containers/MyPage.jsx';
import {Header} from './containers/Header.jsx';
import {LoginHeader} from './containers/LoginHeader.jsx';
import {LoginHeaderSP} from './containers/LoginHeaderSP.jsx';
import {Footer} from './containers/Footer.jsx';
import {NotReady} from './containers/NotReady.jsx';
import {Chats} from './containers/Chats.jsx';
import {Chat} from './containers/Chat.jsx';
import {styled, ThemeProvider, createTheme} from '@mui/system';
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
		minHeight:'100vh',
		backgroundColor: theme.palette.primary.main,
	}));

	const cookies = useCookies(['accessToken'])[0];
	const [dimension, setDimension] = useState({width: window.innerWidth})

	useEffect(() => {
		setDimension({width: window.innerWidth})
	},[])

  	return (
	  	<Router>
			{
				console.log(cookies.accessToken)
			}
			{
				console.log(dimension.width)
			}
			{
				console.log(dimension.width <= 480)
			}
			{
				cookies.accessToken && (dimension.width <= 480) &&
				<LoginHeaderSP/>
			}
			{
				cookies.accessToken && (dimension.width > 480) &&
				<LoginHeader/>
			}
			{
				!cookies.accessToken && 
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
	  						<Route path="/notready">
	  							<NotReady/>
	  						</Route>
	  					</Switch>
					</BaseComponent>
				</ThemeProvider>
			<Footer/>
	  	</Router>
  );
}

export default App;
