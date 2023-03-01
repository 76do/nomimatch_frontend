import './App.css';
import{
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import React from 'react';
import {Top} from './containers/Top.jsx';
import {SignIn} from './containers/SignIn.jsx';
import {LogIn} from './containers/LogIn.jsx';
import {RequestForm} from './containers/RequestForm.jsx';
import {MyPage} from './containers/MyPage.jsx';
import {Header} from './containers/Header.jsx';
import {LoginHeader} from './containers/LoginHeader.jsx';
import {Footer} from './containers/Footer.jsx';
import {NotReady} from './containers/NotReady.jsx';
import {Chats} from './containers/Chats.jsx';
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

  	return (
	  	<Router>
			{
				cookies.accessToken && 
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
